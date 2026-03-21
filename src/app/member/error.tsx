'use client';

import Link from 'next/link';
import { useEffect } from 'react';

import BackButton from '@/components/back-button';
import StatusPage from '@/components/status-page';

interface Props {
    error: Error & { digest?: string };
    reset: () => void;
}

const MemberErrorPage = ({ error, reset }: Props) => {
    useEffect(() => {
        console.error(error);
    }, [error]);

    return (
        <>
            <div className='action-row mb-6'>
                <BackButton fallbackHref='/member' label='Palaa takaisin' />
            </div>
            <StatusPage
                title='Jäsensivulla tapahtui virhe'
                body='Tietojen lataus epäonnistui. Yritä uudelleen tai palaa jäsensivuston etusivulle.'
                shell={false}
            >
                <div className='action-row'>
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
            </StatusPage>
        </>
    );
};

export default MemberErrorPage;
