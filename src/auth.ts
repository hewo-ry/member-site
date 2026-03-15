import { User, betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth, keycloak } from 'better-auth/plugins';

const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID ?? 'pmty-member-site';

export const auth = betterAuth({
    plugins: [
        genericOAuth({
            config: [
                {
                    ...keycloak({
                        clientId: CLIENT_ID,
                        clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? '',
                        issuer: process.env.KEYCLOAK_ISSUER ?? '',
                    }),
                    overrideUserInfo: true,
                    mapProfileToUser: (profile) =>
                        ({
                            role: parseRole(profile),
                        }) as Partial<User>,
                },
            ],
        }),
        nextCookies(),
    ],
    user: {
        additionalFields: {
            role: {
                type: ['ADMIN', 'MEMBER', 'NONE'],
                required: true,
                defaultValue: 'NONE',
                input: false,
            },
        },
    },
});

interface ProfileWithRoles {
    resource_access?: {
        [CLIENT_ID]?: {
            roles?: ('ADMIN' | 'MEMBER')[];
        };
    };
}

const parseRole = (profile: ProfileWithRoles): 'ADMIN' | 'MEMBER' | 'NONE' => {
    const roles = profile?.resource_access?.[CLIENT_ID]?.roles ?? [];
    return roles.indexOf('ADMIN') !== -1 ? 'ADMIN' : roles.indexOf('MEMBER') !== -1 ? 'MEMBER' : 'NONE';
};
