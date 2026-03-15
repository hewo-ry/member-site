import Link from 'next/link';

import StatusPage from '@/components/status-page';

const UnauthorizedPage = () => (
    <StatusPage
        code='401'
        title='Kirjautuminen vaaditaan'
        body='Tämä sivu vaatii kirjautumisen. Kirjaudu sisään ja yritä uudelleen.'
    >
        <div className='action-row'>
            <Link className='btn btn-primary' href='/'>
                Palaa etusivulle
            </Link>
            <Link className='btn btn-secondary' href='/application'>
                Jäsenhakemus
            </Link>
        </div>
    </StatusPage>
);

export default UnauthorizedPage;
