import Link from 'next/link';

import SignInButton from '@/components/sign-in-button';
import StatusPage from '@/components/status-page';
import { getAssociationById } from '@/lib/association';

const Page = async () => {
    const { data: association } = await getAssociationById();

    return association ? (
        <div className='page-shell'>
            <section className='hero'>
                {association.shortName && (
                    <p className='text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]'>
                        {association.shortName}
                    </p>
                )}
                <h1 className='mt-3 text-2xl font-semibold leading-tight sm:text-3xl md:text-4xl'>
                    {association.name}
                </h1>
                {association.description && (
                    <p className='mt-4 max-w-2xl text-[1rem] text-[var(--color-text-muted)] sm:text-[1.04rem]'>
                        {association.description}
                    </p>
                )}
                <div className='mt-6 flex flex-wrap gap-3'>
                    <Link className='btn btn-primary' href='/application'>
                        Hae jäseneksi
                    </Link>
                    <SignInButton />
                </div>
            </section>

            {association.introduction && (
                <section className='section'>
                    <h2 className='text-xl font-semibold sm:text-2xl'>
                        Mikä {association.shortName ?? association.name} on?
                    </h2>
                    <p className='mt-3 max-w-3xl text-[var(--color-text-muted)] whitespace-pre-line'>
                        {association.introduction}
                    </p>
                </section>
            )}

            <section className='section'>
                {association.applicationInstructions ? (
                    <>
                        <h2 className='text-xl font-semibold sm:text-2xl'>Miten jäseneksi?</h2>
                        <p className='mt-3 max-w-3xl text-[var(--color-text-muted)] whitespace-pre-line'>
                            {association.applicationInstructions}
                        </p>
                    </>
                ) : (
                    <h2 className='text-xl font-semibold sm:text-2xl'>Hae jäseneksi!</h2>
                )}
                <Link className='btn btn-secondary mt-5' href='/application'>
                    Avaa jäsenhakemus
                </Link>
            </section>

            {association.contacts && (
                <section className='section'>
                    <h2 className='text-xl font-semibold sm:text-2xl'>Yhteystiedot</h2>
                    <p className='mt-3 max-w-3xl text-[var(--color-text-muted)] whitespace-pre-line'>
                        {association.contacts}
                    </p>
                </section>
            )}
        </div>
    ) : (
        <StatusPage
            title='Jotain meni pieleen'
            body='Yhdistyksen tietoja ei saatu jostain syystä ladattua. Kokeilethan myöhemmin uudelleen!'
        />
    );
};

export default Page;

export const dynamic = 'force-dynamic';
