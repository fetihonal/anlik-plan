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
}

module.exports = nextConfig
