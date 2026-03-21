import Link from 'next/link';

import BackButton from '@/components/back-button';
import StatusPage from '@/components/status-page';

const NotFoundPage = () => (
    <div className='page-shell'>
        <div className='action-row mb-6'>
            <BackButton className='btn btn-primary' fallbackHref='/' label='Takaisin' />
        </div>
        <StatusPage
            code='404'
            variant='hero'
            title='Sivua ei löytynyt'
            body='Haettua sivua ei voitu löytää. Tarkista osoite tai palaa etusivulle.'
            shell={false}
        >
            <div className='action-row'>
                <Link className='btn btn-primary' href='/'>
                    Etusivulle
                </Link>
                <Link className='btn btn-secondary' href='/application'>
                    Jäsenhakemus
                </Link>
            </div>
        </StatusPage>
    </div>
);

export default NotFoundPage;
