const { Sequelize } = require('sequelize');
const chalk = require('chalk');
const setupModels = require('../db/models');

const { config } = require('../config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const URI = `postgres://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

const sequelize = new Sequelize(URI, {
  dialect: 'postgres',
  logging: (vaina) => console.log(chalk.bgCyan(vaina)),
});

setupModels(sequelize);
sequelize.sync();

module.exports = sequelize;
