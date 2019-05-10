import axios from 'axios';
import config from '../config';
import requestConfig from './requestConfig';
import { getLogs } from '../utils/apiUtils';

export const sendLogs = logs => {
  return axios
    .post(`${config.mwUrl}/logs`, getLogs(logs), requestConfig)
    .catch(() => {});
};
