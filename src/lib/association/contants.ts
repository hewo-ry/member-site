export const MemberType = {
    UNPROCESSED: 'UNPROCESSED',
    BASIC: 'BASIC',

    SPONSORSHIP: 'SPONSORSHIP',
    STUDENT: 'STUDENT',
} as const;

export type MemberType = (typeof MemberType)[keyof typeof MemberType];

export const MemberTypeChangeFormStateState = {
    INITIALIZED: 'INITIALIZED',
    SUCCESS: 'SUCCESS',
    FAILED: 'FAILED',
} as const;

export type MemberTypeChangeFormStateState =
    (typeof MemberTypeChangeFormStateState)[keyof typeof MemberTypeChangeFormStateState];
