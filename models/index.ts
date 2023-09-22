import path from 'path';
import Sequelize from 'sequelize';
import process from 'process';
import configObj from '../config';
import Users from './users';
import Todos from './todos';
import Categories from './categories';
import TaskCategories from './taskCategories';

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

Users.initiate(sequelize);
Todos.initiate(sequelize);
Categories.initiate(sequelize);
TaskCategories.initiate(sequelize);

Todos.associate();
Categories.associate();
TaskCategories.associate();
