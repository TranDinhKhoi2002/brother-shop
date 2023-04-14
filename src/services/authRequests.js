import Cookies from 'js-cookie';
import request from './baseRequest';

export const signup = async (account) => {
  try {
    const response = await request.post('/auth/signup', account);
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const login = async (account) => {
  try {
    const response = await request.post('/auth/login', account);
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const loginWithGoogle = async (data) => {
  try {
    const response = await request.post('/auth/login-with-google', data);
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const getUserProfile = async () => {
  try {
    const response = await request.get('/auth/user/profile', {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const requestNewPassword = async (email) => {
  try {
    const response = await request.post('/auth/forgot-password', email);
    return response;
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const updatePassword = async (token, newPassword, confirmPassword) => {
  try {
    const response = await request.post('/auth/reset-password', {
      token: token,
      password: newPassword,
      confirmPassword: confirmPassword,
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const checkResetToken = async (token) => {
  try {
    const response = await request.post('/auth/check-reset-token', token);
    return response.data.isValidToken;
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};
