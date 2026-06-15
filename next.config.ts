import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  images: {
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/fiyat-listesi',
        destination: '/fiyat-listeleri',
        permanent: true,
      },
      {
        source: '/fiyat-listesi/:slug',
        destination: '/fiyat-listeleri/:slug',
        permanent: true,
      },
    ]
  },
}

export default nextConfig
