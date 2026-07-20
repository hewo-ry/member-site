import { ProblemDetails } from '../optire/types';
import { ApplicationFormStateState } from './contants';

export interface Application {
    firstName: string;
    lastName: string;
    domicile: string;
    email: string;
    allowMemberLetter: boolean;
}

interface InvalidApplicationFormState {
    application: Partial<Application>;
    errors?: Partial<Record<keyof Application, string>>;
    state: typeof ApplicationFormStateState.INVALID;
}

interface OptireFailedApplicationFormState {
    application: Partial<Application>;
    state: typeof ApplicationFormStateState.OPTIRE_FAILED;
    error: ProblemDetails;
}

interface OptireSuccessApplicationFormState {
    state: typeof ApplicationFormStateState.OPTIRE_SUCCESS;
}

export type ApplicationFormState =
    InvalidApplicationFormState | OptireFailedApplicationFormState | OptireSuccessApplicationFormState;
