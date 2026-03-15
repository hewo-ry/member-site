'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { submitFee } from '@/lib/fee';
import { FeeFormStateState } from '@/lib/fee/contants';
import { FeeFormState } from '@/lib/fee/types';

interface Props {
    memberId: string;
}

const FeeForm = ({ memberId }: Props) => {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState<FeeFormState>(submitFee, {
        fee: {
            memberId,
        },
        state: FeeFormStateState.INVALID,
    });

    const timestamp = 'timestamp' in state ? state.timestamp : null;
    useEffect(() => {
        if (state.state !== FeeFormStateState.OPTIRE_SUCCESS) return;
        router.refresh();
    }, [router, state.state, timestamp]);

    return (
        <form action={formAction} className='card-soft grid gap-4'>
            <input type='hidden' name='memberId' value={memberId} />
            <div className='grid gap-4 sm:grid-cols-2'>
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
                    <label className='field-label' htmlFor='year'>
                        Vuosi
                    </label>
                    <input
                        className='input'
                        id='year'
                        name='year'
                        type='number'
                        inputMode='numeric'
                        step='1'
                        placeholder='Esim. 2026'
                        defaultValue={state.fee.year}
                    />
                    {'errors' in state && state.errors?.year && <p className='error-text'>{state.errors.year}</p>}
                </div>
            </div>
            <button className='btn btn-secondary w-fit' disabled={isPending}>
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
