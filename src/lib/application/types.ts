import { ProblemDetails } from '../optire/types';

export interface Application {
    firstName: string;
    lastName: string;
    email: string;
}

interface InvalidApplicationFormState {
    application: Partial<Application>;
    errors?: Partial<Record<keyof Application, string>>;
    state: 'INVALID';
}

interface OptireFailedApplicationFormState {
    application: Partial<Application>;
    state: 'OPTIRE_FAILED';
    error: ProblemDetails;
}

interface OptireSuccessApplicationFormState {
    state: 'OPTIRE_SUCCESS';
}

export type ApplicationFormState =
    | InvalidApplicationFormState
    | OptireFailedApplicationFormState
    | OptireSuccessApplicationFormState;
