const boom = require('@hapi/boom');
const express = require('express');
const passport = require('passport');

const validatorHandler = require('../middlewares/validator.handler');
const {
  recoverPasswordSchema,
  resetPasswordSchema,
} = require('../schemas/user.schema');
const AuthService = require('../services/auth.service');
const UserService = require('../services/user.service');

const router = express.Router();
const authService = new AuthService();
const userService = new UserService();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const token = await authService.signToken(user);
      res.json({ user, token });
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/recovery',
  validatorHandler(recoverPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { email } = req.body;
      const user = await userService.findByEmail(email);
      const info = await authService.sendRecoveryEmail(user);
      res.json({ info });
    } catch (error) {
      if (error.isBoom && error?.output?.payload?.statusCode === 404)
        next(boom.unauthorized('Se te acabaron las fiestas'));
      else next(error);
    }
  }
);

router.post(
  '/reset-password',
  validatorHandler(resetPasswordSchema, 'body'),
  async (req, res, next) => {
    try {
      const { token, newPassword } = req.body;
      const info = await authService.resetPassword(token, newPassword);
      res.json(info);
    } catch (error) {
      next(boom.unauthorized('Nanái cucas'));
    }
  }
);

module.exports = router;
