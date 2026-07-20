// TODO: metadata
// TODO: font
import { Suspense } from 'react';

import NavigationTracker from '@/components/navigation-tracker';
import '@/styles/globals.css';
import '@/theme/active.css';

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <html lang='fi'>
        <body className='antialiased'>
            <Suspense fallback={null}>
                <NavigationTracker />
            </Suspense>
            {children}
        </body>
    </html>
);

export default RootLayout;
