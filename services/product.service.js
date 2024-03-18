const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ProductsService {
  constructor() {
    this.products = [];
  }

  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find() {
    const data = await models.Product.findAll();
    return data;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id);
    if (!product) throw boom.notFound('product not found');
    if (product.isBlocked) throw boom.conflict('product is block');
    return product;
  }

  async update(id, changes) {
    const product = await this.findOne(id);
    if (!product) throw boom.notFound('product not found');
    return await product.update(changes);
  }

  async delete(id) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw boom.notFound('product not found');
    }
    this.products.splice(index, 1);
    return { id };
  }
}

module.exports = ProductsService;
