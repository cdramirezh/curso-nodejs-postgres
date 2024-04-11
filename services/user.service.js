const boom = require('@hapi/boom');
const bcrypt = require('bcrypt');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const hash = await bcrypt.hash(data.password, 5);
    let newUser = await models.User.create({ ...data, password: hash });
    delete newUser.dataValues.password
    return newUser;
  }

  async find() {
    const res = await models.User.findAll({ include: ['customer'] });
    return res;
  }

  async findOne(id) {
    const user = await models.User.findByPk(id);
    if (user) return user;
    throw boom.notFound('user not found');
  }

  async update(id, changes) {
    const user = await this.findOne(id);
    return user.update(changes);
  }

  async delete(id) {
    const user = await this.findOne(id);
    user.destroy();
    return { id };
  }
}

module.exports = UserService;
