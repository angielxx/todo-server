import Sequelize, {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Users from './users';

class Todos extends Model<
  InferAttributes<Todos>,
  InferCreationAttributes<Todos>
> {
  declare todoId: CreationOptional<number>;
  declare date: string;
  declare title: string;
  declare status: 'done' | 'in progress' | 'not started';
  declare created_at: CreationOptional<Date>;
  declare updated_at: CreationOptional<Date>;
  declare userId: ForeignKey<Users['userId']>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Todos.init(
      {
        todoId: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        title: {
          type: DataTypes.CHAR(50),
          allowNull: false,
        },
        status: {
          type: DataTypes.CHAR(25),
          allowNull: false,
        },

        created_at: DataTypes.DATE,
        updated_at: DataTypes.DATE,
      },

      {
        sequelize,
        modelName: 'Todos',
        tableName: 'Todos',
        paranoid: true,
        charset: 'utf8',
        collate: 'utf8_general_ci',
        createdAt: 'created_at',
        updatedAt: 'updated_at',
      }
    );
  }

  static associate() {
    Users.hasMany(Todos, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
    });
  }
}

export default Todos;
