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
  experimental: {
    workerThreads: false,
    cpus: 1
  },
eslint: { ignoreDuringBuilds: true },
  typescript: { ignoreBuildErrors: true },

  webpack: (config, { isServer }) => {
    if (!isServer) {
      // Sequelize y mysql2 no deben cargarse en el cliente nunca
      config.resolve.fallback = {
        ...config.resolve.fallback,
        fs: false,
        net: false,
        tls: false,
        child_process: false,
      };
    }
    config.module.exprContextCritical = false;
    return config;
  },
};

export default nextConfig;