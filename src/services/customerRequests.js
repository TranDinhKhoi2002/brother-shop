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

export const verifyPhoneNumber = async (data) => {
  try {
    const response = await request.post('/customer/verify-phone-number', data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const updateUserIsVerified = async () => {
  try {
    const response = await request.post(
      '/customer/user-is-verified',
      {},
      {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const changePassword = async (data) => {
  try {
    const response = await request.post('/customer/change-password', data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};
