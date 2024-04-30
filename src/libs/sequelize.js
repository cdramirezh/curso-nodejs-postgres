const { Sequelize } = require('sequelize');
const chalk = require('chalk');
const setupModels = require('../../db/models');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const ENGINE = config.dbEngine;
const URI = `${ENGINE}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: ENGINE,
  logging: (vaina) => console.log(chalk.cyan(vaina)),
});

setupModels(sequelize);
// sequelize.sync();

module.exports = sequelize;
