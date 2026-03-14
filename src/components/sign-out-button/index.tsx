'use client';

import { useRouter } from 'next/navigation';

import { signOut } from '@/auth-client';

const SignOutButton = () => {
    const router = useRouter();

    const handleClick = () =>
        signOut({
            fetchOptions: {
                onSuccess: () => {
                    router.push('/');
                },
            },
        });

    return (
        <button className='btn btn-secondary' onClick={handleClick}>
            Kirjaudu ulos
        </button>
    );
};

export default SignOutButton;
