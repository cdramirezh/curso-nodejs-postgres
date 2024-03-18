const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ProductsService {
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
    return await product.update(changes);
  }

  async delete(id) {
    const product = await this.findOne(id);
    await product.destroy();
    return { id };
  }
}

module.exports = ProductsService;
