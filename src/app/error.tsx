'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import StatusPage from '@/components/status-page';

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

const ErrorPage = ({ error, reset }: Props) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <StatusPage
            title='Jotain meni pieleen'
            body='Sivun latauksessa tapahtui odottamaton virhe. Yritä uudelleen hetken kuluttua.'
        >
            <p className='error-text'>Virhe jatkuu? Palaa etusivulle tai yritä uudelleen.</p>
            <div className='action-row'>
                <button className='btn btn-primary' onClick={reset} type='button'>
                    Yritä uudelleen
                </button>
                <Link className='btn btn-secondary' href='/'>
                    Siirry etusivulle
                </Link>
            </div>
        </StatusPage>
    );
};

export default ErrorPage;
