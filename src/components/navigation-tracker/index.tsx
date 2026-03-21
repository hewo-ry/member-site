'use client';

import { usePathname, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

import { readStack, writeStack } from '@/utils/navigation-stack';

const MAX_STACK_SIZE = 50;

const NavigationTracker = () => {
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!pathname) return;

        const query = searchParams.toString();
        const currentPath = query ? `${pathname}?${query}` : pathname;

        if (currentPath.startsWith('/api/auth/')) return;

        const stack = readStack();

        if (stack.at(-1) === currentPath) return;

        writeStack([...stack, currentPath], MAX_STACK_SIZE);
    }, [pathname, searchParams]);

    return null;
};

export default NavigationTracker;
