import Link from 'next/link';

import BackButton from '@/components/back-button';
import StatusPage from '@/components/status-page';

const UnauthorizedPage = () => (
    <div className='page-shell'>
        <div className='action-row mb-6'>
            <BackButton fallbackHref='/' />
        </div>
        <StatusPage
            code='401'
            title='Kirjautuminen vaaditaan'
            body='Tämä sivu vaatii kirjautumisen. Kirjaudu sisään ja yritä uudelleen.'
            shell={false}
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
    </div>
);

export default UnauthorizedPage;
