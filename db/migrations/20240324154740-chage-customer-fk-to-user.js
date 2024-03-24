'use strict';

const { DataTypes } = require('sequelize');
const { CUSTOMER_TABLE } = require('../models/customer.model');

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface) {
    await queryInterface.changeColumn(CUSTOMER_TABLE, 'user_id', {
      name: 'user_id',
      allowNull: true,
      type: DataTypes.INTEGER,
      // references: {
      //   model: USER_TABLE,
      //   key: 'id',
      // },
    });
  },

  async down(queryInterface) {
    //.await queryInterface.dropTable('users');
  },
};
