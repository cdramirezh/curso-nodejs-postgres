const Joi = require('joi');

const id = Joi.number().integer();
const email = Joi.string().email();
const password = Joi.string().min(8);
const role = Joi.string().min(5);
const token = Joi.string().regex(
  /^[A-Za-z0-9-_]+\.[A-Za-z0-9-_]+\.[A-Za-z0-9-_.+/=]*$/
);

const createUserSchema = Joi.object({
  email: email.required(),
  password: password.required(),
  role: role.required(),
});

const updateUserSchema = Joi.object({
  email: email,
  password: password,
  role: role,
});

const getUserSchema = Joi.object({
  id: id.required(),
});

const recoverPasswordSchema = Joi.object({
  email: email.required(),
});

const resetPasswordSchema = Joi.object({
  token: token.required(),
  newPassword: password.required(),
});

module.exports = {
  createUserSchema,
  updateUserSchema,
  getUserSchema,
  id,
  recoverPasswordSchema,
  resetPasswordSchema,
};
