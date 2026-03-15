interface Props {
    code?: string;
    title: string;
    body: string;
    variant?: 'section' | 'hero';
    shell?: boolean;
    children?: React.ReactNode;
}

const StatusPage = ({ code, title, body, variant = 'section', shell = true, children }: Props) => {
    const content = (
        <section className={`${variant} space-y-4`}>
            {code && <p className='status-code'>{code}</p>}
            <h1 className='text-3xl font-semibold'>{title}</h1>
            <p className='text-[var(--color-text-muted)]'>{body}</p>
            {children}
        </section>
    );

    return shell ? <div className='page-shell'>{content}</div> : content;
};

export default StatusPage;
