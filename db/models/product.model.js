const { Model, DataTypes } = require('sequelize');
const PRODUCTS_TABLE = 'products';
const ProductSchema = {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
    allowNull: false,
  },
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.DECIMAL(10, 2), allowNull: false },
  image: DataTypes.STRING,
  isBlocked: { allowNull: false, type: DataTypes.BOOLEAN },
};
class Product extends Model {
  static associate() {}
  static config(sequelize) {
    return {
      sequelize,
      tableName: PRODUCTS_TABLE,
      modelName: 'Product',
      timestamps: false,
    };
  }
}

module.exports = { PRODUCTS_TABLE, ProductSchema, Product };
