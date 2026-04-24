import FeeForm from '@/components/fee-form';
import { Fee, Member } from '@/lib/association/types';

import DeleteButton from './delete-button';

interface Props {
    hideFeeActions: boolean;
    memberId: Member['id'];
    fees: Fee[];
}

const currencyFormatter = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'EUR' });
const dateRangeFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'medium' });
const createdAtFormatter = new Intl.DateTimeFormat(undefined, { dateStyle: 'short', timeStyle: 'short' });

const FeeTable = ({ hideFeeActions, fees, memberId }: Props) => (
    <>
        <div className='table-shell'>
            <table className='table table-mobile-cards'>
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
                            <td data-label='Määrä'>{currencyFormatter.format(amount)}</td>
                            <td data-label='Kausi'>
                                {dateRangeFormatter.formatRange(new Date(seasonStartTime), new Date(seasonEndTime))}
                            </td>
                            <td data-label='Kirjattu'>{createdAtFormatter.format(new Date(created))}</td>
                            {!hideFeeActions && (
                                <td data-label='Toiminnot'>
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
