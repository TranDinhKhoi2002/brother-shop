import axios from 'axios';
import Cookies from 'js-cookie';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

export const sendPostRequest = async (url, data) => {
  try {
    const response = await request.post(
      url,
      data,
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendPutRequest = async (url, data) => {
  try {
    const response = await request.put(
      url,
      data,
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendGetRequest = async (url) => {
  try {
    const response = await request.get(
      url,
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendDeleteRequest = async (url) => {
  try {
    const response = await request.delete(
      url,
      Cookies.get('token') && {
        headers: {
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      },
    );
    return { ...response.data, success: true };
  } catch (error) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export default request;
