import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";


const AbonoSemanal = sequelize.define("AbonoSemanal", {
  id: { 
    type: DataTypes.INTEGER.UNSIGNED, 
    autoIncrement: true, 
    primaryKey: true 
  },
  pacienteUuid: {
    type: DataTypes.UUID,   
    allowNull: false,
    references: { model: "paciente", key: "uuid" }, 
    onDelete: "CASCADE",
    onUpdate: "CASCADE",
  },
  monto: { 
    type: DataTypes.FLOAT, 
    allowNull: false, 
    validate: { min: 0 } 
  },
  fechaAbono: { 
    type: DataTypes.DATEONLY, 
    defaultValue: DataTypes.NOW 
  },
  semana: { 
    type: DataTypes.INTEGER, 
    allowNull: false 
  },
}, {
  tableName: "abono_semanal",
  freezeTableName: true,
  timestamps: true,
});



export default AbonoSemanal;
