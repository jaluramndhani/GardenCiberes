/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove the "output: standalone" as it might be causing issues with routes-manifest.json
  images: {
    domains: ["images.unsplash.com", "upload.wikimedia.org"],
    unoptimized: process.env.NODE_ENV !== "production",
  },
  // Ensure proper export configuration
  output: "export",
  // Disable image optimization for static export
  images: {
    unoptimized: true,
  },
  // Ensure trailing slashes are handled correctly
  trailingSlash: true,
}

module.exports = nextConfig
