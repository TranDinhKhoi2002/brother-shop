import axios from 'axios';
import Cookies from 'js-cookie';

const request = axios.create({
  baseURL: 'http://localhost:3001',
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendPostRequest = async (url, data) => {
  try {
    const response = await request.post(url, data, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendGetRequest = async (url) => {
  try {
    const response = await request.get(url, {
      headers: {
        Authorization: `Bearer ${Cookies.get('token')}`,
      },
    });
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export default request;
