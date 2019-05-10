import axios from 'axios';
import config from '../config';

export const getPromoCode = (promoCode) => {
  return axios.get(
    `${config.mwUrl}/discount/${promoCode}`,
    {
      headers: config.headers
    }
  );
};
