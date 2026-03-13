import { headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

import { auth } from '@/auth';

export const proxy = async (request: NextRequest) => {
    const session = await auth.api.getSession({
        headers: await headers(),
    });

    if (!session) return NextResponse.redirect(new URL('/', request.url));

    return NextResponse.next();
};

export const config = {
    matcher: ['/member'],
};
