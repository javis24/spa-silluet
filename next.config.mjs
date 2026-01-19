/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. AGREGA 'bcrypt' AQUÍ. Esto evita que Vercel intente compilarlo y falle.
  serverExternalPackages: ['sequelize', 'mysql2', 'bcrypt'],

  // 2. Optimizaciones para evitar que se acabe la memoria
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 3. Configuración para evitar alertas de Sequelize
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;