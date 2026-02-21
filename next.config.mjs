/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',


  serverExternalPackages: ['sequelize', 'mysql2'],

  experimental: {

    cpus: 1,
    workerThreads: false,
  },


  turbopack: {}, 

};

export default nextConfig;