import { DataTypes, Model } from "sequelize";
import { sequelize } from "../config/db.js";

class Lesson extends Model {}

Lesson.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(160),
      allowNull: false,
    },
    slug: {
      type: DataTypes.STRING(180),
      allowNull: false,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: [20], // mínimo 20 caracteres
      },
    },
    order: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    // Si tienes relación con Course (courseId):
    courseId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize, // conexión importada
    modelName: "Lesson",
    tableName: "lessons",
    paranoid: true, // borrado lógico
    timestamps: true,
    indexes: [
      {
        unique: true,
        fields: ["slug", "courseId"], // slug + courseId únicos
      },
    ],
  }
);

// 🔎 Hook para normalizar title/slug
Lesson.beforeValidate((lesson) => {
  if (lesson.title) lesson.title = lesson.title.trim();
  if (!lesson.slug && lesson.title) {
    lesson.slug = lesson.title
      .toLowerCase()
      .replace(/\s+/g, "-") // espacios → guiones
      .replace(/[^a-z0-9-]/g, "") // quitar caracteres raros
      .slice(0, 180);
  }
});

export default Lesson;