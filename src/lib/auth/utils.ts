'use server';

import { headers } from 'next/headers';

import { auth } from '@/auth';

export const getLogoutUrl = async (path: string): Promise<string> => {
    const issuer = process.env.KEYCLOAK_ISSUER;
    if (!issuer) return Promise.reject();

    const [endSessionEndpoint, idToken] = await Promise.all([
        fetch(`${issuer}/.well-known/openid-configuration`)
            .then((res) => res.json())
            .then(({ end_session_endpoint }) => end_session_endpoint),
        auth.api
            .getAccessToken({ body: { providerId: 'keycloak' }, headers: await headers() })
            .then(({ idToken }) => idToken),
    ]);

    const params = new URLSearchParams({
        client_id: process.env.KEYCLOAK_CLIENT_ID ?? 'pmty-member-site',
        post_logout_redirect_uri: path,
        ...(idToken && { id_token_hint: idToken }),
    });

    return `${endSessionEndpoint}?${params.toString()}`;
};
