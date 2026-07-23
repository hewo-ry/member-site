import { Metadata } from 'next';

import ApplicationForm from '@/components/application-form';
import BackButton from '@/components/back-button';
import { getAssociationById } from '@/lib/association';

export const metadata: Metadata = {
    title: 'Jäsenhakemus',
};

const Page = async () => {
    const { data: association } = await getAssociationById();

    return (
        <div className='page-shell'>
            <div className='action-row'>
                <BackButton fallbackHref='/' />
            </div>
            <section className='section'>
                <h1 className='text-2xl font-semibold sm:text-3xl'>Jäsenhakemus</h1>
                {association?.applicationInstructions && (
                    <p className='mt-3 max-w-3xl text-[var(--color-text-muted)] whitespace-pre-line'>
                        {association.applicationInstructions}
                    </p>
                )}
            </section>

            <section className='section'>
                <ApplicationForm
                    memberLetterDescription={association?.memberLetterDescription}
                    applicationMessageDescription={association?.applicationMessageDescription}
                />
            </section>
        </div>
    );
};

export default Page;
