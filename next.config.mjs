/** @type {import('next').NextConfig} */
const nextConfig = {

  serverExternalPackages: ['sequelize', 'mysql2'],


  eslint: {
    ignoreDuringBuilds: true,
  },

  
  typescript: {
    ignoreBuildErrors: true,
  },


  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;