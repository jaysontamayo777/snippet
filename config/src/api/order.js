import axios from 'axios';
import config from '../config';
import requestConfig from './requestConfig';
import { getOrderRequestObject } from '../utils/apiUtils';

export const getOrderReference = (
  agent,
  profile,
  selection,
  travellers,
  partner = {},
  trackingReport,
  agreements
) => {
  return axios.post(
    `${config.mwUrl}/order`,
    getOrderRequestObject(
      agent,
      profile,
      selection,
      travellers,
      partner,
      trackingReport,
      agreements
    ),
    requestConfig
  );
};

export const getOrderStatus = (orderReference) => {
  return axios.get(`${config.mwUrl}/payment/${orderReference}`, requestConfig);
};
