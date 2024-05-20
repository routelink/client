import axios from 'axios';

const auth = axios.create({
  baseURL: `${import.meta.env.VITE_APP_BASE_URL}:${import.meta.env.VITE_APP_BASE_PORT}/auth`,
  headers: {
    'Content-Type': 'application/json',
  },
});

export default auth;
