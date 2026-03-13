import { betterAuth } from 'better-auth';
import { genericOAuth, keycloak } from 'better-auth/plugins';

export const auth = betterAuth({
    plugins: [
        genericOAuth({
            config: [
                keycloak({
                    clientId: process.env.KEYCLOAK_CLIENT_ID ?? 'pmty-member-site',
                    clientSecret: process.env.KEYCLOAK_CLIENT_SECRET ?? '',
                    issuer: process.env.KEYCLOAK_ISSUER ?? 'https://sso.hcloud-pvl-test.paivola.net/realms/PVL/',
                }),
            ],
        }),
    ],
});
