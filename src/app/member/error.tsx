'use client';

import Link from 'next/link';
import { useEffect } from 'react';

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

const MemberErrorPage = ({ error, reset }: Props) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <div className='page-shell'>
            <section className='section space-y-4'>
                <h1 className='text-2xl font-semibold'>Jäsensivulla tapahtui virhe</h1>
                <p className='text-[var(--color-text-muted)]'>
                    Tietojen lataus epäonnistui. Yritä uudelleen tai palaa jäsensivuston etusivulle.
                </p>
                <div className='flex flex-wrap gap-3'>
                    <button className='btn btn-primary' onClick={reset} type='button'>
                        Yritä uudelleen
                    </button>
                    <Link className='btn btn-secondary' href='/member'>
                        Jäsenlistaan
                    </Link>
                    <Link className='btn btn-secondary' href='/'>
                        Etusivulle
                    </Link>
                </div>
            </section>
        </div>
    );
};

export default MemberErrorPage;
