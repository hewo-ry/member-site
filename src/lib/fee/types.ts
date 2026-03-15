import { ProblemDetails } from '../optire/types';
import { FeeFormStateState } from './contants';

export interface Fee {
    memberId: string;
    amount: number;
    year: number;
}

interface InvalidFeeFormState {
    fee: Partial<Fee>;
    errors?: Partial<Record<keyof Fee, string>>;
    state: FeeFormStateState.INVALID;
}

interface OptireFailedFeeFormState {
    fee: Partial<Fee>;
    state: FeeFormStateState.OPTIRE_FAILED;
    error: ProblemDetails;
}

interface OptireSuccessFeeFormState {
    fee: Partial<Fee>;
    state: FeeFormStateState.OPTIRE_SUCCESS;
    timestamp: number;
}

export type FeeFormState = InvalidFeeFormState | OptireFailedFeeFormState | OptireSuccessFeeFormState;
