const Joi = require('joi');
const { id: categoryId } = require('./category.schema');

const id = Joi.number();
const name = Joi.string().min(3).max(15);
const price = Joi.number().integer().min(10);
const image = Joi.string().uri();
const description = Joi.string().min(10);
const isBlocked = Joi.boolean();
const limit = Joi.number().integer().min(0);
const offset = Joi.number().integer().min(0);

const createProductSchema = Joi.object({
  name: name.required(),
  price: price.required(),
  image: image.required(),
  isBlocked: isBlocked.required(),
  description: description.required(),
  categoryId: categoryId.required(),
});

const updateProductSchema = Joi.object({
  name: name,
  price: price,
  image: image,
  description: description.required(),
  categoryId: categoryId,
});

const getProductSchema = Joi.object({
  id: id.required(),
});

const queryProductSchema = Joi.object()
  .keys({ limit, offset })
  .and('limit', 'offset');

module.exports = {
  createProductSchema,
  updateProductSchema,
  getProductSchema,
  queryProductSchema,
  id,
};
