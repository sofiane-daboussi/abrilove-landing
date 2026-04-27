/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  async rewrites() {
    return [
      {
        source: '/:path*',
        destination: 'https://abrilove.webflow.io/:path*',
      },
    ]
  },
}

export default nextConfig
