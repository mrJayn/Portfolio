/** @type {import('next').NextConfig} */

module.exports = {
    images: {
        loader: 'akamai',
        path: '/Portfolio/_next',
    },
    basePath: '/Portfolio',
    assetPrefix: '/Portfolio/',
    webpack5: true,
    webpack: (config) => {
        config.resolve.fallback = { fs: false }
        return config
    },
}