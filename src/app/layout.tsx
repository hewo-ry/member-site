// TODO: metadata
// TODO: front

import '@/styles/globals.css';
import '@/theme/active.css';

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <html lang='fi'>
        <body className='antialiased'>{children}</body>
    </html>
);

export default RootLayout;
