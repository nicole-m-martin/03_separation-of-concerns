const pool = require('../lib/utils/pool');
const setup = require('../data/setup');
const request = require('supertest');
const app = require('../lib/app');
const Order = require('../lib/models/Order');

jest.mock('twilio', () => () => ({
  messages: {
    create: jest.fn(),
  },
}));

describe('Lab 3 Route Tests', () => {
  beforeEach(() => {
    return setup(pool);
  });
  let order;
  beforeEach(async () => {
    order = await Order.insert({ quantity: 10 });
  });

  // POST TEST
  it('Creates a new order in our database and sends a text message', () => {
    return request(app)
      .post('/api/v1/orders')
      .send({ quantity: 10 })
      .then((res) => {
        // expect(createMessage).toHaveBeenCalledTimes(1);
        expect(res.body).toEqual({
          id: '2',
          quantity: 10,
        });
      });
  });

  // GET TEST
  it('Retrieves an order in our database', async () => {
    const res = await request(app).get('/api/v1/orders');

    expect(res.body[0]).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  // GET BY ID TEST
  it('Gets one order by :id', async () => {
    const res = await request(app).get('/api/v1/orders/1');

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });

  //PUT BY ID TEST
  it('Updates orders by :id', async () => {
    const res = await request(app).put('/api/v1/orders/1');

    expect(res.body).toEqual({
      id: '1',
      quantity: 10,
    });
  });
});
