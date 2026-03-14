import Link from 'next/link';

import { getAssociationById } from '@/lib/association';

// TODO: metadata

const Page = async () => {
    const { data: association, error } = await getAssociationById();

    // TODO
    if (error) console.error(error);

    // TODO: ohjaa käyttäjä suoraan omalle sivulle jos ei ole oikeutta

    return (
        <div>
            <table>
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
                                <Link href={`/member/${id}`}>{fullName}</Link>
                            </td>
                            <td>{type}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Page;
