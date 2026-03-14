'use client';

import { signIn } from '@/auth-client';

const SignInButton = () => {
    const handleClick = () =>
        signIn.oauth2({
            providerId: 'keycloak',
            callbackURL: '/member',
        });

    return (
        <button className='btn btn-primary' onClick={handleClick}>
            Kirjaudu sisaan
        </button>
    );
};

export default SignInButton;
