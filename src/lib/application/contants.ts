export const ApplicationFormStateState = {
    INVALID: 'INVALID',
    OPTIRE_FAILED: 'OPTIRE_FAILED',
    OPTIRE_SUCCESS: 'OPTIRE_SUCCESS',
} as const;

export type ApplicationFormStateState = (typeof ApplicationFormStateState)[keyof typeof ApplicationFormStateState];
