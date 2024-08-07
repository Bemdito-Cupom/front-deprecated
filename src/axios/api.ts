import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    'ContentType': 'Application/json',
    'Access-Control-Allow-Origin' : '*',
  },
});
