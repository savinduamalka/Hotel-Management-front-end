import axios from 'axios';

const baseURL = import.meta.env.VITE_BACKEND_URL;
const isNgrok = /ngrok/i.test(baseURL || '');

const axiosInstance = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json',
    ...(isNgrok ? { 'ngrok-skip-browser-warning': 'true' } : {}),
  },
});

export default axiosInstance;
