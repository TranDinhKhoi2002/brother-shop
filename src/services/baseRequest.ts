import axios, { AxiosRequestConfig } from 'axios';
import Cookies from 'js-cookie';

const request = axios.create({
  baseURL: process.env.NEXT_PUBLIC_DB_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

function getRequestHeader(): AxiosRequestConfig {
  return {
    headers: {
      Authorization: `Bearer ${Cookies.get('token')}`,
    },
  };
}

export const sendPostRequest = async (url: string, data: object | string) => {
  try {
    const response = await request.post(url, data, getRequestHeader());
    return { ...response.data, success: true };
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendPutRequest = async (url: string, data: object | string) => {
  try {
    const response = await request.put(url, data, getRequestHeader());
    return { ...response.data, success: true };
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendGetRequest = async (url: string) => {
  try {
    const response = await request.get(url, getRequestHeader());
    return { ...response.data, success: true };
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export const sendDeleteRequest = async (url: string) => {
  try {
    const response = await request.delete(url, getRequestHeader());
    return { ...response.data, success: true };
  } catch (error: any) {
    return error.response ? error.response.data : { success: false, error: error.message };
  }
};

export default request;
