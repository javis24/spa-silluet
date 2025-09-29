import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

const RegistroAsistencia = sequelize.define("RegistroAsistencia", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: "users", key: "id" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  horaEntrada: { type: DataTypes.TIME, allowNull: true },
  horaSalida: { type: DataTypes.TIME, allowNull: true },
}, {
  tableName: "registro_asistencia",
  freezeTableName: true,
  timestamps: true,
});

export default RegistroAsistencia;
