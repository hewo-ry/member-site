'use client';

import { startTransition, useActionState, useEffect, useState } from 'react';

import { handleMemberTypeChange } from '@/lib/association/actions';
import { MemberType, MemberTypeChangeFormStateState } from '@/lib/association/contants';
import { Member } from '@/lib/association/types';

interface Props {
    hideEdit: boolean;
    id: Member['id'];
    type: Member['type'];
}

const MemberTypeCard = ({ hideEdit, id, type }: Props) => {
    const [{ state, timestamp, type: currentType }, formAction, isPending] = useActionState(handleMemberTypeChange, {
        state: MemberTypeChangeFormStateState.INITIALIZED,
        type,
        timestamp: 0,
    });
    const [edit, setEdit] = useState(state === MemberTypeChangeFormStateState.FAILED || isPending);

    const openEdit = () => setEdit(true);

    useEffect(() => {
        if (state !== MemberTypeChangeFormStateState.SUCCESS && !isPending) return;
        startTransition(() => setEdit(false));
    }, [state, timestamp, isPending]);

    return (
        <div className='card flex justify-between'>
            {edit ? (
                <form action={formAction} className='w-full'>
                    <input type='hidden' name='memberId' value={id} />
                    <div className='flex justify-between'>
                        <select name='type' defaultValue={currentType}>
                            {[MemberType.BASIC, MemberType.SPONSORSHIP, MemberType.STUDENT].map((type) => (
                                <option key={type} value={type}>
                                    {type}
                                </option>
                            ))}
                        </select>
                        <button className='btn btn-primary' disabled={isPending} type='submit'>
                            {isPending ? 'Ladataan..' : 'Tallenna'}
                        </button>
                    </div>
                    {state === MemberTypeChangeFormStateState.FAILED && (
                        <p className='error-text'>Tallentaminen epäonnistui, yritä myöhemmin uudelleen.</p>
                    )}
                </form>
            ) : (
                <>
                    <div>
                        <dt className='field-label'>Tyyppi</dt>
                        <dd>{currentType}</dd>
                    </div>
                    {!hideEdit && (
                        <button className='btn btn-secondary' onClick={openEdit}>
                            Muokkaa
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default MemberTypeCard;
