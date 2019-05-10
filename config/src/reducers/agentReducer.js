import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { getPathname } from '../lib/util';
import paths from '../constants/routePaths';

export default function agentReducer(state = initialState.agent, action) {
  switch (action.type) {
    case types.VALIDATE_AGENT_SUCCESS:
      return Object.assign({}, state, action.payload, { isValid: true, isFetching: false });

    case types.VALIDATE_AGENT_ERROR:
      return Object.assign({}, state, action.payload,  { isValid: false, isFetching: false  });

    case types.SET_AGENT_DETAILS:
      const agent = Object.assign({}, action.payload);
      if (!agent.agentCode) {
        agent.isValid = true;
      }
      return Object.assign({}, state, agent);
    
    case types.LOCATION_CHANGE:
      const originalState = initialState.agent;
      const pathname = getPathname(action.payload);

      switch(pathname) {
        case paths.INDEX:
        case paths.PLAN_SELECTION:
        case paths.CUSTOMER_DETAILS:
        case paths.SUMMARY_DETAILS:     
        case paths.PAYMENT_CONFIRMATION:
        case paths.CUSTOMER_REVIEW:
        case paths.CUSTOMER_REFERRAL:
          return state;
        default:
          return originalState;
      }

    case types.INITIAL_STATE:
      return Object.assign({}, initialState.agent);

    default:
      return state;
  }
}
