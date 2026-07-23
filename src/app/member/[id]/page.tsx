import { Metadata } from 'next';
import { headers } from 'next/headers';
import { forbidden, notFound, unauthorized } from 'next/navigation';

import { Role, auth } from '@/auth';
import ApplicationHandleButton from '@/components/application-handle-button';
import BackButton from '@/components/back-button';
import FeeTable from '@/components/fee-table';
import MemberTypeCard from '@/components/member-type-edit';
import StatusPage from '@/components/status-page';
import { getAssociationMemberById } from '@/lib/association';
import { MemberType } from '@/lib/association/contants';
import { Member } from '@/lib/association/types';

interface Props {
    params: Promise<{ id: string }>;
}

const getMember = async (memberId: Member['id']): Promise<[Member, Role]> => {
    const awaitedHeaders = await headers();
    const session = await auth.api.getSession({ headers: awaitedHeaders });
    if (!session) unauthorized();
    if (session.user.role !== Role.ADMIN && session.user.role !== Role.MEMBER) forbidden();

    const { data: member, error } = await getAssociationMemberById(undefined, memberId);

    if (error?.status === 404) notFound();
    if (error) throw new Error(`Failed to fetch member: ${error.detail}`);

    if (session.user.role !== Role.ADMIN) {
        const accountInfo = await auth.api.accountInfo({ headers: awaitedHeaders });

        if (!member.user?.sub || member.user.sub !== accountInfo?.user.id) notFound(); // Do not expose existing ids
    }

    return [member, session.user.role];
};

export const generateMetadata = async ({ params }: Props): Promise<Metadata> => {
    const [member] = await getMember(await params.then(({ id }) => id));

    return {
        title: member.person.fullName,
    };
};

const Page = async ({ params }: Props) => {
    const [member, role] = await getMember(await params.then(({ id }) => id));

    return member ? (
        <div className='space-y-6'>
            <div className='action-row'>
                <BackButton fallbackHref='/member' />
            </div>

            <section className='section'>
                <h2 className='text-xl font-semibold sm:text-2xl'>Perustiedot</h2>
                <dl className='mt-4 grid gap-3 sm:grid-cols-3'>
                    <div className='card'>
                        <dt className='field-label'>Nimi</dt>
                        <dd>{member.person.fullName}</dd>
                    </div>

                    <div className='card'>
                        <dt className='field-label'>Kotipaikka</dt>
                        <dd>{member.person.domicile}</dd>
                    </div>

                    {role === Role.ADMIN && member.type === MemberType.UNPROCESSED ? (
                        <div className='card flex flex-col gap-2'>
                            <ApplicationHandleButton memberId={member.id} type='accept' />
                            <ApplicationHandleButton memberId={member.id} type='decline' />
                        </div>
                    ) : (
                        <MemberTypeCard hideEdit={role !== Role.ADMIN} {...member} />
                    )}

                    <div className='card sm:col-span-2'>
                        <dt className='field-label'>Sähköposti</dt>
                        <dd>{member.person.email}</dd>
                    </div>

                    <div className='card'>
                        <dt className='field-label'>Jäsenkirje</dt>
                        <dd>{member.allowMemberLetter ? 'Kyllä' : 'Ei'}</dd>
                    </div>

                    {member.applicationMessage && (
                        <div className='card sm:col-span-3'>
                            <dt className='field-label'>Hakemuksen perustelut</dt>
                            <dd className='whitespace-pre-line'>{member.applicationMessage}</dd>
                        </div>
                    )}
                </dl>
            </section>

            <section className='section'>
                <h2 className='text-xl font-semibold sm:text-2xl'>Maksut</h2>
                <p className='mt-2 text-sm text-[var(--color-text-muted)]'>
                    Lisää tai poista jäsenmaksuja tarvittaessa.
                </p>
                <div className='mt-5'>
                    <FeeTable hideFeeActions={role !== Role.ADMIN} memberId={member.id} fees={member.fees} />
                </div>
            </section>
        </div>
    ) : (
        <StatusPage
            title='Virhe tietojen latauksessa'
            body='Jäsenen tietojen lataus epäonnistui. Yritä uudelleen hetken kuluttua.'
        >
            <div className='action-row'>
                <BackButton className='btn btn-primary' fallbackHref='/member' label='Palaa jäsenlistaan' />
            </div>
        </StatusPage>
    );
};

export default Page;
