const NAVIGATION_STACK_KEY = 'member-site:navigation-stack';

export const readStack = () => {
    if (typeof window === 'undefined') return [] as string[];

    let value: string | null = null;
    try {
        value = window.sessionStorage.getItem(NAVIGATION_STACK_KEY);
    } catch {
        return [];
    }

    if (!value) return [] as string[];

    try {
        const parsed = JSON.parse(value) as unknown;
        if (!Array.isArray(parsed)) return [];
        return parsed.filter((item): item is string => typeof item === 'string');
    } catch {
        return [];
    }
};

export const writeStack = (stack: string[], maxSize?: number) => {
    if (typeof window === 'undefined') return;

    const sliced = maxSize ? stack.slice(-maxSize) : stack;
    try {
        window.sessionStorage.setItem(NAVIGATION_STACK_KEY, JSON.stringify(sliced));
    } catch {
        // Ignore storage write failures (blocked storage, quota exceeded, etc.)
    }
};

export { NAVIGATION_STACK_KEY };
