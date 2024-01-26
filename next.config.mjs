/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'tailwindui.com',
        port: '',
        pathname: '/dashboard',
      },
      {
        protocol: 'http',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/dashboard',
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

