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

    useEffect(() => {
        if (state.state !== FeeFormStateState.OPTIRE_SUCCESS) return;
        router.refresh();
    }, [router, state.state]);

    return (
        <form action={formAction} className='grid gap-4 rounded-[var(--radius-md)] border border-[var(--color-border)] bg-[var(--color-surface-soft)] p-4'>
            <input type='hidden' name='memberId' value={memberId} />
            <div className='grid gap-4 sm:grid-cols-2'>
                <div>
                    <label className='field-label' htmlFor='amount'>
                        Maara
                    </label>
                    <input className='input' id='amount' name='amount' placeholder='Esim. 30' defaultValue={state.fee.amount} />
                    {'errors' in state && state.errors?.amount && <p className='error-text'>{state.errors.amount}</p>}
                </div>
                <div>
                    <label className='field-label' htmlFor='year'>
                        Vuosi
                    </label>
                    <input className='input' id='year' name='year' placeholder='Esim. 2026' defaultValue={state.fee.year} />
                    {'errors' in state && state.errors?.year && <p className='error-text'>{state.errors.year}</p>}
                </div>
            </div>
            <button className='btn btn-secondary w-fit' disabled={isPending}>
                {isPending ? 'Tallennetaan...' : 'Lisaa maksu'}
            </button>
            {state.state === FeeFormStateState.OPTIRE_FAILED && (
                <p className='error-text'>Maksun lisaaminen epaonnistui, yrita myohemmin uudelleen.</p>
            )}
            {state.state === FeeFormStateState.OPTIRE_SUCCESS && <p className='success-text'>Maksu lisatty.</p>}
        </form>
    );
};

export default FeeForm;
