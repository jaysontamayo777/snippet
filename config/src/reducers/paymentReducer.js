import objectAssign from 'object-assign';

import { getPathname } from '../lib/util';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { PAYMENT } from '../constants/status';
import paths from '../constants/routePaths';

export default function paymentReducer(state = initialState.payment, action) {
  switch (action.type) {
    case types.PAYMENT:
      return state;

    case types.PAYMENT_INFO_SUCCESS:
      return objectAssign({}, state, {
        info: action.payload,
        isLoading: false
      });

    case types.GET_PAYMENT:
      return objectAssign({}, state, { isLoading: true });

    case types.GET_PAYMENT_STATUS_SUCCESS:
      return objectAssign({}, state, {
        status: action.payload,
        isLoading: false
      });

    case types.GET_PAYMENT_STATUS_ERROR:
      return objectAssign({}, state, {
        status: PAYMENT.ERROR,
        isLoading: false
      });

    case types.LOCATION_CHANGE:
      const originalState = initialState.payment;
      const pathname = getPathname(action.payload);

      switch (pathname) {
        case paths.SUMMARY_DETAILS:
        case paths.PAYMENT_CONFIRMATION:
        case paths.CUSTOMER_REVIEW:
        case paths.CUSTOMER_REFERRAL:
          return state;
        default:
          return originalState;
      }

    case types.INITIAL_STATE:
      return objectAssign({}, initialState.payment);

    default:
      return state;
  }
}
