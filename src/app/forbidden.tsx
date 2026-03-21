import Link from 'next/link';

import BackButton from '@/components/back-button';
import StatusPage from '@/components/status-page';

const ForbiddenPage = () => (
    <div className='page-shell'>
        <div className='action-row mb-6'>
            <BackButton fallbackHref='/' />
        </div>
        <StatusPage
            code='403'
            title='Pääsy estetty'
            body='Sinulla ei ole oikeuksia tähän näkymään. Jos uskot tämän olevan virhe, ota yhteyttä ylläpitoon.'
            shell={false}
        >
            <div className='action-row'>
                <Link className='btn btn-secondary' href='/member'>
                    Jäsensivustolle
                </Link>
                <Link className='btn btn-primary' href='/'>
                    Etusivulle
                </Link>
            </div>
        </StatusPage>
    </div>
);

export default ForbiddenPage;
