import FeeForm from '@/components/fee-form';
import { Fee, Member } from '@/lib/association/types';

import DeleteButton from './delete-button';

interface Props {
    memberId: Member['id'];
    fees: Fee[];
}

const currencyFormatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' });
const dateTimeFormatter = new Intl.DateTimeFormat();

const FeeTable = ({ fees, memberId }: Props) => (
    <>
        <table>
            <thead>
                <tr>
                    <th>Määrä</th>
                    <th>Kausi</th>
                    <th>Kirjattu</th>
                    <th />
                </tr>
            </thead>
            <tbody>
                {fees.map(({ id, amount, seasonStartTime, seasonEndTime, created }) => (
                    <tr key={id}>
                        <td>{currencyFormatter.format(amount)}</td>
                        <td>{dateTimeFormatter.formatRange(new Date(seasonStartTime), new Date(seasonEndTime))}</td>
                        <td>{new Date(created).toLocaleString()}</td>
                        <td>
                            {/* TODO: show only for admin */}
                            <DeleteButton memberId={memberId} feeId={id} />
                        </td>
                    </tr>
                ))}
            </tbody>
        </table>
        {/* TODO: show only for admin */}
        <FeeForm memberId={memberId} />
    </>
);

export default FeeTable;
