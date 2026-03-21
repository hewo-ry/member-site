const NAVIGATION_STACK_KEY = 'member-site:navigation-stack';

export const readStack = () => {
    const value = sessionStorage.getItem(NAVIGATION_STACK_KEY);
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
    const sliced = maxSize ? stack.slice(-maxSize) : stack;
    sessionStorage.setItem(NAVIGATION_STACK_KEY, JSON.stringify(sliced));
};

export { NAVIGATION_STACK_KEY };
