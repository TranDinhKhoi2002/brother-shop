import { sendDeleteRequest, sendGetRequest, sendPostRequest } from './baseRequest';

export const getPromotions = async () => {
  return await sendGetRequest('/promotions');
};

export const savePromotion = async (data) => {
  return await sendPostRequest('/promotions/save', data);
};

export const removePromotion = async (productId) => {
  return await sendDeleteRequest(`/promotions/customer/${productId}`);
};
