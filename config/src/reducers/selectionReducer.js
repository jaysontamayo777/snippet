import objectAssign from 'object-assign';

import { getPathname } from '../lib/util';
import initialState from './initialState';
import { getSelectionData } from '../utils/planSelectionUtil.js';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';

export default function selectionReducer(
  state = initialState.selection,
  action
) {
  switch (action.type) {
    case types.PLAN_SELECTED:
      const plans = objectAssign([], action.payload);
      const selectedPlan = plans.filter(plan => plan.selected)[0];
      return objectAssign({}, state, getSelectionData(selectedPlan));

    case types.ADDON_SELECTED:
      return objectAssign({}, state, getSelectionData(action.payload));

    case types.INIT_PLAN_SELECTED:
      return objectAssign({}, initialState.selection, action.payload);

    case types.LOCATION_CHANGE:
      const originalState = initialState.selection;
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
