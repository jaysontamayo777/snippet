import axios from 'axios';
import config from '../config';
import requestConfig from './requestConfig';

/**
 * Sends the agent code to server for validation
 *
 * @param {string} agentCode
 * Unique identifier of agent
 *
 * @returns {Promise}
 */
export const validateAgentCode = agentCode => {
  return axios.get(`${config.mwUrl}/agents/validate/${agentCode}`, requestConfig);
};
