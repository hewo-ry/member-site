import Link from 'next/link';

import StatusPage from '@/components/status-page';

const NotFoundPage = () => (
    <StatusPage
        code='404'
        variant='hero'
        title='Sivua ei löytynyt'
        body='Haettua sivua ei voitu löytää. Tarkista osoite tai palaa etusivulle.'
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
);

export default NotFoundPage;
