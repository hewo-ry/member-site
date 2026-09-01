'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { submitFee } from '@/lib/fee';
import { FeeFormStateState } from '@/lib/fee/contants';
import { FeeFormState } from '@/lib/fee/types';

import { generateFullStartAndEndTimes } from './utilts';

interface Props {
    feeStartDate: string;
    memberId: string;
}

const FeeForm = ({ feeStartDate, memberId }: Props) => {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState<FeeFormState>(submitFee, {
        fee: {
            memberId,
            ...generateFullStartAndEndTimes(feeStartDate),
        },
        state: FeeFormStateState.INVALID,
    });

    const timestamp = 'timestamp' in state ? state.timestamp : null;
    useEffect(() => {
        if (state.state !== FeeFormStateState.OPTIRE_SUCCESS || isPending) return;
        router.refresh();
    }, [isPending, router, state.state, timestamp]);

    return (
        <form action={formAction} className='card-soft grid gap-3 sm:gap-4'>
            <input type='hidden' name='memberId' value={memberId} />
            <div className='grid gap-4 sm:grid-cols-3'>
                <div>
                    <label className='field-label' htmlFor='amount'>
                        Määrä
                    </label>
                    <input
                        className='input'
                        id='amount'
                        name='amount'
                        type='number'
                        inputMode='numeric'
                        step='1'
                        placeholder='Esim. 30'
                        defaultValue={state.fee.amount}
                    />
                    {'errors' in state && state.errors?.amount && <p className='error-text'>{state.errors.amount}</p>}
                </div>
                <div>
                    <label className='field-label' htmlFor='startTime'>
                        Alkupäivä
                    </label>
                    <input
                        className='input'
                        id='startTime'
                        name='startTime'
                        type='date'
                        step='1'
                        min='2000-01-01'
                        max='2099-12-31'
                        defaultValue={state.fee.startTime}
                    />
                    {'errors' in state && state.errors?.startTime && (
                        <p className='error-text'>{state.errors.startTime}</p>
                    )}
                </div>
                <div>
                    <label className='field-label' htmlFor='endTime'>
                        Loppupäivä
                    </label>
                    <input
                        className='input'
                        id='endTime'
                        name='endTime'
                        type='date'
                        step='1'
                        min='2000-01-01'
                        max='2099-12-31'
                        defaultValue={state.fee.endTime}
                    />
                    {'errors' in state && state.errors?.endTime && <p className='error-text'>{state.errors.endTime}</p>}
                </div>
            </div>
            <button className='btn btn-secondary w-full sm:w-fit' disabled={isPending}>
                {isPending ? 'Tallennetaan...' : 'Lisää maksu'}
            </button>
            {state.state === FeeFormStateState.OPTIRE_FAILED && (
                <p className='error-text'>Maksun lisääminen epäonnistui, yritä myöhemmin uudelleen.</p>
            )}
            {state.state === FeeFormStateState.OPTIRE_SUCCESS && !isPending && (
                <p className='success-text'>Maksu lisätty.</p>
            )}
        </form>
    );
};

export default FeeForm;
