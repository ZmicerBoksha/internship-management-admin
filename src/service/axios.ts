import axios from 'axios';
import { configure } from 'axios-hooks';
import LRU from 'lru-cache';
console.log(process.env);
export const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_API_URL, //'http://localhost:8085/api',
});

instance.interceptors.request.use(
  async config => {
    const token = localStorage.getItem('token');

    config.headers = {
      authorization: token ? `Bearer ${token}` : '',
    };

    return config;
  },
  error => Promise.reject(error),
);

const cache = new LRU({ max: 10 });

configure({ axios: instance, cache });
