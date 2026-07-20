import { Metadata } from 'next';
import { headers } from 'next/headers';
import { forbidden, redirect, unauthorized } from 'next/navigation';

import { Role, auth } from '@/auth';
import BackButton from '@/components/back-button';
import MemberTable from '@/components/member-table';
import { getAssociationById } from '@/lib/association';
import { MemberType } from '@/lib/association/contants';

export const metadata: Metadata = {
    title: 'Jäsensivut',
};

const Page = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session) unauthorized();
    else if (session.user.role !== Role.ADMIN && session.user.role !== Role.MEMBER) forbidden();

    // TODO: remove hardcoded id
    if (session.user.role !== Role.ADMIN) redirect('/member/b0905552-77fa-442f-a197-2073b64c9d12');

    const { data: association, error } = await getAssociationById();

    if (error) throw new Error(`Failed to fetch association: ${error.detail}`);

    const members = association?.members.filter(({ type }) => type !== MemberType.UNPROCESSED) ?? [];
    const unprocessedMember = association?.members.filter(({ type }) => type === MemberType.UNPROCESSED) ?? [];

    return (
        <>
            <div className='action-row mb-6'>
                <BackButton fallbackHref='/' />
            </div>

            <section className='section'>
                <h2 className='text-xl font-semibold sm:text-2xl'>Uudet jäsenhakemukset</h2>
                <p className='mt-2 text-sm text-[var(--color-text-muted)]'>
                    Avaa hakemuksen tiedot klikkaamalla nimeä niin voit sen jälkeen hyväksyä henkilön uudeksi jäseneksi.
                </p>

                {unprocessedMember.length > 0 ? (
                    <MemberTable hideType members={unprocessedMember} />
                ) : (
                    <p className='mt-2 text-sm]'>Ei uusia jäsenhakemuksia käsiteltäväksi!</p>
                )}
            </section>

            <section className='section'>
                <h2 className='text-xl font-semibold sm:text-2xl'>Jäsenet</h2>
                <p className='mt-2 text-sm text-[var(--color-text-muted)]'>Avaa jäsenen tiedot klikkaamalla nimeä.</p>

                <MemberTable members={members} />
            </section>
        </>
    );
};

export default Page;
