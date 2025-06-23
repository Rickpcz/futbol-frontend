import axios from 'axios';

const api = axios.create({
  baseURL: 'https://mundialclubesapi.onrender.com/api',
  // baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  },
  withCredentials: false,
});

export default api;