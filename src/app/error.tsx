'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className='page-shell'>
            <section className='section space-y-4'>
                <h1 className='text-2xl font-semibold'>Jotain meni pieleen</h1>
                <p className='text-[var(--color-text-muted)]'>
                    Sivun latauksessa tapahtui odottamaton virhe. Yritä uudelleen hetken kuluttua.
                </p>
                <p className='error-text'>Virhe jatkuu? Palaa etusivulle tai yritä uudelleen.</p>
                <div className='flex flex-wrap gap-3'>
                    <button className='btn btn-primary' onClick={reset} type='button'>
                        Yritä uudelleen
                    </button>
                    <Link className='btn btn-secondary' href='/'>
                        Siirry etusivulle
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default ErrorPage;
