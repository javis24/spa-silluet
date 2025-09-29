import { DataTypes } from "sequelize";
import { sequelize } from "../db/config.js";

const Users = sequelize.define("Users", {
  id: { type: DataTypes.INTEGER.UNSIGNED, autoIncrement: true, primaryKey: true },
  uuid: { type: DataTypes.STRING, allowNull: false, defaultValue: DataTypes.UUIDV4 },
  name: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, len: [3, 100] } },
  email: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true, isEmail: true }, unique: true },
  password: { type: DataTypes.STRING, allowNull: false, validate: { notEmpty: true } },
  role: { type: DataTypes.ENUM("admin", "secretary", "pacient"), allowNull: false, defaultValue: "pacient" },
}, {
  tableName: "users",
  freezeTableName: true,
  timestamps: true,
});

export default Users;
