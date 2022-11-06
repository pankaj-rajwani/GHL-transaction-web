import axios from 'axios';
import { baseUrls } from './baseUrls';

const instance = (serviceName) => {
  return axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}${baseUrls[serviceName]}`,
  });
};

export default instance;
