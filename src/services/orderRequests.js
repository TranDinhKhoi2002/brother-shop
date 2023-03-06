import request from './baseRequest';

export const createOrder = async (order) => {
  const res = await request.post('/orders/create-order', order);
  return res.data;
};

export const updateOrderPaid = async (orderId) => {
  const res = await request.put(`/orders/update-paid/${orderId}`);
  return res.data;
};
