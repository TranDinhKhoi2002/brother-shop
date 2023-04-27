import { sendGetRequest } from './baseRequest';

export const getCategories = async () => {
  const { categories } = await sendGetRequest('/categories');
  return categories;
};
