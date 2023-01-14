/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    websiteURL: 'http://localhost:3000',
  },
  reactStrictMode: true,
  images: { domains: ['www.cozey.ca'] },
};

module.exports = nextConfig;
