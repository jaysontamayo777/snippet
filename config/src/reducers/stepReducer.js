import objectAssign from 'object-assign';

import { getPathname } from '../lib/util';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';

export default function stepReducer(state = initialState.step, action) {
  const currentStep = state.current;

  function getEnabledStep(val) {
    return state.enabled > val ? state.enabled : val;
  }

  switch (action.type) {
    case types.LOCATION_CHANGE:
      const pathname = getPathname(action.payload);

      switch (pathname) {
        case paths.INDEX:
          return objectAssign({}, state, {
            current: 1,
            previous:1,
            enabled: 1
          });
        case paths.TRAVEL_INSURANCE:
          return objectAssign({}, state, {
            current: 1,
            previous: 1,
            enabled: 1
          });
        case paths.PLAN_SELECTION:
          return objectAssign({}, state, {
            current: 2,
            previous: currentStep,
            enabled: getEnabledStep(2)
          });
        case paths.CUSTOMER_DETAILS:
          return objectAssign({}, state, {
            current: 3,
            previous: currentStep,
            enabled: getEnabledStep(3)
          });
        case paths.SUMMARY_DETAILS:
          return objectAssign({}, state, {
            current: 3,
            previous: currentStep,
            enabled: getEnabledStep(3)
          });
        case paths.CUSTOMER_REVIEW:
          return objectAssign({}, state, {
            current: 4,
            previous: currentStep,
            enabled: getEnabledStep(4)
          });
        case paths.CUSTOMER_REFERRAL:
          return objectAssign({}, state, {
            current: 4,
            previous: currentStep,
            enabled: getEnabledStep(4)
          });
        case paths.PAYMENT_CONFIRMATION:
          return objectAssign({}, state, { current: 5, previous: currentStep });
        default:
          return objectAssign({}, state, { current: 1, previous: currentStep });
      }

    case types.SET_STARTUP_PAGE:
      return objectAssign({}, state, { isAltPage: action.payload });

    case types.SET_PROGRESS:
      return objectAssign({}, state, { progress: action.payload });

    case types.SET_CURRENT_STEP:
      return objectAssign({}, state, action.payload);

    case types.INITIAL_STATE:
      return objectAssign({}, initialState.step);

    default:
      return state;
  }
}
