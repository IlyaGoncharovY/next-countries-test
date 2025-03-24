import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'upload.wikimedia.org',
        pathname: '/wikipedia/**',
      },
    ],
    unoptimized: true,
  },
  output: 'export',
  trailingSlash: true,
  basePath: '/next-countries-test',
  assetPrefix: '/next-countries-test',
  // publicRuntimeConfig: {
  //   basePath: '/next-countries-test',
  // },
};

export default nextConfig;

