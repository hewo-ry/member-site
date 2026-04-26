'use server';

import { headers } from 'next/headers';
import { forbidden, unauthorized } from 'next/navigation';

import { Role, auth } from '@/auth';
import optireApi, { handleErrorResponse } from '@/lib/optire';

import { ApiResponse } from '../optire/types';
import { getAssociationId } from '../utils';
import { MemberType } from './contants';
import { Association, Fee, Member } from './types';

export const getAssociations = async (): Promise<ApiResponse<Association[]>> =>
    optireApi.get<Association[]>(`association`);

export const getAssociationById = async (id?: string): Promise<ApiResponse<Association>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.get<Association>(`association/${id}`))
        .catch((err) => handleErrorResponse(err, ''));

export const createAssociationMember = async (
    id: string | undefined,
    member: Omit<Member, 'fees' | 'id' | 'person'> & {
        person: Omit<Member['person'], 'fullName' | 'officialFullName' | 'updated'>;
    },
): Promise<ApiResponse<Member>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.post<Member>(`association/${id}/member`, member))
        .catch((err) => handleErrorResponse(err, ''));

export const getAssociationMemberById = async (
    id: string | undefined,
    memberId: string,
): Promise<ApiResponse<Member>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.get<Member>(`association/${id}/member/${memberId}`))
        .catch((err) => handleErrorResponse(err, ''));

export const updateAssociationMember = async (
    id: string | undefined,
    { id: memberId, ...member }: Omit<Member, 'fees' | 'person'>,
): Promise<ApiResponse<Member>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.put<Member>(`association/${id}/member/${memberId}`, member))
        .catch((err) => handleErrorResponse(err, ''));

export const deleteAssociationMember = async (
    id: string | undefined,
    memberId: Member['id'],
): Promise<ApiResponse<Member>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.delete<Member>(`association/${id}/member/${memberId}`))
        .catch((err) => handleErrorResponse(err, ''));

export const createAssociationMemberFee = async (
    id: string | undefined,
    memberId: string,
    fee: Omit<Fee, 'id' | 'created'>,
): Promise<ApiResponse<Fee>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.post<Fee>(`association/${id}/member/${memberId}/fee`, fee))
        .catch((err) => handleErrorResponse(err, ''));

export const deleteAssociationMemberFee = async (
    id: string | undefined,
    memberId: string,
    feeId: number,
): Promise<ApiResponse<Fee>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.delete<Fee>(`association/${id}/member/${memberId}/fee/${feeId}`))
        .catch((err) => handleErrorResponse(err, ''));

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
            ? getAssociationMemberById(undefined, memberId)
                  .then(({ data, error }) => (data ? data : Promise.reject(error)))
                  .then(({ id, allowMemberLetter }) =>
                      updateAssociationMember(undefined, {
                          id,
                          allowMemberLetter,
                          type: MemberType.BASIC,
                      }),
                  )
            : deleteAssociationMember(undefined, memberId)
    )
        .then(() => ({ success: true }))
        .catch(() => ({ success: false }));
};
