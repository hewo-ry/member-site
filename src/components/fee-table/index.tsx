import FeeForm from '@/components/fee-form';
import FormattedDate from '@/components/formatted-date';
import FormattedDateRange from '@/components/formatted-date-range';
import FormattedNumber from '@/components/formatted-number';
import { Fee, Member } from '@/lib/association/types';

import DeleteButton from './delete-button';

interface Props {
    hideFeeActions: boolean;
    memberId: Member['id'];
    fees: Fee[];
}

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
                            <td data-label='Määrä'>
                                <FormattedNumber options={{ style: 'currency', currency: 'EUR' }} value={amount} />
                            </td>
                            <td data-label='Kausi'>
                                <FormattedDateRange
                                    startDate={new Date(seasonStartTime)}
                                    endDate={new Date(seasonEndTime)}
                                    options={{ dateStyle: 'medium' }}
                                />
                            </td>
                            <td data-label='Kirjattu'>
                                <FormattedDate
                                    date={new Date(created)}
                                    options={{ dateStyle: 'short', timeStyle: 'short' }}
                                />
                            </td>
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
