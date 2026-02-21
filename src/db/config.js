import { Sequelize } from "sequelize";
import mysql2 from "mysql2";

let sequelize;

const isBuild = 
  process.env.NEXT_PHASE === 'phase-production-build' || 
  (process.env.NODE_ENV === 'production' && !process.env.MYSQL_HOST);

if (isBuild) {
  // Mock manual que no requiere librerías extras
  sequelize = new Sequelize('database', 'username', 'password', {
    dialect: 'mysql',
    dialectModule: mysql2, // Usamos el que ya tienes
    logging: false,
  });
  
  // Pisamos la función de conexión para que no haga NADA
  sequelize.connectionManager.connect = () => Promise.resolve({
    on: () => {},
    removeListener: () => {},
    end: () => Promise.resolve(),
  });
  
  console.log("🛠️ Build Phase: Sequelize connection blocked safely.");
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