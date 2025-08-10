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
  // Provide fallback environment variables for build time
  env: {
    NEXT_PUBLIC_SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://example.supabase.co',
    NEXT_PUBLIC_SUPABASE_ANON_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'example-anon-key',
  },
}

module.exports = nextConfig
