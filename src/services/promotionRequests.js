import { sendDeleteRequest, sendGetRequest, sendPostRequest, sendPutRequest } from './baseRequest';

export const getPromotions = async () => {
  return await sendGetRequest('/promotions');
};

export const savePromotion = async (data) => {
  return await sendPostRequest('/promotions/save', data);
};

export const removePromotion = async (promotionId) => {
  return await sendDeleteRequest(`/promotions/customer/${promotionId}`);
};

export const updatePromotionQuantity = async (promotionId) => {
  return await sendPutRequest(`/promotions/${promotionId}/quantity`);
};
