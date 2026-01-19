import { Sequelize } from "sequelize";
import mysql2 from "mysql2"; 

const globalForSequelize = global;

// Verificamos si existen las variables antes de crear la instancia
const hasCredentials = process.env.MYSQL_DATABASE && process.env.MYSQL_HOST;

let sequelizeInstance = null;

if (hasCredentials) {
  sequelizeInstance = globalForSequelize.sequelize || new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      dialect: "mysql",   
      dialectModule: mysql2, 
      logging: false,
      pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
      },
      dialectOptions: {
        connectTimeout: 10000, // Timeout corto para fallar rápido si no conecta
      }
    }
  );
}

// Exportamos la instancia (puede ser null durante el build, y eso está bien)
export const sequelize = sequelizeInstance;

if (process.env.NODE_ENV !== "production" && sequelizeInstance) {
  globalForSequelize.sequelize = sequelizeInstance;
}