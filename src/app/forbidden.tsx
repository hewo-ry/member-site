import Link from 'next/link';

const ForbiddenPage = () => (
    <div className='page-shell'>
        <section className='section space-y-4'>
            <p className='text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]'>403</p>
            <h1 className='text-3xl font-semibold'>Pääsy estetty</h1>
            <p className='text-[var(--color-text-muted)]'>
                Sinulla ei ole oikeuksia tähän näkymään. Jos uskot tämän olevan virhe, ota yhteyttä ylläpitoon.
            </p>
            <div className='flex flex-wrap gap-3'>
                <Link className='btn btn-secondary' href='/member'>
                    Jäsensivustolle
                </Link>
                <Link className='btn btn-primary' href='/'>
                    Etusivulle
                </Link>
            </div>
        </section>
    </div>
);

export default ForbiddenPage;
