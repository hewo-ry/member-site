import { headers } from 'next/headers';
import Link from 'next/link';
import { forbidden, notFound, unauthorized } from 'next/navigation';

import { Role, auth } from '@/auth';
import FeeTable from '@/components/fee-table';
import StatusPage from '@/components/status-page';
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
        <div className='space-y-6'>
            <section className='section'>
                <h2 className='text-2xl font-semibold'>Perustiedot</h2>
                <dl className='mt-4 grid gap-3 sm:grid-cols-2'>
                    <div className='card'>
                        <dt className='field-label'>Nimi</dt>
                        <dd>{member.person.fullName}</dd>
                    </div>
                    <div className='card'>
                        <dt className='field-label'>Sähköposti</dt>
                        <dd>{member.person.email}</dd>
                    </div>
                    <div className='card sm:col-span-2'>
                        <dt className='field-label'>Tyyppi</dt>
                        <dd>{member.type}</dd>
                    </div>
                </dl>
            </section>

            <section className='section'>
                <h2 className='text-2xl font-semibold'>Maksut</h2>
                <p className='mt-2 text-sm text-[var(--color-text-muted)]'>
                    Lisää tai poista jäsenmaksuja tarvittaessa.
                </p>
                <div className='mt-5'>
                    <FeeTable
                        hideFeeActions={session.user.role !== Role.ADMIN}
                        memberId={member.id}
                        fees={member.fees}
                    />
                </div>
            </section>
        </div>
    ) : (
        <StatusPage
            shell={false}
            title='Virhe tietojen latauksessa'
            body='Jäsenen tietojen lataus epäonnistui. Yritä uudelleen hetken kuluttua.'
        >
            <div className='action-row'>
                <Link className='btn btn-primary' href='/member'>
                    Palaa jäsenlistaan
                </Link>
            </div>
        </StatusPage>
    );
};

export default Page;
