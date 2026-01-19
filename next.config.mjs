/** @type {import('next').NextConfig} */
const nextConfig = {

  serverExternalPackages: ['sequelize', 'mysql2'],

  
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },

  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;