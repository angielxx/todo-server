import Sequelize, {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Users from './users';
import Categories from './categories';

class Todos extends Model<
  InferAttributes<Todos>,
  InferCreationAttributes<Todos>
> {
  declare todoId: CreationOptional<number>;
  declare date: string;
  declare title: string;
  declare isCompleted: boolean;
  declare createdAt: CreationOptional<Date>;
  declare updatedAt: CreationOptional<Date>;
  declare userId: ForeignKey<Users['userId']>;
  declare categoryId: ForeignKey<Categories['categoryId']>;

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
          type: DataTypes.DATEONLY,
          allowNull: false,
        },

        title: {
          type: DataTypes.STRING(50),
          allowNull: false,
        },

        isCompleted: {
          type: DataTypes.BOOLEAN,
          defaultValue: false,
          allowNull: false,
        },

        createdAt: DataTypes.DATE,
        updatedAt: DataTypes.DATE,
      },

      {
        sequelize,
        timestamps: true,
        modelName: 'Todos',
        tableName: 'Todos',
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate() {
    Users.hasMany(Todos, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
    });

    Categories.hasMany(Todos, {
      foreignKey: 'categoryId',
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
    });
  }
}

export default Todos;
