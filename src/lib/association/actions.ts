'use server';

import { headers } from 'next/headers';
import { forbidden, unauthorized } from 'next/navigation';

import { Role, auth } from '@/auth';

import { deleteAssociationMember, updateAssociationMemberType } from '.';
import { MemberType, MemberTypeChangeFormStateState } from './contants';
import { MemberTypeChangeFormState } from './types';

export const handleMemberTypeChange = async (_: unknown, formData?: FormData): Promise<MemberTypeChangeFormState> => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role === Role.NONE) unauthorized();
    if (session.user.role !== Role.ADMIN) forbidden();

    const memberId = (formData?.get('memberId') as string | undefined)?.trim();
    const type = formData?.get('type') as MemberType | undefined;

    if (!memberId || !type || [MemberType.BASIC, MemberType.SPONSORSHIP, MemberType.STUDENT].indexOf(type) === -1)
        return { state: MemberTypeChangeFormStateState.FAILED, timestamp: Date.now(), type: MemberType.BASIC };

    return updateAssociationMemberType(undefined, memberId, type)
        .then(({ error }) => (error ? Promise.reject(error) : Promise.resolve()))
        .then(() => ({
            state: MemberTypeChangeFormStateState.SUCCESS,
            timestamp: Date.now(),
            type,
        }))
        .catch(() => ({
            state: MemberTypeChangeFormStateState.FAILED,
            timestamp: Date.now(),
            type,
        }));
};

export const handleUnproseccedMember = async (
    _: unknown,
    formData?: FormData,
): Promise<{ success: boolean | null }> => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role === Role.NONE) unauthorized();
    if (session.user.role !== Role.ADMIN) forbidden();

    const memberId = (formData?.get('memberId') as string | undefined)?.trim();
    const type = (formData?.get('type') as string | undefined)?.trim();

    if (!memberId || !type || ['accept', 'decline'].indexOf(type) === -1) return { success: false };

    return (
        type === 'accept'
            ? updateAssociationMemberType(undefined, memberId, MemberType.BASIC)
            : deleteAssociationMember(undefined, memberId)
    )
        .then(({ error }) => (error ? Promise.reject(error) : Promise.resolve()))
        .then(() => ({ success: true }))
        .catch(() => ({ success: false }));
};
