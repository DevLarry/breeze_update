import axios from 'axios';

const api = axios.create({
  baseURL:'/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const register = (data) => api.post('/account', data);
export const signIn = (data) => api.post('/auth/login', data);
export const confirmEmail = (data) => api.post('/auth/confirm-email', data);
export const resendConfirmationEmail = (data) => api.post('/auth/resend-confirmation-email', data);
export const sendForgotPassword = (data) => api.post('/auth/forgot-password', data);
export const resetPassword = (data) => api.post('/auth/reset-password', data);
export const checkVerification = (data) => api.post('/auth/check-verification', data);

export const getProfile = () => api.get('/auth/profile');

export const logout = () => {
  localStorage.removeItem('token');
  return api.get('/auth/logout');
};

export default api;