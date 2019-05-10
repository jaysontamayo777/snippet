import objectAssign from 'object-assign';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';
import { getPathname } from '../lib/util';

/**
 * Manages the modification of partner object in redux.
 *
 * @param {object} state
 * Object that represents the value of partner. Default value is the
 * object defined in initialState.js
 *
 * @param {object} action
 * Contains the type, a string representation of the action made like 'SET_PARTNER' and
 * payload which contains the partner details.
 */
export default function partnerReducer(state = initialState.partner, action) {
  switch (action.type) {
    case types.SET_PARTNER:
      return objectAssign({}, state, action.payload);

    case types.INITIAL_STATE:
      return objectAssign({}, initialState.partner);

    case types.LOCATION_CHANGE:
      const pathname = getPathname(action.payload);

      switch (pathname) {
        case paths.INDEX:
        case paths.PLAN_SELECTION:
        case paths.CUSTOMER_DETAILS:
        case paths.SUMMARY_DETAILS:
        case paths.PAYMENT_CONFIRMATION:
        case paths.CUSTOMER_REVIEW:
        case paths.CUSTOMER_REFERRAL:
          return state;
        default:
          return initialState.partner;
      }

    default:
      return state;
  }
}
