import { defineRequestState } from '@better-auth/core/context';
import { betterAuth } from 'better-auth';
import { nextCookies } from 'better-auth/next-js';
import { genericOAuth, keycloak } from 'better-auth/plugins';

const CLIENT_ID = process.env.KEYCLOAK_CLIENT_ID ?? 'pmty-member-site';

export enum Role {
    ADMIN = 'ADMIN',
    MEMBER = 'MEMBER',
    NONE = 'NONE',
}

const pendingRole = defineRequestState<Role | null>(() => null);

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
                    mapProfileToUser: async (profile) => {
                        const role = parseRole(profile);
                        if (process.env.AUTH_DEBUG === '1') {
                            console.log('[auth-debug] profile keys:', Object.keys(profile));
                            console.log('[auth-debug] resource_access:', JSON.stringify(profile.resource_access));
                            console.log('[auth-debug] parsed role:', role);
                        }
                        if (role !== null) await pendingRole.set(role);
                        return {};
                    },
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
    databaseHooks: {
        user: {
            create: {
                before: async () => applyPendingRole(),
            },
            update: {
                before: async () => applyPendingRole(),
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

const parseRole = (profile: ProfileWithRoles): Role | null => {
    const access = profile?.resource_access?.[CLIENT_ID];
    if (!access) {
        console.warn(`parseRole: no resource_access['${CLIENT_ID}'] claim in token; leaving stored role untouched`);
        return null;
    }
    const roles = access.roles ?? [];
    return roles.indexOf(Role.ADMIN) !== -1 ? Role.ADMIN : roles.indexOf(Role.MEMBER) !== -1 ? Role.MEMBER : Role.NONE;
};

const applyPendingRole = async () => {
    const role = await pendingRole.get();
    if (role !== null) {
        await pendingRole.set(null);
        if (process.env.AUTH_DEBUG === '1') {
            console.log('[auth-debug] applyPendingRole: injecting role', role);
        }
        return { data: { role } };
    }
};
