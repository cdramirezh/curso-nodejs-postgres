const express = require('express');
const passport = require('passport');

// this invokes and executes the file that links the localStrategy to passport
require('../utils/auth/index');

const router = express.Router();

router.post(
  '/login',
  passport.authenticate('local', { session: false }),
  async (req, res, next) => {
    try {
      res.json(req.user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
