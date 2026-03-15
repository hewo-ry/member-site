import Link from 'next/link';

const NotFoundPage = () => (
    <div className='page-shell'>
        <section className='hero space-y-4'>
            <p className='text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]'>404</p>
            <h1 className='text-3xl font-semibold'>Sivua ei löytynyt</h1>
            <p className='max-w-2xl text-[var(--color-text-muted)]'>
                Haettua sivua ei voitu löytää. Tarkista osoite tai palaa etusivulle.
            </p>
            <div className='flex flex-wrap gap-3'>
                <Link className='btn btn-primary' href='/'>
                    Etusivulle
                </Link>
                <Link className='btn btn-secondary' href='/application'>
                    Jäsenhakemus
                </Link>
            </div>
        </section>
    </div>
);

export default NotFoundPage;
