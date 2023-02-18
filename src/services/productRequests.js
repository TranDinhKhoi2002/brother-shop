import request from './baseRequest';

export const getProductsByCategory = async (categoryId) => {
  const res = await request.get(`/categories/${categoryId}/products`);
  return res.data.products;
};

export const getHotProducts = async () => {
  const res = await request.get('/products/hot-products');
  return res.data.products;
};

export const getDiscountProducts = async () => {
  const res = await request.get('/products/discount-products');
  return res.data.products;
};

export const getTShirtProducts = async () => {
  const res = await request.get('/products/t-shirt');
  return res.data.products;
};

export const getTrouserProducts = async () => {
  const res = await request.get('/products/trouser');
  return res.data.products;
};
