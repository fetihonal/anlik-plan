/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'theoldredlion.uk',
      'images.unsplash.com',
      'source.unsplash.com',
      'picsum.photos',
      'encrypted-tbn0.gstatic.com',
      'bzyskxkobbtdwfjqijsj.supabase.co'
    ],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['localhost:3001'],
    },
  },
  // Configure ESLint to be less strict during build
  eslint: {
    // Warning instead of error during build
    ignoreDuringBuilds: true,
  },
  // Ignore TypeScript errors during build
  typescript: {
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig
