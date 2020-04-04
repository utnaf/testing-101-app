import axios from 'axios';

const SERVER_API_URL = 'http://localhost:8080/api/';

const TIMEOUT = 1 * 60 * 1000;
axios.defaults.timeout = TIMEOUT;
axios.defaults.baseURL = SERVER_API_URL;

const setupAxios = () => {
  const onResponseSuccess = response => response;
  const onResponseError = err => {
    return Promise.reject(err).catch();
  };
  axios.interceptors.response.use(onResponseSuccess, onResponseError);
};

export default setupAxios;
