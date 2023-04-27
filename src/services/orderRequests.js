import { sendPostRequest, sendPutRequest } from './baseRequest';

export const createOrder = async (order) => {
  return await sendPostRequest('/orders/create-order', order);
};

export const checkOutOrder = async (orderId) => {
  return await sendPutRequest('/orders/check-out', orderId);
};
