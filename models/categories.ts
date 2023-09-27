import Sequelize, {
  CreationOptional,
  DataTypes,
  ForeignKey,
  InferAttributes,
  InferCreationAttributes,
  Model,
} from 'sequelize';
import Users from './users';

class Categories extends Model<
  InferAttributes<Categories>,
  InferCreationAttributes<Categories>
> {
  declare categoryId: CreationOptional<number>;
  declare name: string;
  declare color: string;
  declare userId: ForeignKey<Users['userId']>;

  static initiate(sequelize: Sequelize.Sequelize) {
    Categories.init(
      {
        categoryId: {
          type: DataTypes.BIGINT,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },

        name: {
          type: DataTypes.CHAR(50),
          allowNull: false,
        },

        color: {
          type: DataTypes.CHAR(25),
          allowNull: false,
        },
      },

      {
        sequelize,
        modelName: 'Categories',
        tableName: 'Categories',
        timestamps: false,
        charset: 'utf8',
        collate: 'utf8_general_ci',
      }
    );
  }

  static associate() {
    Users.hasMany(Categories, {
      foreignKey: 'userId',
      onDelete: 'SET NULL',
      onUpdate: 'RESTRICT',
    });
  }
}

export default Categories;
