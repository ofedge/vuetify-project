import axios from 'axios'
import router from '../router'
import store from '../store'
import { getBearerToken, removeToken } from './auth';

const service = axios.create({
  baseURL: 'http://localhost:20080/sbp',
  timeout: 30 * 1000,
  withCredentials: false
});

service.interceptors.request.use(config => {
  config.headers['Authorization'] = getBearerToken();
  return config;
}, error => {
  return Promise.reject(error);
});

service.interceptors.response.use(response => {
  const res = response.data;
  if (res.code >= 1000 && res.code < 1100) {
    removeToken();
    store.commit('setUserInfo', {});
    router.push({ name: 'SignIn' });
  }
  return response.data;
}, error => {
  return Promise.reject(error);
});

export default service;
