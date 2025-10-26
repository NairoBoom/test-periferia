import axios from 'axios';
import { useAuthStore } from '../store/authStore';

const AUTH_SERVICE_URL = import.meta.env.VITE_AUTH_SERVICE_URL || 'http://localhost:3001';
const POSTS_SERVICE_URL = import.meta.env.VITE_POSTS_SERVICE_URL || 'http://localhost:3002';
const USERS_SERVICE_URL = import.meta.env.VITE_USERS_SERVICE_URL || 'http://localhost:3003';

export const authApi = axios.create({
  baseURL: AUTH_SERVICE_URL,
});

export const postsApi = axios.create({
  baseURL: POSTS_SERVICE_URL,
});

export const usersApi = axios.create({
  baseURL: USERS_SERVICE_URL,
});

const apis = [postsApi, usersApi];

apis.forEach((api) => {
  api.interceptors.request.use(
    (config) => {
      const token = useAuthStore.getState().token;
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );

  api.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        useAuthStore.getState().logout();
        window.location.href = '/login';
      }
      return Promise.reject(error);
    }
  );
});
