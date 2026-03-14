'use server';

import optireApi, { handleErrorResponse } from '@/lib/optire';

import { ApiResponse } from '../optire/types';
import { getAssociationId } from '../utils';
import { Association, Fee, Member, SimpleMember } from './types';

export const getAssociations = async (): Promise<ApiResponse<Association[]>> =>
    optireApi.get<Association[]>(`association`);

export const getAssociationById = async (id?: string): Promise<ApiResponse<Association>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.get<Association>(`association/${id}`))
        .catch((err) => handleErrorResponse(err, ''));

export const createAssociationMember = async (
    id: string | undefined,
    member: Omit<SimpleMember, 'id' | 'person'> & {
        person: Omit<SimpleMember['person'], 'fullName' | 'officialFullName' | 'updated'>;
    },
): Promise<ApiResponse<SimpleMember>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.post<SimpleMember>(`association/${id}/member`, member))
        .catch((err) => handleErrorResponse(err, ''));

export const getAssociationMemberById = async (
    id: string | undefined,
    memberId: string,
): Promise<ApiResponse<Member>> =>
    (id ? Promise.resolve(id) : getAssociationId())
        .then((id) => optireApi.get<Member>(`association/${id}/member/${memberId}`))
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
