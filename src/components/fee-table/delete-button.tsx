'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { Fee, Member } from '@/lib/association/types';
import { deleteFee } from '@/lib/fee';
import { DeleteFeeFormStateState } from '@/lib/fee/contants';
import { DeleteFeeFormState } from '@/lib/fee/types';

interface Props {
    feeId: Fee['id'];
    memberId: Member['id'];
}

const DeleteButton = ({ feeId, memberId }: Props) => {
    const router = useRouter();

    const [state, formAction, isPending] = useActionState<DeleteFeeFormState>(deleteFee, {
        state: DeleteFeeFormStateState.INVALID,
    });

    const timestamp = 'timestamp' in state ? state.timestamp : null;
    useEffect(() => {
        if (state.state !== DeleteFeeFormStateState.OPTIRE_SUCCESS || isPending) return;
        router.refresh();
    }, [isPending, router, state.state, timestamp]);

    return (
        <form action={formAction}>
            <input type='hidden' name='feeId' value={feeId} />
            <input type='hidden' name='memberId' value={memberId} />
            <button className='btn btn-danger' disabled={isPending}>
                {isPending ? 'Poistetaan...' : 'Poista'}
            </button>
            {state.state === DeleteFeeFormStateState.OPTIRE_FAILED && (
                <p className='error-text'>Maksun poistaminen epäonnistui, yritä myöhemmin uudelleen.</p>
            )}
        </form>
    );
};

export default DeleteButton;
