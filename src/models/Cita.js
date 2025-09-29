import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

const Cita = sequelize.define("Cita", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
pacienteUuid: {
    type: DataTypes.UUID,
    allowNull: false,
    references: { model: "paciente", key: "uuid" },
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  fecha: { type: DataTypes.DATEONLY, allowNull: false },
  hora: { type: DataTypes.STRING, allowNull: false },
  servicio: { type: DataTypes.STRING, allowNull: true },
  comentario: { type: DataTypes.TEXT, allowNull: true },
}, {
  tableName: "citas",
  freezeTableName: true,
  timestamps: true,
});

export default Cita;
