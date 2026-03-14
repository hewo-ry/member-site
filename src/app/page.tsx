import Link from 'next/link';

import SignInButton from '@/components/sign-in-button';

const Page = () => (
    <div>
        <Link href='/application'>Hae jäseneksi</Link>
        <SignInButton />
    </div>
);

export default Page;
