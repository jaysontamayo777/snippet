import axios from 'axios';
import config from '../config';
import requestConfig from './requestConfig';
export const sendPaymentDetails = details => {
  return axios.post(`${config.mwUrl}/email/payment`, details, requestConfig);
};

export const sendQuote = details => {
  return axios.post(`${config.mwUrl}/email/quote`, details, requestConfig);
};
