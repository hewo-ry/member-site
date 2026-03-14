import Link from 'next/link';

import SignInButton from '@/components/sign-in-button';
import { getAssociationById } from '@/lib/association';
import { getOrganizationContent } from '@/lib/content';

const Page = async () => {
    const { data: association, error } = await getAssociationById();
    const content = getOrganizationContent();

    // TODO: handle error
    if (error) console.error(error);

    return (
        <div className='page-shell'>
            <section className='hero'>
                <p className='text-sm font-semibold uppercase tracking-wide text-[var(--color-text-muted)]'>
                    {content.shortName}
                </p>
                <h1 className='mt-3 text-4xl font-semibold leading-tight'>{association?.name ?? content.fullName}</h1>
                <p className='mt-4 max-w-2xl text-[1.04rem] text-[var(--color-text-muted)]'>{content.heroBody}</p>
                <div className='mt-6 flex flex-wrap gap-3'>
                    <Link className='btn btn-primary' href='/application'>
                        Hae jäseneksi
                    </Link>
                    <SignInButton />
                </div>
            </section>

            <section className='section'>
                <h2 className='text-2xl font-semibold'>{content.aboutTitle}</h2>
                <p className='mt-3 max-w-3xl text-[var(--color-text-muted)]'>{content.aboutBody}</p>
            </section>

            <section className='section'>
                <h2 className='text-2xl font-semibold'>{content.joinTitle}</h2>
                <p className='mt-3 max-w-3xl text-[var(--color-text-muted)]'>{content.joinBody}</p>
                <Link className='btn btn-secondary mt-5' href='/application'>
                    Avaa jäsenhakemus
                </Link>
            </section>

            <section className='section'>
                <h2 className='text-2xl font-semibold'>{content.contactTitle}</h2>
                <p className='mt-3 max-w-3xl text-[var(--color-text-muted)]'>{content.contactBody}</p>
            </section>
        </div>
    );
};

export default Page;
