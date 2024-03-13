const pool = require('../libs/postgres.pool');

class UserService {
  constructor() {}

  async create(data) {
    return data;
  }

  async find() {
    const res = await pool.query('SELECT * FROM task');
    return res.rows;
  }

  async findOne(id) {
    return { id };
  }

  async update(id, changes) {
    return {
      id,
      changes,
    };
  }

  async delete(id) {
    return { id };
  }
}

module.exports = UserService;
