import type { NextConfig } from 'next';

const orgTheme = process.env.ORG_THEME?.toLowerCase();

const themeFileName = orgTheme === 'pmty' || orgTheme === 'hewo' ? orgTheme : 'hewo';

const nextConfig: NextConfig = {
    experimental: {
        authInterrupts: true,
    },
    reactCompiler: true,
    turbopack: {
        resolveAlias: {
            '@/theme/active.css': `./src/theme/${themeFileName}.css`,
        },
    },
};

export default nextConfig;
