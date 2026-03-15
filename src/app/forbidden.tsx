import Link from 'next/link';

import StatusPage from '@/components/status-page';

const ForbiddenPage = () => (
    <StatusPage
        code='403'
        title='Pääsy estetty'
        body='Sinulla ei ole oikeuksia tähän näkymään. Jos uskot tämän olevan virhe, ota yhteyttä ylläpitoon.'
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
);

export default ForbiddenPage;
