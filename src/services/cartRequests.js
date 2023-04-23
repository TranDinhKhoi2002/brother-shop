import Cookies from 'js-cookie';
import request from './baseRequest';

export const addToCart = async (item) => {
  try {
    const response = await request.put('/cart/add-to-cart', item, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const updateQuantity = async (item) => {
  try {
    const response = await request.put('/cart/update-quantity', item, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const removeItemsFromCart = async (items) => {
  try {
    const response = await request.put('/cart/remove-items', items, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const removeItemFromCart = async (item) => {
  try {
    const response = await request.put('/cart/remove-item', item, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};
