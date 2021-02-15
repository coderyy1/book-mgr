import axios from 'axios';
import { getToken } from '@/helpers/token/index'

const baseUrl = 'http://localhost:3000';

const getUrl = (path) => {
  return `${baseUrl}${path}`;
}

const getHeaders = () => {
  return {
    Authorization: `Bearer ${getToken()}`
  }
}

export const post = (url, data) => {
  return axios.post(getUrl(url), data, {
    headers: getHeaders()
  });
}

export const del = (url) => {
  return axios.delete(getUrl(url), {
    headers: getHeaders()
  });
}

export const get = (url, data) => {
  return axios.get(getUrl(url), {
    params: data,
    headers: getHeaders()
  });
}