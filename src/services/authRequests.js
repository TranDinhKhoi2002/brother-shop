import { sendPostRequest, sendGetRequest } from './baseRequest';

export const signup = async (account) => {
  return await sendPostRequest('/auth/signup', account);
};

export const login = async (account) => {
  return await sendPostRequest('/auth/login', account);
};

export const loginWithSocialMediaAccount = async (data) => {
  return await sendPostRequest('/auth/login-with-social-media-account', data);
};

export const getUserProfile = async () => {
  return await sendGetRequest('/auth/user/profile');
};

export const requestNewPassword = async (data) => {
  return await sendPostRequest('/auth/forgot-password', data);
};

export const updatePassword = async (token, newPassword, confirmPassword) => {
  return await sendPostRequest('/auth/reset-password', {
    token: token,
    password: newPassword,
    confirmPassword: confirmPassword,
  });
};

export const checkResetToken = async (token) => {
  const { isValidToken } = await sendPostRequest('/auth/check-reset-token', token);
  return isValidToken;
};
