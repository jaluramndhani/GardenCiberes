/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Konfigurasi untuk images
  images: {
    domains: ["images.unsplash.com", "upload.wikimedia.org"],
    // Gunakan unoptimized hanya jika benar-benar diperlukan
    unoptimized: true,
  },
  // Hapus output: 'export' karena tidak kompatibel dengan API routes
  // Hapus trailingSlash karena bisa menyebabkan masalah routing
}

module.exports = nextConfig
