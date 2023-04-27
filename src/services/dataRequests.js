import { sendGetRequest } from './baseRequest';

export const getCommonData = async () => {
  return await sendGetRequest('/data');
};
