import objectAssign from 'object-assign';

import { getPathname } from '../../lib/util';
import initialState from '../initialState';
import * as types from '../../constants/actionTypes';
import paths from '../../constants/routePaths';

export default function policyHolderReducer(
  state = initialState.policyHolder,
  action
) {
  switch (action.type) {
    case types.POLICY_HOLDER_FORM_UPDATE_FIELDS:
      const { formFields, errors } = action.payload;
      if (formFields) {
        return objectAssign({}, state, {
          formFields,
          errors
        });
      } else {
        return objectAssign({}, state, {
          errors
        });
      }

    case types.TRAVELLER_FORM_IS_POLICY_HOLDER:
      const { isPolicyHolder } = action.payload;

      if (!isPolicyHolder) {
        const newState = Object.assign({}, state, {
          formFields: {
            ...state.formFields,
            passport: ''
          }
        });

        delete newState.errors.passport;
        return newState;
      }
      return state;

    case types.LOCATION_CHANGE:
      const originalState = initialState.policyHolder;
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

    case types.INITIAL_STATE:
      return objectAssign({}, initialState.policyHolder);

    default:
      return state;
  }
}
