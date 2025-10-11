// src/models/index.js
import { sequelize } from "../config/db.js";

import User from "./user.model.js";
import Course from "./course.model.js";
import Lesson from "./lesson.model.js";
import Enrollment from "./enrollment.model.js";
import Comment from "./comment.model.js";

// ====================
// RELACIONES
// ====================

// 1) User ↔ Course (relación de ownership)
User.hasMany(Course, {
  as: "ownedCourses",
  foreignKey: "ownerId",
});
Course.belongsTo(User, {
  as: "owner",
  foreignKey: "ownerId",
});

// 2) Course ↔ Lesson (1:N)
Course.hasMany(Lesson, {
  as: "lessons",
  foreignKey: "courseId",
});
Lesson.belongsTo(Course, {
  as: "course",
  foreignKey: "courseId",
});

// 3) User ↔ Course (N:M) vía Enrollment
User.belongsToMany(Course, {
  through: Enrollment,
  as: "enrolledCourses",
  foreignKey: "userId",
});
Course.belongsToMany(User, {
  through: Enrollment,
  as: "students",
  foreignKey: "courseId",
});

// También mantener accesibles las relaciones directas desde Enrollment
Enrollment.belongsTo(User, {
  as: "user",
  foreignKey: "userId",
});
Enrollment.belongsTo(Course, {
  as: "course",
  foreignKey: "courseId",
});
User.hasMany(Enrollment, {
  as: "enrollments",
  foreignKey: "userId",
});
Course.hasMany(Enrollment, {
  as: "enrollments",
  foreignKey: "courseId",
});

// 4) Lesson ↔ Comment (1:N)
Lesson.hasMany(Comment, {
  as: "comments",
  foreignKey: "lessonId",
});
Comment.belongsTo(Lesson, {
  as: "lesson",
  foreignKey: "lessonId",
});

// 5) User ↔ Comment (1:N)
User.hasMany(Comment, {
  as: "comments",
  foreignKey: "userId",
});
Comment.belongsTo(User, {
  as: "author",
  foreignKey: "userId",
});

// ====================
// EXPORTS
// ====================
export { sequelize, User, Course, Lesson, Enrollment, Comment };
