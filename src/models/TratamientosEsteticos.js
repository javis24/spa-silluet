import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

const TratamientosEsteticos = sequelize.define("TratamientosEsteticos", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  pacienteUuid: { type: DataTypes.UUID, allowNull: false },
  cavitation: { type: DataTypes.INTEGER, defaultValue: 0 },
  radioFrequency: { type: DataTypes.INTEGER, defaultValue: 0 },
  lipoLaser: { type: DataTypes.INTEGER, defaultValue: 0 },
  vacuum: { type: DataTypes.INTEGER, defaultValue: 0 },
  gluteCups: { type: DataTypes.INTEGER, defaultValue: 0 },
  woodTherapy: { type: DataTypes.INTEGER, defaultValue: 0 },
  lymphaticDrainage: { type: DataTypes.INTEGER, defaultValue: 0 },
  detox: { type: DataTypes.INTEGER, defaultValue: 0 },
  mesotherapy: { type: DataTypes.INTEGER, defaultValue: 0 },
  passiveGym: { type: DataTypes.INTEGER, defaultValue: 0 },
}, {
  tableName: "tratamientos_esteticos",
  freezeTableName: true,
  timestamps: true,
});

export default TratamientosEsteticos;
