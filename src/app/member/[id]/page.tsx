import FeeTable from '@/components/fee-table';
import { getAssociationMemberById } from '@/lib/association';

interface Props {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
    const { data: member, error } = await params.then(({ id }) => getAssociationMemberById(undefined, id));

    // TODO
    if (error) console.error(error);

    return member ? (
        <div className='space-y-6'>
            <section className='section'>
                <h2 className='text-2xl font-semibold'>Perustiedot</h2>
                <dl className='mt-4 grid gap-3 sm:grid-cols-2'>
                    <div className='card'>
                        <dt className='field-label'>Nimi</dt>
                        <dd>{member.person.fullName}</dd>
                    </div>
                    <div className='card'>
                        <dt className='field-label'>Sähköposti</dt>
                        <dd>{member.person.email}</dd>
                    </div>
                    <div className='card sm:col-span-2'>
                        <dt className='field-label'>Tyyppi</dt>
                        <dd>{member.type}</dd>
                    </div>
                </dl>
            </section>

            <section className='section'>
                <h2 className='text-2xl font-semibold'>Maksut</h2>
                <p className='mt-2 text-sm text-[var(--color-text-muted)]'>
                    Lisää tai poista jäsenmaksuja tarvittaessa.
                </p>
                <div className='mt-5'>
                    <FeeTable memberId={member.id} fees={member.fees} />
                </div>
            </section>
        </div>
    ) : (
        <p className='error-text'>Virhe jäsenen tietojen latauksessa.</p>
    );
};

export default Page;
