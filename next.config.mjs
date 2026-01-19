/** @type {import('next').NextConfig} */
const nextConfig = {
  serverExternalPackages: ['sequelize', 'mysql2'],
  
  eslint: {

    ignoreDuringBuilds: true,
  },
  typescript: {
   
    ignoreBuildErrors: true,
  },

};

export default nextConfig;