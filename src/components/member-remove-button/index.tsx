'use client';

import { useRouter } from 'next/navigation';
import { useActionState, useEffect, useRef } from 'react';

import { handleMemberRemove } from '@/lib/association/actions';
import { Member } from '@/lib/association/types';

const org =
    process.env.ORG_THEME === 'pmty'
        ? { name: 'PMTY:n', register: <>Päivölän opiskelija&shy;rekisteriin</>, email: 'toimisto@paivola.fi' }
        : { name: 'Hewon', register: 'Optiren rekisteriin', email: 'info@hewo.fi' };

interface Props {
    memberId: Member['id'];
    fullName: string;
}

const MemberRemoveButton = ({ memberId, fullName }: Props) => {
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [{ success }, formAction, isPending] = useActionState(handleMemberRemove, { success: null });

    useEffect(() => {
        if (success && !isPending) router.replace('/member');
    }, [isPending, success, router]);

    return (
        <>
            <button className='btn btn-danger' type='button' onClick={() => dialogRef.current?.showModal()}>
                Poista jäsen
            </button>
            <dialog
                ref={dialogRef}
                aria-labelledby='member-remove-title'
                className='card m-auto max-w-md backdrop:bg-black/50'
            >
                <form action={formAction} className='space-y-4'>
                    <h2 id='member-remove-title' className='text-lg font-semibold'>
                        Poistetaanko {fullName} jäsenrekisteristä?
                    </h2>
                    <p>
                        Jäsenen yhteys&shy;tiedot poistetaan {org.name} jäsen&shy;rekisteristä, mutta ne jäävät edelleen{' '}
                        {org.register}. Hän voi poistaa ne sieltä lähettämällä pyynnön osoitteeseen{' '}
                        <code>{org.email}</code>.
                    </p>
                    <input type='hidden' name='memberId' value={memberId} />
                    <div className='flex justify-end gap-2'>
                        <button className='btn btn-secondary' type='button' onClick={() => dialogRef.current?.close()}>
                            Peruuta
                        </button>
                        <button className='btn btn-danger' disabled={isPending} type='submit'>
                            {isPending ? 'Ladataan..' : 'Poista'}
                        </button>
                    </div>
                    {success === false && (
                        <p className='error-text'>Poistaminen epäonnistui, yritä myöhemmin uudelleen.</p>
                    )}
                </form>
            </dialog>
        </>
    );
};

export default MemberRemoveButton;
