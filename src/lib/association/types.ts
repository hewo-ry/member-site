export interface Association {
    readonly id: string;
    name: string;
    businessId: string;
    readonly members: SimpleMember[];
    owner: string;
}

export interface SimpleMember {
    readonly id: string;
    type: 'SPONSHORSHIP' | 'BASIC' | 'STUDENT';
    person: {
        firstName: string;
        lastName: string;
        preferredFirstName?: string;
        preferredLastName?: string;
        email: string;
        readonly updated: string;
        readonly fullName: string;
        readonly officialFullName: string;
    };
}

export interface Member extends SimpleMember {
    fees: Fee[];
}

export interface Fee {
    readonly id: number;
    amount: number;
    seasonStartTime: string;
    seasonEndTime: string;
    readonly created: string;
}
