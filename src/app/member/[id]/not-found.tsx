import Link from 'next/link';

import BackButton from '@/components/back-button';
import StatusPage from '@/components/status-page';

const MemberNotFoundPage = () => (
    <>
        <div className='action-row mb-6'>
            <BackButton className='btn btn-primary' fallbackHref='/member' label='Takaisin' />
        </div>
        <StatusPage
            code='404'
            shell={false}
            title='Jäsentä ei löytynyt'
            body='Pyydetyllä tunnisteella ei löytynyt jäsentä. Tarkista tunniste tai palaa jäsenlistaan.'
        >
            <div className='action-row'>
                <Link className='btn btn-primary' href='/member'>
                    Jäsenlistaan
                </Link>
                <Link className='btn btn-secondary' href='/'>
                    Etusivulle
                </Link>
            </div>
        </StatusPage>
    </>
);

export default MemberNotFoundPage;
