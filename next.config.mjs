/** @type {import('next').NextConfig} */
const nextConfig = {
  // Activa el modo standalone para reducir consumo de memoria
  output: 'standalone',

  serverExternalPackages: ['sequelize', 'mysql2'],

  // Ignorar errores de lint/types para que el build no falle por eso
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