/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    // Allow builds to succeed even if there are lint errors
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
