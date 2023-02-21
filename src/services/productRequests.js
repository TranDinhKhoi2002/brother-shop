import request from './baseRequest';

export const getAllProducts = async () => {
  const res = await request.get('/products');
  return res.data.products;
};

export const getProductsByCategory = async (categoryId) => {
  const res = await request.get(`/categories/${categoryId}/products`);
  return res.data.products;
};

export const getProductById = async (productId) => {
  const res = await request.get(`/products/${productId}`);
  return res.data.product;
};

export const getHotProducts = async () => {
  const res = await request.get('/products/hot-products');
  return res.data.products;
};

export const getDiscountProducts = async () => {
  const res = await request.get('/products/discount-products');
  return res.data.products;
};

export const getProductsByType = async (type) => {
  const res = await request.get(`/products/type/${type}`);
  return res.data.products;
};
