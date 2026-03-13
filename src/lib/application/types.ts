export interface Application {
    firstName: string;
    lastName: string;
    email: string;
}

export interface ApplicationFormState {
    application: Partial<Application>;
    errors?: Partial<Record<keyof Application, string>>;
    success: boolean;
}
