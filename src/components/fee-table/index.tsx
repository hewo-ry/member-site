import FeeForm from '@/components/fee-form';
import { Fee, Member } from '@/lib/association/types';

import DeleteButton from './delete-button';

interface Props {
    hideFeeActions: boolean;
    memberId: Member['id'];
    fees: Fee[];
}

const currencyFormatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' });
const dateTimeFormatter = new Intl.DateTimeFormat();

const FeeTable = ({ hideFeeActions, fees, memberId }: Props) => (
    <>
        <div className='table-shell'>
            <table className='table'>
                <thead>
                    <tr>
                        <th>Määrä</th>
                        <th>Kausi</th>
                        <th>Kirjattu</th>
                        {!hideFeeActions && <th aria-label='Toiminnot' />}
                    </tr>
                </thead>
                <tbody>
                    {fees.map(({ id, amount, seasonStartTime, seasonEndTime, created }) => (
                        <tr key={id}>
                            <td>{currencyFormatter.format(amount)}</td>
                            <td>{dateTimeFormatter.formatRange(new Date(seasonStartTime), new Date(seasonEndTime))}</td>
                            <td>{new Date(created).toLocaleString()}</td>
                            {!hideFeeActions && (
                                <td>
                                    <DeleteButton memberId={memberId} feeId={id} />
                                </td>
                            )}
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
        {!hideFeeActions && (
            <div className='mt-4'>
                <FeeForm memberId={memberId} />
            </div>
        )}
    </>
);

export default FeeTable;
