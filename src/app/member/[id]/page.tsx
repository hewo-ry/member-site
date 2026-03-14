import FeeTable from '@/components/fee-table';
import { getAssociationMemberById } from '@/lib/association';

interface Props {
    params: Promise<{ id: string }>;
}

const Page = async ({ params }: Props) => {
    const { data: member, error } = await params.then(({ id }) => getAssociationMemberById(undefined, id));

    // TODO
    if (error) console.error(error);

    return member ? (
        <div>
            <h1>Perustiedot</h1>
            <span>Nimi: {member.person.fullName}</span>
            <span>Sähköposti: {member.person.email}</span>
            <span>Tyyppi: {member.type}</span>
            <h2>Maksut</h2>
            <FeeTable memberId={member.id} fees={member.fees} />
        </div>
    ) : (
        <span>VIRHE</span>
    );
};

export default Page;
