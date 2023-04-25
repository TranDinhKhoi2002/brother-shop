import { sendPostRequest } from './baseRequest';

export const updateProfile = async (data) => {
  return await sendPostRequest('/customer/update-profile', data);
};

export const verifyPhoneNumber = async (data) => {
  return await sendPostRequest('/customer/verify-phone-number', data);
};

export const updateUserIsVerified = async () => {
  return await sendPostRequest('/customer/user-is-verified', {});
};

export const changePassword = async (data) => {
  return await sendPostRequest('/customer/change-password', data);
};

export const addAddress = async (data) => {
  return await sendPostRequest('/customer/add-address', data);
};

export const editAddress = async (data) => {
  return await sendPostRequest('/customer/edit-address', data);
};

export const removeAddress = async (data) => {
  return await sendPostRequest('/customer/remove-address', data);
};

export const updateAddressToDefault = async (data) => {
  return await sendPostRequest('/customer/update-address-to-default', data);
};
