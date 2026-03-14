'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { submitFee } from '@/lib/fee';
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
        state: 'INVALID',
    });

    useEffect(() => {
        if (state.state !== 'OPTIRE_SUCCESS') return;
        router.refresh();
    }, [router, state.state]);

    console.log(state);

    return (
        <form action={formAction}>
            <input type='hidden' name='memberId' value={memberId} />
            <div>
                <input name='amount' placeholder='Määrä' defaultValue={state.fee.amount} />
                {'errors' in state && state.errors?.amount && <span>{state.errors.amount}</span>}
            </div>
            <div>
                <input name='year' placeholder='Vuosi' defaultValue={state.fee.year} />
                {'errors' in state && state.errors?.year && <span>{state.errors.year}</span>}
            </div>
            <button disabled={isPending}>Lähetä</button>
            {state.state === 'OPTIRE_FAILED' && <span>Maksun lisääminen epäonnistui, yritä myöhemmin uudelleen</span>}
            {state.state === 'OPTIRE_SUCCESS' && <span>Maksu lisätty!</span>}
        </form>
    );
};

export default FeeForm;
