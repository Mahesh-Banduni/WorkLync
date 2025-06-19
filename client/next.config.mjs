/** @type {import('next').NextConfig} */
const nextConfig = {
  //output: 'export', // Required for static export (SSG)
  eslint: {
    ignoreDuringBuilds: true, // Allow builds even if ESLint fails
  },
  // Optional: Add trailingSlash if needed for hosting
  trailingSlash: true,
};

export default nextConfig;
