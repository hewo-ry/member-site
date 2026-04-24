'use client';

import Link from 'next/link';

import BackButton from '@/components/back-button';
import StatusPage from '@/components/status-page';

interface Props {
    reset: () => void;
}

const ErrorPage = ({ reset }: Props) => {
    return (
        <div className='page-shell'>
            <div className='action-row mb-6'>
                <BackButton fallbackHref='/' />
            </div>
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
        </div>
    );
};

export default ErrorPage;
