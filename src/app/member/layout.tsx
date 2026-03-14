import SignOutButton from '@/components/sign-out-button';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <div>
        <SignOutButton />
        {children}
    </div>
);

export default Layout;
