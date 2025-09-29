import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

const Paciente = sequelize.define("Paciente", {
  uuid: { type: DataTypes.UUID, defaultValue: DataTypes.UUIDV4, primaryKey: true, allowNull: false },
  address: DataTypes.STRING,
  phoneNumber: { type: DataTypes.STRING, validate: { isNumeric: true } },
  email: { type: DataTypes.STRING, validate: { isEmail: true } },
  evaluationDate: DataTypes.DATE,
  age: { type: DataTypes.INTEGER, validate: { min: 0 } },
  height: { type: DataTypes.FLOAT, validate: { min: 0 } },
  unwantedGain: DataTypes.STRING,
  pathologies: DataTypes.TEXT,
  lastActive: DataTypes.DATE,
  userId: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: false,
    references: { model: "users", key: "id" },
  },
}, {
  tableName: "paciente",
  freezeTableName: true,
  timestamps: true,
});

export default Paciente;
