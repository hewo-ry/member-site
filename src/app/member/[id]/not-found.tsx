import Link from 'next/link';

const MemberNotFoundPage = () => (
    <section className='section space-y-4'>
        <p className='text-sm font-semibold uppercase tracking-[0.08em] text-[var(--color-text-muted)]'>404</p>
        <h1 className='text-3xl font-semibold'>Jäsentä ei löytynyt</h1>
        <p className='text-[var(--color-text-muted)]'>
            Pyydetyllä tunnisteella ei löytynyt jäsentä. Tarkista tunniste tai palaa jäsenlistaan.
        </p>
        <div className='flex flex-wrap gap-3'>
            <Link className='btn btn-primary' href='/member'>
                Jäsenlistaan
            </Link>
            <Link className='btn btn-secondary' href='/'>
                Etusivulle
            </Link>
        </div>
    </section>
);

export default MemberNotFoundPage;
