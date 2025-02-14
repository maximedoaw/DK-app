import type { NextConfig } from 'next'
 
const nextConfig: NextConfig = {
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  images: {
      domains: ['firebasestorage.googleapis.com'], // Ajouter le domaine Firebase
  },
}
 
export default nextConfig