import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function profileReducer(state = initialState.quote, action) {
  switch (action.type) {
    case types.GET_QUOTE:
      return objectAssign({}, state, {
        isLoading: true,
        isError: false
      });

    case types.GET_QUOTE_SUCCESS:
      return objectAssign({}, state, action.payload, {
        isLoading: false,
        isError: false
      });

    case types.GET_QUOTE_ERROR:
      return objectAssign({}, state, {
        isLoading: false,
        isError: true
      });

    case types.GET_QUOTE_VALIDATION_ERROR:
      return objectAssign({}, state, {
        isLoading: false,
        isError: false
      });

    case types.REFERENCE_UPDATE_SUCCESS:
      return objectAssign({}, state, {
        isLoading: false
      });

    case types.PROFILE_FORM_UPDATE:
      return objectAssign({}, state, {
        isError: false
      });

    case types.INITIAL_STATE:
      return objectAssign({}, initialState.quote);

    default:
      return state;
  }
}
