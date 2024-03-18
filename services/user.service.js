const boom = require('@hapi/boom');
const { models } = require('../libs/sequelize');

class UserService {
  constructor() {}

  async create(data) {
    const newUser = await models.User.create(data);
    return newUser;
  }

  async find() {
    const res = await models.User.findAll();
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
