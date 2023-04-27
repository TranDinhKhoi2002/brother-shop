import { sendPutRequest } from './baseRequest';

export const addToCart = async (item) => {
  return await sendPutRequest('/cart/add-to-cart', item);
};

export const updateQuantity = async (item) => {
  return await sendPutRequest('/cart/update-quantity', item);
};

export const removeItemsFromCart = async (items) => {
  return await sendPutRequest('/cart/remove-items', items);
};

export const removeItemFromCart = async (item) => {
  return await sendPutRequest('/cart/remove-item', item);
};
