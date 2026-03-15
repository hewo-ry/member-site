import { headers } from 'next/headers';
import Link from 'next/link';
import { redirect, unauthorized } from 'next/navigation';

import { Role, auth } from '@/auth';
import { getAssociationById } from '@/lib/association';

// TODO: metadata

const Page = async () => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role === Role.NONE) unauthorized();

    // TODO: remove hardcoded id
    if (session.user.role !== Role.ADMIN) redirect('/member/b0905552-77fa-442f-a197-2073b64c9d12');

    const { data: association, error } = await getAssociationById();

    // TODO
    if (error) console.error(error);

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
