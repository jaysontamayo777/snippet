import axios from 'axios';
import axiosRetry from 'axios-retry';
import config from '../config';
import requestConfig from './requestConfig';

axiosRetry(axios, {
  retries: 2,
  retryCondition: error => error.response.status >= 500
});

export const getContento = () => {
  return axios.get(`${config.mwUrl}/contento/fetch`, requestConfig);
};

export const getReferenceData = () => {
  return axios.get(`${config.mwUrl}/reference/all`, requestConfig);
};
