import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

const MetricasSalud = sequelize.define("MetricasSalud", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  weight: DataTypes.FLOAT,
  fatPercentage: DataTypes.FLOAT,
  muscleKg: DataTypes.FLOAT,
  bodyWater: DataTypes.FLOAT,
  phy: DataTypes.INTEGER,
  muscle: DataTypes.FLOAT,
  metabolicAge: DataTypes.INTEGER,
  heartRate: DataTypes.INTEGER,
  boneKg: DataTypes.FLOAT,
  visceralFat: DataTypes.FLOAT,
  bmi: DataTypes.FLOAT,
  hip: DataTypes.FLOAT,
  arms: DataTypes.FLOAT,
  thighs: DataTypes.FLOAT,
  calves: DataTypes.FLOAT,
  chest: DataTypes.FLOAT,
  waist: DataTypes.FLOAT,
  abdomen: DataTypes.FLOAT,
  kcla: DataTypes.FLOAT,
  pacienteUuid: { type: DataTypes.UUID, allowNull: false },
}, {
  tableName: "metricas_salud",
  freezeTableName: true,
  timestamps: true,
});

export default MetricasSalud;
