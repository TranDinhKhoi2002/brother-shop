import Cookies from 'js-cookie';
import request from './baseRequest';

export const updateProfile = async (data) => {
  try {
    const response = await request.post('/customer/update-profile', data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};
