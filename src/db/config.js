import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

let sequelize;

// Verificamos de múltiples formas si estamos en el Build de Vercel
const isBuild = 
  process.env.NEXT_PHASE === 'phase-production-build' || 
  process.env.NODE_ENV === 'production' && !process.env.MYSQL_HOST;

if (isBuild) {
  // Mock mínimo pero funcional para que los modelos no exploten al inicializarse
  sequelize = new Sequelize('sqlite::memory:', { logging: false });
  console.log("🛠️ Build detected: Using memory mock for Sequelize");
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