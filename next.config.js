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
  // Configuración específica para las páginas de error
  async exportPathMap(defaultPathMap, { dev, dir, outDir, distDir, buildId }) {
    return {
      ...defaultPathMap,
      "/404": { page: "/404" },
    }
  },
  // Pastikan SWC digunakan
  swcMinify: true,
}

module.exports = nextConfig
