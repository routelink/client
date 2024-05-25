import axios from 'axios';

export enum AUTH {
  REQUIRED = 0,
  INVALID_ACCESS_TOKEN = 1,
  EXPIRED_ACCESS_TOKEN = 2,
  INVALID_REFRESH_TOKEN = 3,
  NOT_FOUND_REFRESH_TOKEN = 4,
  EXPIRED_REFRESH_TOKEN = 5,
  REFRESH_ERROR = 6,
}
const api = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  // withCredentials: true,
});

export default api;
