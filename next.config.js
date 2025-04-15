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
  // Tambahkan konfigurasi untuk menangani error
  onDemandEntries: {
    // Periode cache halaman
    maxInactiveAge: 25 * 1000,
    // Jumlah halaman yang disimpan di cache
    pagesBufferLength: 2,
  },
  // Tambahkan konfigurasi untuk static HTML export
  trailingSlash: true,
}

module.exports = nextConfig
