// TODO: metadata
// TODO: front

const RootLayout = ({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) => (
    <html lang='fi'>
        <body>{children}</body>
    </html>
);

export default RootLayout;
