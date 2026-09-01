'use client';

import { signIn } from '@/auth-client';

const SignInButton = () => {
    const handleClick = () =>
        signIn.social({
            provider: 'keycloak',
            callbackURL: '/member',
        });

    return (
        <button className='btn btn-primary' onClick={handleClick}>
            Kirjaudu sisään
        </button>
    );
};

export default SignInButton;
