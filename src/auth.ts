import { User, betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth, keycloak } from 'better-auth/plugins';

const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID ?? 'pmty-member-site';

export enum Role {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
    NONE = 'NONE',
}

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
                type: [Role.ADMIN, Role.MEMBER, Role.NONE],
                required: true,
                defaultValue: Role.NONE,
                input: false,
            },
        },
    },
});

interface ProfileWithRoles {
    resource_access?: {
        [CLIENT_ID]?: {
            roles?: Role[];
        };
    };
}

const parseRole = (profile: ProfileWithRoles): Role => {
    const roles = profile?.resource_access?.[CLIENT_ID]?.roles ?? [];
    return roles.indexOf(Role.ADMIN) !== -1 ? Role.ADMIN : roles.indexOf(Role.MEMBER) !== -1 ? Role.MEMBER : Role.NONE;
};
