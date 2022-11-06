import axios from 'axios';
import { baseUrls } from './baseUrls';

const instance = (serviceName) => {
  return axios.create({
    baseURL: `${process.env.BACKEND_BASE_URL}${baseUrls[serviceName]}`,
  });
};

export default instance;
