const Joi = require('joi');
const { id: customerId } = require('./customer.schema');
const { id: productId } = require('./product.schema');

const id = Joi.number().integer();
const amount = Joi.number().integer().min(1);

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

const addItemSchema = Joi.object({
  orderId: id.required(),
  productId: productId.required(),
  amount: amount.required(),
});

module.exports = { createOrderSchema, getOrderSchema, addItemSchema };
