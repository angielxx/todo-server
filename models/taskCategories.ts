import Sequelize, {
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Categories from './categories';
import Todos from './todos';

class TaskCategories extends Model<
  InferAttributes<TaskCategories>,
  InferCreationAttributes<TaskCategories>
> {
  declare categoryId: ForeignKey<Categories['categoryId']>;
  declare todoId: ForeignKey<Todos['todoId']>;

  static initiate(sequelize: Sequelize.Sequelize) {
    TaskCategories.init(
      {
        categoryId: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Categories',
            key: 'categoryId',
          },
        },
        todoId: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
          references: {
            model: 'Todos',
            key: 'todoId',
          },
        },
      },

      {
        sequelize,
        modelName: 'TaskCategory',
        tableName: 'TaskCategory',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate() {
    Categories.hasMany(TaskCategories, {
      foreignKey: 'categoryId',
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
    });
    Todos.hasMany(TaskCategories, {
      foreignKey: 'todoId',
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
    });
  }
}

export default TaskCategories;
