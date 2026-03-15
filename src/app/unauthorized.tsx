import Link from 'next/link';

const UnauthorizedPage = () => (
    <div className='page-shell'>
        <section className='section space-y-4'>
            <p className='text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]'>401</p>
            <h1 className='text-3xl font-semibold'>Kirjautuminen vaaditaan</h1>
            <p className='text-[var(--color-text-muted)]'>
                Tämä sivu vaatii kirjautumisen. Kirjaudu sisään ja yritä uudelleen.
            </p>
            <div className='flex flex-wrap gap-3'>
                <Link className='btn btn-primary' href='/'>
                    Palaa etusivulle
                </Link>
                <Link className='btn btn-secondary' href='/application'>
                    Jäsenhakemus
                </Link>
            </div>
        </section>
    </div>
);

export default UnauthorizedPage;
