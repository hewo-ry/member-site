import Link from 'next/link';

import { SimpleMember } from '@/lib/association/types';

interface Props {
    hideType?: boolean;
    members: SimpleMember[];
}

const MemberTable = ({ hideType, members }: Props) => (
    <div className='table-shell mt-5'>
        <table className='table table-mobile-list'>
            <thead>
                <tr>
                    <th>Nimi</th>
                    {!hideType && <th>Tyyppi</th>}
                </tr>
            </thead>
            <tbody>
                {members.map(({ id, person: { fullName }, type }) => (
                    <tr key={id}>
                        <td data-label='Nimi'>
                            <Link className='table-link' href={`/member/${id}`}>
                                {fullName}
                            </Link>
                        </td>
                        {!hideType && <td data-label='Tyyppi'>{type}</td>}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>
);

export default MemberTable;
