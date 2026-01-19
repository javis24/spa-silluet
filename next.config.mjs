/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ya no necesitamos 'bcrypt' aquí porque bcryptjs es JS puro.
  // Mantenemos sequelize y mysql2 para que no den problemas de drivers.
  serverExternalPackages: ['sequelize', 'mysql2'],

  // Mantenemos las optimizaciones de memoria
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