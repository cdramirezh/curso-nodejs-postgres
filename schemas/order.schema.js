const Joi = require('joi');
const { id: customerId } = require('./customer.schema');

const id = Joi.number().integer();

const createOrderSchema = Joi.object({
  customerId: customerId.required(),
});

const getOrderSchema = Joi.object({
  id: id.required(),
});

module.exports = { createOrderSchema, getOrderSchema };
