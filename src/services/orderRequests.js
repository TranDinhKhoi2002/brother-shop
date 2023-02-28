import request from './baseRequest';

export const createOrder = async (order) => {
  const res = await request.post('/orders/create-order', order);
  return res.data;
};
