/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi minimal untuk Vercel
  images: {
    domains: ["images.unsplash.com", "upload.wikimedia.org"],
    // Jangan gunakan unoptimized di Vercel
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  // Pastikan tidak ada output: export
  // Pastikan tidak ada trailingSlash
  // Pastikan tidak ada konfigurasi yang menyebabkan static export
}

module.exports = nextConfig
