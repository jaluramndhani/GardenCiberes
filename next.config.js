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
  // Completely disable static generation
  output: "standalone",
  // Disable static optimization for all pages
  experimental: {
    disableOptimizedLoading: true,
    // Skip prerendering error pages
    skipTrailingSlashRedirect: true,
    skipMiddlewareUrlNormalize: true,
  },
  // Pastikan SWC digunakan
  swcMinify: true,
}

module.exports = nextConfig
