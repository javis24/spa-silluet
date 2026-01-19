import { Sequelize } from "sequelize";
import mysql2 from "mysql2"; 

const globalForSequelize = global;

export const sequelize = globalForSequelize.sequelize || new Sequelize(
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
      connectTimeout: 60000, 
    }
  }
);

if (process.env.NODE_ENV !== "production") globalForSequelize.sequelize = sequelize;