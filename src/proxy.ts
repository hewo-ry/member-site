import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';

export const proxy = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: await headers() });

    if (session) return NextResponse.next();

    const response = await auth.api.signInWithOAuth2({
        body: {
            providerId: 'keycloak',
            callbackURL: request.nextUrl.pathname,
        },
    });
    return NextResponse.redirect(response.url);
};

export const config = {
    matcher: ['/member/:path*'],
};
