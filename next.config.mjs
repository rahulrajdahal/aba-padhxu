/** @type {import('next').NextConfig} */

const nextConfig = {
  images: {
    remotePatterns: [new URL("https://res.cloudinary.com/**")],
  },
  cacheComponents: true,
};

export default nextConfig;
