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
  // Pastikan SWC digunakan
  swcMinify: true,
}

module.exports = nextConfig
