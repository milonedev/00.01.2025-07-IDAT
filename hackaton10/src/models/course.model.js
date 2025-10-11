// src/models/course.model.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Course extends Model {}

Course.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING(160),
      allowNull: false,
      unique: true,
      validate: {
        len: [5, 160], // título entre 5 y 160 caracteres
      },
    },
    slug: {
      type: DataTypes.STRING(180),
      allowNull: false,
      unique: true,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    published: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
    studentsCount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
    },
  },
  {
    sequelize,
    modelName: 'Course',
    tableName: 'courses',
    paranoid: true, // soft deletes
    timestamps: true,
  },
);

// 🔎 Scope para traer solo los publicados
Course.addScope('published', {
  where: { published: true },
});

// 🔎 Hook para normalizar título y slug
Course.beforeValidate((course) => {
  if (course.title) course.title = course.title.trim();
  if (!course.slug && course.title) {
    course.slug = course.title
      .toLowerCase()
      .replace(/\s+/g, '-')
      .replace(/[^a-z0-9-]/g, '')
      .slice(0, 180);
  }
});

export default Course;
