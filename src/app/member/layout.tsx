import SignOutButton from '@/components/sign-out-button';

const Layout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <div className='page-shell'>
        <header className='mb-6 flex flex-col gap-3 border-b border-[var(--color-border)] pb-4 sm:flex-row sm:items-center sm:justify-between'>
            <div>
                <p className='text-sm text-[var(--color-text-muted)]'>Jäsenhallinta</p>
                <h1 className='text-2xl font-semibold'>Jäsensivusto</h1>
            </div>
            <SignOutButton />
        </header>
        <main>{children}</main>
    </div>
);

export default Layout;
