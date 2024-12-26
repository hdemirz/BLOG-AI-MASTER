/** @type {import('next').NextConfig} */
const nextConfig = {
  // Temel ayarlar
  reactStrictMode: true,
  swcMinify: true,
  
  // Resim ayarları
  images: {
    domains: ['images.unsplash.com'],
  },

  // TypeScript ayarları
  typescript: {
    ignoreBuildErrors: false,
  },

  // Geliştirme sunucusu ayarları
  webpack: (config) => {
    config.watchOptions = {
      poll: false,
      ignored: ['**/node_modules', '**/.next'],
    }
    return config
  },
}

module.exports = nextConfig 