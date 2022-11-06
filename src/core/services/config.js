import axios from 'axios';
import { baseUrls } from './baseUrls';

const instance = (serviceName) => {
  console.log(process.env.REACT_APP_BACKEND_BASE_URL)
  return axios.create({
    baseURL: `${process.env.REACT_APP_BACKEND_BASE_URL}${baseUrls[serviceName]}`,
  });
};

export default instance;
