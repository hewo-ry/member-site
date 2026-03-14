// TODO: metadata
import ApplicationForm from '@/components/application-form';
import { getOrganizationContent } from '@/lib/content';

const Page = () => {
	const content = getOrganizationContent();

	return (
		<div className='page-shell'>
			<section className='section'>
				<h1 className='text-3xl font-semibold'>Jasenhakemus</h1>
				<p className='mt-3 max-w-3xl text-[var(--color-text-muted)]'>
					Tayta hakemus huolellisesti. Kasittelemme tiedot luottamuksellisesti yhdistyksen jasenprosessin mukaisesti.
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
