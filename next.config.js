/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    domains: ["images.unsplash.com", "upload.wikimedia.org"],
    unoptimized: true,
  },
  // Disable static optimization for error pages
  experimental: {
    disableOptimizedLoading: true,
  },
  // Disable static generation for error pages
  output: "standalone",
  // Pastikan SWC digunakan
  swcMinify: true,
}

module.exports = nextConfig
