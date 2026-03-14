import { ProblemDetails } from '../optire/types';
import { ApplicationFormStateState } from './contants';

export interface Application {
    firstName: string;
    lastName: string;
    email: string;
}

interface InvalidApplicationFormState {
    application: Partial<Application>;
    errors?: Partial<Record<keyof Application, string>>;
    state: ApplicationFormStateState.INVALID;
}

interface OptireFailedApplicationFormState {
    application: Partial<Application>;
    state: ApplicationFormStateState.OPTIRE_FAILED;
    error: ProblemDetails;
}

interface OptireSuccessApplicationFormState {
    state: ApplicationFormStateState.OPTIRE_SUCCESS;
}

export type ApplicationFormState =
    | InvalidApplicationFormState
    | OptireFailedApplicationFormState
    | OptireSuccessApplicationFormState;
