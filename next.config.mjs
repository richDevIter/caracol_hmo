/** @type {import('next').NextConfig} */
const nextConfig = {
    reactStrictMode: false, // Foi modificado para false para resolver o problema do RECAPTCHA que não renderizava.
    images: {
        formats: ['image/avif', 'image/webp'],
        minimumCacheTTL: 31557600, //In seconds
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'storage.googleapis.com',
            port: '',
            pathname: '/**',
          },
        ],
      },
      webpack: (config, { isServer }) => {
        if (!isServer) {
          config.resolve.fallback = { fs: false, child_process: false, net: false, tls: false, ...config.resolve.fallback };
        }
        return config;
      },


}

export default nextConfig;
