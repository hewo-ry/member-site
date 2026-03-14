import Link from 'next/link';

import { getAssociationById } from '@/lib/association';

// TODO: metadata

const Page = async () => {
    const { data: association, error } = await getAssociationById();

    // TODO
    if (error) console.error(error);

    // TODO: ohjaa käyttäjä suoraan omalle sivulle jos ei ole oikeutta

    return (
        <section className='section'>
            <h2 className='text-2xl font-semibold'>Jäsenet</h2>
            <p className='mt-2 text-sm text-[var(--color-text-muted)]'>Avaa jäsenen tiedot klikkaamalla nimeä.</p>

            <div className='table-shell mt-5'>
                <table className='table'>
                    <thead>
                        <tr>
                            <th>Nimi</th>
                            <th>Tyyppi</th>
                        </tr>
                    </thead>
                    <tbody>
                        {association?.members.map(({ id, person: { fullName }, type }) => (
                            <tr key={id}>
                                <td>
                                    <Link className='table-link' href={`/member/${id}`}>
                                        {fullName}
                                    </Link>
                                </td>
                                <td>{type}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </section>
    );
};

export default Page;
