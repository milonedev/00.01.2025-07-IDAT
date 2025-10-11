// src/models/enrollment.model.js
import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Enrollment extends Model {}

Enrollment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    status: {
      type: DataTypes.ENUM("active", "pending"),
      allowNull: false,
      defaultValue: "pending",
    },
    score: {
      type: DataTypes.DECIMAL(5, 2), // hasta 999.99
      allowNull: true,
    },
    // normalmente también tendrías userId y courseId si manejas inscripciones
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // conexión
    modelName: "Enrollment",
    tableName: "enrollments",
    timestamps: true,
  }
);

export default Enrollment;
