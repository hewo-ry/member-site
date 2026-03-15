'use server';

import { headers } from 'next/headers';
import { forbidden, unauthorized } from 'next/navigation';

import { Role, auth } from '@/auth';

import { createAssociationMemberFee } from '../association';
import { FeeFormStateState } from './contants';
import { Fee, FeeFormState } from './types';

export const submitFee = async (_: FeeFormState, formData?: FormData): Promise<FeeFormState> => {
    const session = await auth.api.getSession({ headers: await headers() });
    if (!session || session.user.role === Role.NONE) unauthorized();
    if (session.user.role !== Role.ADMIN) forbidden();

    const memberId = formData?.get('memberId') as string | undefined;
    const amount = parseNumber(formData?.get('amount') as string | undefined);
    const year = parseNumber(formData?.get('year') as string | undefined);

    const errors: Partial<Record<keyof Fee, string>> = {};

    const fee: Partial<Fee> = {
        memberId,
        amount,
        year,
    };

    if (amount === undefined) errors['amount'] = 'Aseta määrä';
    else if (amount < 0 || amount > 9999999) errors['amount'] = 'Määrän tulee olla väliltä 0 - 9 999 999';
    if (year === undefined) errors['year'] = 'Aseta vuosi';
    else if (year < 2000 || year >= 2100) errors['year'] = 'Vuoden tulee olla väliltä 2000 - 2099';

    if (Object.keys(errors).length > 0 || amount === undefined || year === undefined || !memberId)
        return {
            fee,
            errors,
            state: FeeFormStateState.INVALID,
        };

    const { error } = await createAssociationMemberFee(undefined, memberId, {
        amount,
        seasonStartTime: `${year}-01-01T00:00:00+02:00`,
        seasonEndTime: `${year}-12-31T00:00:00+02:00`,
    });

    return error
        ? {
              fee,
              error,
              state: FeeFormStateState.OPTIRE_FAILED,
          }
        : {
              fee: {},
              state: FeeFormStateState.OPTIRE_SUCCESS,
              timestamp: Date.now(),
          };
};

const parseNumber = (number: string | undefined): number | undefined => {
    if (number === undefined) return undefined;
    const parsedNumber = parseInt(number);
    return !Number.isNaN(parsedNumber) ? parsedNumber : undefined;
};
