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
  // Deshabilitar completamente la prerenderización
  output: "export",
  // Configuración específica para el App Router
  experimental: {
    appDir: true,
    serverComponentsExternalPackages: ["@neondatabase/serverless"],
  },
  // Pastikan SWC digunakan
  swcMinify: true,
}

module.exports = nextConfig
