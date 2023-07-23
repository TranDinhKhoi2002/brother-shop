import { sendGetRequest } from './baseRequest';

export const getIntroImages = async () => {
  const { images } = await sendGetRequest('/images/intro');
  return images;
};
