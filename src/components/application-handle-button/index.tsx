'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect } from 'react';

import { handleUnproseccedMember } from '@/lib/association/actions';
import { Member } from '@/lib/association/types';

interface Props {
    memberId: Member['id'];
    type: 'accept' | 'decline';
}

const ApplicationHandleButton = ({ memberId, type }: Props) => {
    const router = useRouter();
    const [{ success }, formAction, isPending] = useActionState(handleUnproseccedMember, { success: null });

    useEffect(() => {
        if (!success) return;
        if (type === 'accept') router.refresh();
        else router.replace('/member');
    }, [success, router, type]);

    return (
        <form action={formAction}>
            <input type='hidden' name='memberId' value={memberId} />
            <input type='hidden' name='type' value={type} />
            <button
                className={`btn btn-${type === 'accept' ? 'primary' : 'danger'} w-full`}
                disabled={isPending}
                type='submit'
            >
                {isPending ? 'Ladataan..' : type === 'accept' ? 'Hyväksy jäseneksi' : 'Hylkää hakemus'}
            </button>
            {success === false && (
                <p className='error-text'>
                    {type ? 'Hyväksyminen' : 'Hylkääminen'} epäonnistui, yritä myöhemmin uudelleen.
                </p>
            )}
        </form>
    );
};

export default ApplicationHandleButton;
