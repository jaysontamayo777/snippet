import initialState from './initialState';
import * as types from '../constants/actionTypes';
import { getPathname } from '../lib/util';
import paths from '../constants/routePaths';

export default function agreementsReducer(state = initialState.agreements, action) {
  switch (action.type) {
    case types.TERMS_AND_CONDITIONS_ACCEPTED:
      return Object.assign({}, state, action.payload);

    case types.LOCATION_CHANGE:
      const originalState = initialState.agreements;
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
      return Object.assign({}, initialState.agreements);

    default:
      return state;
  }
}
