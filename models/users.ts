// models/user.js

import Sequelize, {
  CreationOptional,
  DataTypes,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';

class Users extends Model<
  InferAttributes<Users>,
  InferCreationAttributes<Users>
> {
  declare user_id: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare username: string;
  declare created_at: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Users.init(
      {
        user_id: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
        },
        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        password: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },
        username: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        created_at: DataTypes.DATE,
      },
      {
        sequelize,
        modelName: 'Users',
        tableName: 'users',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        createdAt: 'created_at',
        updatedAt: false,
        deletedAt: false,
      }
    );
  }

  // static associate(db) {}
}

export default Users;
