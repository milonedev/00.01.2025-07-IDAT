import 'dotenv/config';
import { Sequelize } from 'sequelize';

const dialect = process.env.DB_DIALECT || 'mysql';
const isPostgres = dialect === 'postgres';

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASS,
  {
    host: process.env.DB_HOST,
    port: process.env.DB_PORT,
    dialect,
    logging: process.env.NODE_ENV === 'development' ? console.log : false,
    dialectOptions: isPostgres
      ? { ssl: process.env.PGSSL ? { require: true, rejectUnauthorized: false } : undefined }
      : {},
    define: { underscored: false, freezeTableName: true },
  },
);
