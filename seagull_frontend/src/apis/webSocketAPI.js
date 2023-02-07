import axios from 'axios';

const webSocketAPI = axios.create({
  baseURL: 'http://3.34.161.56:8084',
  headers: { 'Content-Type': 'application/json' },
});

// Add a request interceptor
webSocketAPI.interceptors.request.use(
  function (config) {
    console.log('request', config);
    return config;
  },
  function (error) {
    console.log('request error', error);
    return Promise.reject(error);
  }
);

export default webSocketAPI;
