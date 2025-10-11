// src/models/comment.model.js
import { DataTypes, Model } from 'sequelize';
import { sequelize } from '../config/db.js';

class Comment extends Model {}

Comment.init(
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    body: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: 'Comment body cannot be empty',
        },
        len: {
          args: [3],
          msg: 'Comment body must be at least 3 characters long',
        },
      },
    },
    // si quieres relación: userId, lessonId, etc.
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    lessonId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: 'Comment',
    tableName: 'comments',
    timestamps: true,
  },
);

// 🔎 Hook para limpiar y validar
Comment.beforeValidate((comment) => {
  if (typeof comment.body === 'string') {
    comment.body = comment.body.trim();
  }
  if (!comment.body || comment.body.length < 3) {
    throw new Error('Comment body is too short');
  }
});

export default Comment;
