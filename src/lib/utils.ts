'use server';

import { getAssociations } from './association';

let token: string | null = null;
let expiry: number = 0;

export const getOptireAccessToken = async (): Promise<string> => {
    const now = Date.now();

    if (token && expiry > now + 300_000) return token;

    if (
        !process.env.OPTIRE_OIDC_TOKEN_URL ||
        !process.env.OPTIRE_OIDC_CLIENT_ID ||
        !process.env.OPTIRE_OIDC_CLIENT_SECRET
    )
        throw new Error('Invalid backend configs');

    const response = await fetch(process.env.OPTIRE_OIDC_TOKEN_URL, {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams({
            grant_type: 'client_credentials',
            client_id: process.env.OPTIRE_OIDC_CLIENT_ID,
            client_secret: process.env.OPTIRE_OIDC_CLIENT_SECRET,
        }),
        cache: 'no-store',
    });

    if (!response.ok) throw new Error(`Failed to fetch access token for opire: ${response.statusText}`);

    const data = await response.json();

    token = data.access_token;
    expiry = now + data.expires_in;

    return token!;
};

let associationId = process.env.OPTIRE_ASSOCIATION_ID;

export const getAssociationId = async (): Promise<string> => {
    if (associationId) return Promise.resolve(associationId);

    return getAssociations()
        .then(({ data: associations }) => associations?.at(0)?.id)
        .then((id) => {
            if (!id) throw new Error('Failed to get association id');
            associationId = id;
            return id;
        });
};
