import objectAssign from 'object-assign';

// import { getPathname } from '../lib/util';
import initialState from './initialState';
import * as types from '../constants/actionTypes';
// import paths from '../constants/routePaths';

export default function orderReducer(state = initialState.order, action) {
  switch (action.type) {
    case types.GET_ORDER:
    case types.GET_PAYMENT:
      return objectAssign({}, state, { isLoading: true });

    case types.GET_ORDER_REFERENCE_SUCCESS:
      return objectAssign({}, state, {
        orderReference: action.payload,
        isLoading: false
      });

    case types.GET_ORDER_REFERENCE_ERROR:
      return objectAssign({}, state, { isLoading: false, isError: true });

    case types.GET_PAYMENT_STATUS_ERROR:
    case types.GET_PAYMENT_STATUS_SUCCESS:
      return objectAssign({}, state, { isLoading: false });

    case types.INITIAL_STATE:
      return objectAssign({}, initialState.order);

    default:
      return state;
  }
}
