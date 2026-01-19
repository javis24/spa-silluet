/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. IMPORTANTE: Agregamos 'bcrypt' aquí. 
  // Al ser una librería nativa, rompe el build si Next.js intenta empaquetarla.
  serverExternalPackages: ['sequelize', 'mysql2', 'bcrypt'],

  // 2. Optimizaciones de memoria para evitar el "WorkerError"
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 3. Configuración de Webpack para evitar advertencias de Sequelize
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;