import { sendPostRequest } from './baseRequest';

export const addProductToWishlist = async (product) => {
  return await sendPostRequest('/wishlist/add', product);
};

export const removeProductFromWishlist = async (productId) => {
  return await sendPostRequest('/wishlist/remove', productId);
};
