import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class User extends Model {}

User.init(
  {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING(120),
      unique: true,
      allowNull: false,
      validate: { isEmail: true }
    },
    passwordHash: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    role: {
      type: DataTypes.ENUM("student", "instructor", "admin"),
      allowNull: false,
    },
  },
  {
    sequelize, // la conexión
    modelName: "User",
    tableName: "users",
    timestamps: true,
  }
);

export default User;