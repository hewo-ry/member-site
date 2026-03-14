import { genericOAuthClient } from 'better-auth/client/plugins';
import { createAuthClient } from 'better-auth/react';

export const { signIn, signOut } = createAuthClient({
    plugins: [genericOAuthClient()],
});
