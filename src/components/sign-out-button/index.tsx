'use client';

import { signOut } from '@/auth-client';
import { getLogoutUrl } from '@/lib/auth/utils';

const SignOutButton = () => {
    const handleClick = async () => {
        const logoutUrl = await getLogoutUrl(window.origin).catch(() => window.origin);
        return signOut().then(() => {
            window.location.href = logoutUrl;
        });
    };

    return (
        <button className='btn btn-secondary' onClick={handleClick}>
            Kirjaudu ulos
        </button>
    );
};

export default SignOutButton;
