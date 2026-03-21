// TODO: metadata
// TODO: front
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
            <NavigationTracker />
            {children}
        </body>
    </html>
);

export default RootLayout;
