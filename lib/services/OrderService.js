const Order = require('../models/Order');
const { sendSms } = require('../utils/twilio');

module.exports = class OrderService {
  static async create({ quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `New Order received for ${quantity}.`
    );

    const order = await Order.insert({ quantity });
    return order;
  }

  static async findById(id) {
    const order = await Order.getId(id);
    return order;
  }

  static async update(id, { quantity }) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `You added ${quantity} to your cart for order number ${id}.`
    );

    const order = await Order.update({ id, quantity });
    return order;
  }

  static async delete(id) {
    await sendSms(
      process.env.ORDER_HANDLER_NUMBER,
      `Order number ${id} was deleted.`
    );

    const order = await Order.delete(id);
    return order;
  }
};
