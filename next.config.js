/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "upload.wikimedia.org"],
    unoptimized: true,
  },
  // Add this to handle the static HTML files
  async rewrites() {
    return [
      {
        source: "/:path*.html",
        destination: "/:path*.html",
      },
    ]
  },
  // This is important for Vercel deployment
  output: "standalone",
}

module.exports = nextConfig
