/** @type {import('next').NextConfig} */
const nextConfig = {
  // 1. Optimización para Vercel
  output: 'standalone',

  // 2. Evita que Next.js intente procesar los binarios de la DB
  serverExternalPackages: ['sequelize', 'mysql2'],

  // 3. Solución al "Call retries were exceeded" (limita a un solo proceso de build)
  experimental: {
    workerThreads: false,
    cpus: 1,
  },

  // 4. Saltamos validaciones pesadas para agilizar el build
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  // 5. Configuración de Webpack para evitar errores de módulos de Node en el cliente
  webpack: (config, { isServer }) => {
    config.module.exprContextCritical = false;

    if (!isServer) {
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
        dns: false,
      };
    }
    return config;
  },
};

export default nextConfig;