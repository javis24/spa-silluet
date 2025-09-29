// sync.js
import "dotenv/config.js";
import { sequelize } from "./src/db/config.js";
import {
  Users,
  Paciente,
  TratamientosEsteticos,
  MetricasSalud,
  RegistroAsistencia,
  Cita,
  AbonoSemanal,
} from "./src/models/Index.js";

async function main() {
  try {
    console.log("🔄 Iniciando sincronización con la base de datos...");

    // 🔐 Validación opcional con SYNC_TOKEN
    if (!process.env.SYNC_TOKEN) {
      throw new Error("❌ Falta la variable SYNC_TOKEN en .env.local");
    }

    await sequelize.authenticate();
    console.log("✅ Conexión establecida con la base de datos");

    // 🔄 Sincronización de modelos
    await sequelize.sync({
      alter: process.env.SEQUELIZE_SYNC === "alter",
      force: process.env.SEQUELIZE_SYNC === "force",
    });

    console.log("✅ Tablas sincronizadas correctamente");
    process.exit(0);
  } catch (error) {
    console.error("❌ Error al sincronizar la base de datos:", error);
    process.exit(1);
  }
}

main();
