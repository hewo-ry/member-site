// TODO: metadata
import ApplicationForm from '@/components/application-form';
import BackButton from '@/components/back-button';
import { getOrganizationContent } from '@/lib/content';

const Page = () => {
    const content = getOrganizationContent();

    return (
        <div className='page-shell'>
            <div className='action-row'>
                <BackButton fallbackHref='/' />
            </div>
            <section className='section'>
                <h1 className='text-2xl font-semibold sm:text-3xl'>Jäsenhakemus</h1>
                <p className='mt-3 max-w-3xl text-[var(--color-text-muted)]'>
                    Täytä hakemus huolellisesti. Käsittelemme tiedot luottamuksellisesti yhdistyksen jäsenprosessin
                    mukaisesti.
                </p>
                <p className='mt-2 max-w-3xl text-[var(--color-text-muted)]'>{content.joinBody}</p>
            </section>

            <section className='section'>
                <ApplicationForm />
            </section>
        </div>
    );
};

export default Page;
