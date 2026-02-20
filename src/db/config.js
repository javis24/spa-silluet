import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

const isBuildStep = process.env.NEXT_PHASE === 'phase-production-build' || process.env.NODE_ENV === 'production' && !process.env.MYSQL_HOST;

let sequelizeInstance = null;

if (!isBuildStep && process.env.MYSQL_DATABASE) {
  sequelizeInstance = new Sequelize(
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
} else {
  console.log("µ Build detected or missing credentials: DB initialization skipped.");
  // Exportamos un objeto dummy para que el build no explote al importar
  sequelizeInstance = {
    define: () => ({}),
    sync: () => Promise.resolve(),
    authenticate: () => Promise.resolve(),
  };
}

export const sequelize = sequelizeInstance;