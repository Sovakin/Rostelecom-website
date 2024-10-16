/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: true,
    async redirects() {
        return [
            {
                source: '/chat',
                destination: '/chatbot',
                permanent: true,
            },
            {
                source: '/auth',
                destination: '/auth',
                permanent: true,
            }
        ];
    },
};

module.exports = nextConfig;