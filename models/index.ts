import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import configObj from '../config';

const basename = path.basename(__filename);

const env = (process.env.NODE_ENV as 'production' | 'test') || 'development';
const config = configObj[env];

// DB 연결
export const sequelize = new Sequelize.Sequelize(
  config.database,
  config.username,
  config.password,
  { dialect: 'postgres' }
);

// User.initiate(sequelize);
// Todo.initiate(sequelize);

// User.associate();
// Todo.associate();
