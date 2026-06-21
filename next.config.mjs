/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
  },
  experimental: {
    cacheComponents: true,
  },
};

export default nextConfig;
