'use client';

import { useRouter } from 'next/navigation';

import { readStack, writeStack } from '@/utils/navigation-stack';

interface Props {
    fallbackHref: string;
    label?: string;
    className?: string;
    replaceFallback?: boolean;
}

const sanitizeInternalPath = (path: string): string | null => {
    try {
        const url = new URL(path, window.location.origin);
        if (url.origin !== window.location.origin) return null;
        if (!url.pathname.startsWith('/')) return null;
        if (url.pathname.startsWith('/api/auth/')) return null;
        return `${url.pathname}${url.search}${url.hash}`;
    } catch {
        return null;
    }
};

const BackButton = ({
    fallbackHref,
    label = 'Palaa takaisin',
    className = 'btn btn-secondary',
    replaceFallback = false,
}: Props) => {
    const router = useRouter();

    const navigateToFallback = () => {
        if (replaceFallback) {
            router.replace(fallbackHref);
            return;
        }

        router.push(fallbackHref);
    };

    const handleBackClick = () => {
        const currentPath = window.location.pathname + window.location.search;
        let stack = readStack();

        const currentIndex = stack.lastIndexOf(currentPath);
        if (currentIndex !== -1) {
            stack = stack.slice(0, currentIndex + 1);
        }

        if (stack.at(-1) === currentPath) {
            stack.pop();
        }

        const previousPath = stack.at(-1);
        writeStack(stack);

        const safePreviousPath = previousPath ? sanitizeInternalPath(previousPath) : null;

        if (safePreviousPath && safePreviousPath !== currentPath) {
            router.push(safePreviousPath);
            return;
        }

        navigateToFallback();
    };

    return (
        <button className={className} onClick={handleBackClick} type='button'>
            {label}
        </button>
    );
};

export default BackButton;
