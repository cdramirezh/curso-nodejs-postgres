const { Strategy, ExtractJwt } = require('passport-jwt');
const { config } = require('../../../config/config');

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: config.jwtSecret,
};
// El strategy, usando el secretOrKey y el jwtFromRequest, solito, autentica y devuelve el payload
const JwtStrategy = new Strategy(options, (jwt_payload, done) => {
  // Por alguna razón, devolverlo así mete el jwt_payload dentro del request en la propiedad .user
  return done(null, jwt_payload);
});

module.exports = JwtStrategy;
