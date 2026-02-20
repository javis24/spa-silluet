import { Sequelize } from "sequelize";
import mysql2 from "mysql2"; 

const globalForSequelize = global;

// Función para obtener la instancia solo cuando se necesite
const getSequelize = () => {
  if (globalForSequelize.sequelize) return globalForSequelize.sequelize;

  const hasCredentials = process.env.MYSQL_DATABASE && process.env.MYSQL_HOST;
  
  if (!hasCredentials) {
    console.warn("⚠️ Sin credenciales de DB. Saltando conexión (esto es normal en el Build).");
    return null;
  }

  const instance = new Sequelize(
    process.env.MYSQL_DATABASE,
    process.env.MYSQL_USER,
    process.env.MYSQL_PASSWORD,
    {
      host: process.env.MYSQL_HOST,
      dialect: "mysql",   
      dialectModule: mysql2, 
      logging: false,
      pool: { max: 5, min: 0, acquire: 30000, idle: 10000 },
      dialectOptions: {
        connectTimeout: 20000, 
      }
    }
  );

  if (process.env.NODE_ENV !== "production") {
    globalForSequelize.sequelize = instance;
  }
  
  return instance;
};

export const sequelize = getSequelize();