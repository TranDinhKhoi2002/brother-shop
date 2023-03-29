import Cookies from 'js-cookie';
import request from './baseRequest';

export const addProductToWishlist = async (product) => {
  try {
    const response = await request.post('/wishlist/add', product, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const removeProductFromWishlist = async (productId) => {
  try {
    const response = await request.post('/wishlist/remove', productId, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};
