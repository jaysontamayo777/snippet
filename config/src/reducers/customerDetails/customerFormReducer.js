import { getPathname } from '../../lib/util';
import initialState from '../initialState';
import * as types from '../../constants/actionTypes';
import paths from '../../constants/routePaths';

export default function customerDetailsReducer(state = initialState.customerForm, action) {
  switch (action.type) {

    case types.GO_TO_NEXT_FORM:
      if(state.displayedFormIndex === state.filledFormIndex) {
        return Object.assign({}, state, {
          filledFormIndex: state.filledFormIndex + 1,
          displayedFormIndex: state.displayedFormIndex + 1
        });
      } else if (state.displayedFormIndex < state.filledFormIndex) {
        // Resume to form that is currently being filled after editing
        return Object.assign({}, state, {
          displayedFormIndex: state.filledFormIndex
        });
      }

      return state;

    case types.GO_TO_SELECTED_FORM:
      return Object.assign({}, state, {
        displayedFormIndex: action.payload.selectedFormIndex
      });

    case types.LOCATION_CHANGE:
      const originalState = initialState.customerForm;
      const pathname = getPathname(action.payload);

      switch(pathname) {
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
      return Object.assign({}, initialState.customerForm);

    default:
      return state;
  }
}
