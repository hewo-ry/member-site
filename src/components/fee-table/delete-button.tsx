'use client';

import { useRouter } from 'next/navigation';

import { deleteAssociationMemberFee } from '@/lib/association';
import { Fee, Member } from '@/lib/association/types';

interface Props {
    memberId: Member['id'];
    feeId: Fee['id'];
}

// TODO: loading
// TODO: error handling
const DeleteButton = ({ memberId, feeId }: Props) => {
    const router = useRouter();
    const handleDelete = () => deleteAssociationMemberFee(undefined, memberId, feeId).then(() => router.refresh());

    return <button onClick={handleDelete}>POISTA</button>;
};

export default DeleteButton;
