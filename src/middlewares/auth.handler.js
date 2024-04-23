const boom = require('@hapi/boom');
const { config } = require('./../config/config');

const checkApiKey = (req, res, next) => {
  const apiKey = req.headers['api'];
  if (apiKey === config.apiKey) {
    next();
  } else {
    next(boom.unauthorized());
  }
};

const checkRoles =
  (roles) =>
  (req, res, next) => {
    const user = req.user;
    if (roles.includes(user.role)) next();
    else next(boom.unauthorized());
  };

module.exports = { checkRoles, checkApiKey };
