import { sendPostRequest } from './baseRequest';

export const addProductToWishlist = async (productId: string) => {
  return await sendPostRequest('/wishlist/add', productId);
};

export const removeProductFromWishlist = async (productId: string) => {
  return await sendPostRequest('/wishlist/remove', productId);
};
