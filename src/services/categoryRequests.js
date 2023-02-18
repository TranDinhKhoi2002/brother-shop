import request from './baseRequest';

export const getCategories = async () => {
  const res = await request.get('/categories');
  return res.data.categories;
};
