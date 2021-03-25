const { Router } = require('express');
const Order = require('../models/Order');
const OrderService = require('../services/OrderService');

module.exports = Router()
  .post('/', async (req, res, next) => {
    try {
      const order = await OrderService.create(req.body);
      res.send(order);
    } catch (err) {
      next(err);
    }
  })

  .get('/', async (req, res, next) => {
    const orders = await Order.find();
    res.send(orders);
  })

  .get('/:id', async (req, res, next) => {
    const order = await OrderService.findById(req.params.id);
    res.send(order);
  })

  .put('/:id', async (req, res, next) => {
    const order = await OrderService.findById(req.params.id);
    res.send(order);
  })

  .delete('/:id', async (req, res, next) => {});
