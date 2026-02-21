import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

// Detectamos si estamos en el proceso de construcción de Vercel
const isBuildPhase = process.env.NEXT_PHASE === 'phase-production-build' || !process.env.MYSQL_HOST;

let sequelize;

if (isBuildPhase) {
  // Creamos un objeto "fake" para que el build no intente abrir sockets de red
  sequelize = {
    define: () => ({}),
    authenticate: () => Promise.resolve(),
    sync: () => Promise.resolve(),
  };
  console.log("⚠️ Fase de Build detectada: Saltando conexión real a MySQL.");
} else {
  sequelize = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      dialect: "mysql",
      dialectModule: mysql2,
      logging: false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
    }
  );
}

export { sequelize };