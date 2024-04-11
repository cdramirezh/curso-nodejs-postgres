const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class CustomerService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.user.password, 5);
    const modifiedData = {
      ...data,
      user: {
        ...data.user,
        password: hash,
      },
    };
    let newCustomer = await models.Customer.create(modifiedData, {
      include: ['user'],
    });
    delete newCustomer.dataValues.user.dataValues.password;
    return newCustomer;
  }

  async find() {
    const customers = await models.Customer.findAll({ include: ['user'] });
    return customers;
  }

  async findOne(id) {
    const customer = await models.Customer.findByPk(id);
    if (customer) return customer;
    throw boom.notFound('customer not found');
  }

  async update(id, changes) {
    const customer = await this.findOne(id);
    return customer.update(changes);
  }

  async delete(id) {
    const customer = await this.findOne(id);
    customer.destroy();
    return { id };
  }
}

module.exports = CustomerService;
