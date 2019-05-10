import axios from 'axios';
import requestConfig from './requestConfig';
import config from '../config';

export const paymentNow = (orderReference) => {
  return axios.get(
    `${config.mwUrl}/travel/payment/url/${orderReference}`,requestConfig);
};
