import objectAssign from 'object-assign';

import { getPathname } from '../lib/util';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';

export default function tagCommanderReducer(
  state = initialState.tagCommanderTrigger,
  action
) {
  switch (action.type) {
    case types.GET_QUOTE_SUCCESS:
      return objectAssign({}, initialState.tagCommanderTrigger);

    case types.SET_PAYMENT_FAILED_TAG:
      return objectAssign({}, state, { paymentFailed: action.payload });

    case types.SET_PAYMENT_SUCCESS_TAG:
      return objectAssign({}, state, { paymentSuccess: action.payload });

    case types.LOCATION_CHANGE:
      const originalState = initialState.tagCommanderTrigger;
      const pathname = getPathname(action.payload);

      switch (pathname) {
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

    default:
      return state;
  }
}
