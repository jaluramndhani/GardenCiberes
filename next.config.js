/** @type {import('next').NextConfig} */
const nextConfig = {
  // Konfigurasi minimal
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
}

module.exports = nextConfig
