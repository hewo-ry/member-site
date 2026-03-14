import { ProblemDetails } from '../optire/types';

export interface Fee {
    memberId: string;
    amount: number;
    year: number;
}

interface InvalidFeeFormState {
    fee: Partial<Fee>;
    errors?: Partial<Record<keyof Fee, string>>;
    state: 'INVALID';
}

interface OptireFailedFeeFormState {
    fee: Partial<Fee>;
    state: 'OPTIRE_FAILED';
    error: ProblemDetails;
}

interface OptireSuccessFeeFormState {
    fee: Partial<Fee>;
    state: 'OPTIRE_SUCCESS';
}

export type FeeFormState = InvalidFeeFormState | OptireFailedFeeFormState | OptireSuccessFeeFormState;
