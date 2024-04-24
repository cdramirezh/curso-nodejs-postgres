const express = require('express');
const passport = require('passport');

const OrderService = require('./../services/order.service');
const CustomerService = require('../services/customer.service');

const router = express.Router();
const service = new OrderService();
const customerService = new CustomerService();

router.get(
  '/orders',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const user = req.user;
      const orders = await service.findByUser(user.sub);
      res.json(orders);
    } catch (error) {
      next(error);
    }
  }
);

router.post(
  '/order',
  passport.authenticate('jwt', { session: false }),
  async (req, res, next) => {
    try {
      const userId = req.user.sub;
      const customer = await customerService.findOneByUserId(userId);
      const customerId = customer.id;
      const newOrder = await service.create({ customerId });
      res.status(201).json(newOrder);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = router;
