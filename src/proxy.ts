import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';

import { ProblemDetails } from './lib/optire/types';

export const proxy = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session) return NextResponse.next();

    if (request.method !== 'GET')
        return NextResponse.json(
            {
                type: 'https://hewo.dev/member-site/Unauthorized',
                title: 'Unauthorized',
                status: 401,
                detail: 'No session found',
                instance: request.nextUrl.pathname,
                properties: null,
            } satisfies ProblemDetails,
            { status: 401 },
        );

    const response = await auth.api.signInSocial({
        body: {
            provider: 'keycloak',
            callbackURL: request.nextUrl.pathname,
        },
    });

    if (response.url) return NextResponse.redirect(response.url);

    return NextResponse.json(
        {
            type: 'https://hewo.dev/member-site/InternalServerError',
            title: 'Internal Server Error',
            status: 500,
            detail: 'Sign in url generating failed',
            instance: request.nextUrl.pathname,
            properties: null,
        } satisfies ProblemDetails,
        { status: 500 },
    );
};

export const config = {
    matcher: ['/member/:path*'],
};
