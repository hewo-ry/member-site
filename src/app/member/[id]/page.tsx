import { headers } from 'next/headers';
import { forbidden, notFound, unauthorized } from 'next/navigation';

import { Role, auth } from '@/auth';
import FeeTable from '@/components/fee-table';
import { getAssociationMemberById } from '@/lib/association';

interface Props {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role === Role.NONE) unauthorized();

    const id = await params.then(({ id }) => id);

    // TODO: remove hardcoded id
    if (session.user.role !== Role.ADMIN && id !== 'b0905552-77fa-442f-a197-2073b64c9d12') forbidden();

    const { data: member, error } = await getAssociationMemberById(undefined, id);

    if (error?.status === 404) notFound();

    // TODO
    if (error) console.error(error);

    return member ? (
        <div>
            <h1>Perustiedot</h1>
            <span>Nimi: {member.person.fullName}</span>
            <span>Sähköposti: {member.person.email}</span>
            <span>Tyyppi: {member.type}</span>
            <h2>Maksut</h2>
            <FeeTable hideFeeActions={session.user.role !== Role.ADMIN} memberId={member.id} fees={member.fees} />
        </div>
    ) : (
        <span>VIRHE</span>
    );
};

export default Page;
