import request from './baseRequest';

export const getIntroImages = async () => {
  const res = await request.get('/images/intro');
  return res.data.images;
};
