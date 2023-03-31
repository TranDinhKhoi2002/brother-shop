import Cookies from 'js-cookie';
import request from './baseRequest';

export const createOrder = async (order) => {
  try {
    const response = await request.post('/orders/create-order', order);
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const checkOutOrder = async (orderId) => {
  try {
    const response = await request.put('/orders/check-out', orderId, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};
