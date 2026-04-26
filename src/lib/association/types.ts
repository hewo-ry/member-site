import { MemberType } from './contants';

export interface Association {
    readonly id: string;
    name: string;
    businessId: string;
    readonly members: SimpleMember[];
    owner: string;
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
}

export interface Member extends SimpleMember {
    allowMemberLetter: boolean;
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
