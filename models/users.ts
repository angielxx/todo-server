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
  declare userId: CreationOptional<number>;
  declare email: string;
  declare password: string;
  declare createdAt: CreationOptional<Date>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Users.init(
      {
        userId: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },

        email: {
          type: DataTypes.STRING(255),
          allowNull: false,
        },

        password: {
          type: DataTypes.STRING(512),
          allowNull: false,
        },

        createdAt: DataTypes.DATE,
      },

      {
        sequelize,
        modelName: 'Users',
        tableName: 'Users',
        charset: 'utf8',
        collate: 'utf8_general_ci',
        updatedAt: false,
        deletedAt: false,
      }
    );
  }
}

export default Users;
