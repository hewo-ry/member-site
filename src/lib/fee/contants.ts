export const FeeFormStateState = {
    INVALID: 'INVALID',
    OPTIRE_FAILED: 'OPTIRE_FAILED',
    OPTIRE_SUCCESS: 'OPTIRE_SUCCESS',
} as const;

export type FeeFormStateState2 = (typeof FeeFormStateState)[keyof typeof FeeFormStateState];
