import { validateAgentCode } from '../api/agent';
import { sendLogs } from '../api/logger';
import * as types from '../constants/actionTypes';

const validateAgentSuccess = (agent = {}) => ({
 type: types.VALIDATE_AGENT_SUCCESS,
 payload: agent
});

const validateAgentError = (agent = {}) => ({
  type: types.VALIDATE_AGENT_ERROR,
  payload: agent
});

/**
 * Facilitates the saving of Agent details to Redux
 *
 * @param {object} agent
 */
const setAgentDetails = (agent = {}) => ({
  type: types.SET_AGENT_DETAILS,
  payload: agent
 });

/**
 * Validates agent code value.
 *
 * @param {string} agentCode
 * Unique identifier of an Agent
 */
export const validateCode = (agentCode, cb) => {
  return dispatch => {
    if (!agentCode) {
      dispatch(validateAgentSuccess());

      if(cb) {
        cb(true);
      } 
    } else {
      return validateAgentCode(agentCode)
        .then(response => {
          if (response.data && response.data.isValid) {
            dispatch(validateAgentSuccess());
          } else {
            dispatch(validateAgentError());
          }

          if(cb) {
            cb(response.data && response.data.isValid);
          } 
        })
        .catch(err => {
          const errorLog = {
            error: err,
            source: 'Get Agent'
          };
          
          sendLogs(errorLog);
          dispatch(validateAgentError());
        });
      }
  };
};

/**
 * Saves agent details to redux
 *
 * @param {object} agent
 * Object that contains the information of the agent.
 */
export const saveAgentDetails = agent => {
  return dispatch => {
    dispatch(setAgentDetails(agent));
  };
};
