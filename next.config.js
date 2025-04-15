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
  // Deshabilitar la prerenderización de las páginas de error
  experimental: {
    disableOptimizedLoading: true,
  },
  // Remove the exportPathMap configuration as it's not compatible with app directory

  // Pastikan SWC digunakan
  swcMinify: true,
}

module.exports = nextConfig
