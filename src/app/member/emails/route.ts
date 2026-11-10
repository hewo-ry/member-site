import { headers } from 'next/headers';
import { forbidden, unauthorized } from 'next/navigation';
import { NextRequest } from 'next/server';

import { Role, auth } from '@/auth';
import { getAssociationById, getAssociationMemberById } from '@/lib/association';
import { MemberType } from '@/lib/association/contants';

export const GET = async (request: NextRequest) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) unauthorized();
    if (session.user.role !== Role.ADMIN) forbidden();

    const onlyMemberLetter = request.nextUrl.searchParams.has('memberLetter');

    const { data: association, error } = await getAssociationById();
    if (error) throw new Error(`Failed to fetch association: ${error.detail}`);

    const members = await Promise.all(
        association.members
            .filter(({ type }) => type !== MemberType.UNPROCESSED)
            .map(({ id }) =>
                getAssociationMemberById(association.id, id).then(({ data, error }) => {
                    if (error) throw new Error(`Failed to fetch member ${id}: ${error.detail}`);
                    return data;
                }),
            ),
    );

    const emails = [
        ...new Set(
            members
                .filter(({ allowMemberLetter }) => !onlyMemberLetter || allowMemberLetter)
                .map(({ person }) => person.email?.trim())
                .filter(Boolean),
        ),
    ].sort();

    return new Response(emails.join(', '), {
        headers: { 'Content-Type': 'text/plain; charset=utf-8', 'Cache-Control': 'no-store' },
    });
};
