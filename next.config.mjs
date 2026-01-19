/** @type {import('next').NextConfig} */
const nextConfig = {
  // Modo Standalone para ahorrar mucha memoria en Vercel
  output: 'standalone',

  // Paquetes externos para evitar conflictos de compilación
  serverExternalPackages: ['sequelize', 'mysql2'],

  // 👇 ESTO SUSTITUYE AL COMANDO --no-lint
  eslint: {
    ignoreDuringBuilds: true,
  },
  
  // Ignoramos errores de TypeScript en el build
  typescript: {
    ignoreBuildErrors: true,
  },
  
  webpack: (config) => {
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;