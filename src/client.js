import axios from 'axios';
import {URL} from './constants';

const client = axios.create({
  baseURL: URL + 'api/',
});

client.interceptors.request.use(config => {
  config.headers.set('Cache-Control', 'no-cache');
  config.headers.set('Pragma-Control', 'no-cache');

  return config;
});

export default client;
