const { config } = require('../src/config/config');

const USER = encodeURIComponent(config.dbUser);
const PASSWORD = encodeURIComponent(config.dbPassword);
const ENGINE = config.dbEngine;

let URI;
if (config.dbPrivateUrl) URI = config.dbPrivateUrl;
else if (config.dbUrl) URI = config.dbUrl;
else
  URI = `${ENGINE}://${USER}:${PASSWORD}@${config.dbHost}:${config.dbPort}/${config.dbName}`;

module.exports = {
  development: {
    url: URI,
    dialect: ENGINE,
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    },
  },
  production: {
    url: URI,
    dialect: ENGINE,
  },
};
