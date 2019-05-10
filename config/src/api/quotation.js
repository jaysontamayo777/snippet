import axios from 'axios';
import config from '../config';
import requestConfig from './requestConfig';
import { getProfile } from '../utils/apiUtils';

export const getQuotation = (profile, selection) => {
  return axios.post(`${config.mwUrl}/quotation/quote`, getProfile(profile, selection), requestConfig);
};
