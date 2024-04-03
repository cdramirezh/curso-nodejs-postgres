const { Op } = require('sequelize');
const { models } = require('../libs/sequelize');
const boom = require('@hapi/boom');

class ProductsService {
  async create(data) {
    const newProduct = await models.Product.create(data);
    return newProduct;
  }

  async find(query) {
    // build the options object regarding query
    let options = {
      where: {},
    };
    const { limit, offset, price, price_min, price_max } = query;
    if (limit !== undefined && offset !== undefined) {
      options.limit = limit;
      options.offset = offset;
    }
    if (price !== undefined) options.where.price = price;
    else options.where.price = {
      ...((price_min !== undefined) && {[Op.gte]: price_min}),
      ...((price_max !== undefined) && {[Op.lte]: price_max}),
    }

    const data = await models.Product.findAll(options);
    return data;
  }

  async findOne(id) {
    const product = await models.Product.findByPk(id, {
      include: ['category'],
    });
    if (!product) throw boom.notFound('product not found');
    if (product.isBlocked) throw boom.conflict('product is blocked');
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
