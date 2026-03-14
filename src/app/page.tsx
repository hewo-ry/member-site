import Link from 'next/link';

import SignInButton from '@/components/sign-in-button';
import { getAssociationById } from '@/lib/association';

const Page = async () => {
    const { data: association, error } = await getAssociationById();

    // TODO: handle error
    if (error) console.error(error);

    return (
        <div>
            <h1>{association?.name}</h1>
            <Link href='/application'>Hae jäseneksi</Link>
            <SignInButton />
        </div>
    );
};

export default Page;
