const { config } = require('../src/config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const ENGINE = config.dbEngine;
const URI = `${ENGINE}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: ENGINE,
  },
  production: {
    url: URI,
    dialect: ENGINE,
  },
};
