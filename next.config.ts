import type { NextConfig } from 'next';

const orgTheme = process.env.ORG_THEME?.toLowerCase();

const themeFileName = orgTheme === 'pmty' || orgTheme === 'hewo' ? orgTheme : 'hewo';

const nextConfig: NextConfig = {
    experimental: {
        authInterrupts: true,
    },

    logging: {
        fetches: {
            fullUrl: true,
        },
    },

    output: 'standalone',

    reactCompiler: true,
    env: {
        ORG_THEME: themeFileName,
    },
    turbopack: {
        resolveAlias: {
            '@/theme/active.css': `./src/theme/${themeFileName}.css`,
        },
    },
    webpack: (config) => {
        if (!config.resolve) {
            config.resolve = {};
        }
        if (!config.resolve.alias) {
            config.resolve.alias = {};
        }
        config.resolve.alias['@/theme/active.css'] = `./src/theme/${themeFileName}.css`;
        return config;
    },
};

export default nextConfig;
