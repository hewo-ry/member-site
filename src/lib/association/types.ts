import { MemberType, MemberTypeChangeFormStateState } from './contants';

export interface SimpleAssociation {
    readonly id: string;
    name: string;
    businessId: string;
    owner: string;
}

export interface Association extends SimpleAssociation {
    shortName: string | null;
    description: string | null;
    introduction: string | null;
    applicationInstructions: string | null;
    contacts: string | null;
    memberLetterDescription: string | null;
    applicationMessageDescription: string | null;
    readonly members: SimpleMember[];
}

interface Person {
    firstName: string;
    lastName: string;
    preferredFirstName?: string;
    preferredLastName?: string;
    domicile: string;
    email: string;
    readonly updated: string;
    readonly fullName: string;
    readonly officialFullName: string;
}

export interface SimpleMember {
    readonly id: string;
    type: MemberType;
    person: Pick<Person, 'updated' | 'fullName' | 'officialFullName'>;
    user: {
        sub: string;
    } | null;
}

export interface Member extends SimpleMember {
    allowMemberLetter: boolean;
    applicationMessage?: string | null;
    fees: Fee[];
    person: Person;
}

export interface Fee {
    readonly id: number;
    amount: number;
    seasonStartTime: string;
    seasonEndTime: string;
    readonly created: string;
}

export interface MemberTypeChangeFormState {
    state: MemberTypeChangeFormStateState;
    timestamp: number;
    type: Member['type'];
}
