import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

let sequelize;

// La fase 'phase-production-build' es cuando ocurre el error
if (process.env.NEXT_PHASE === 'phase-production-build') {
  sequelize = new Proxy({}, {
    get: () => () => ({ define: () => ({}), sync: () => Promise.resolve() })
  });
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