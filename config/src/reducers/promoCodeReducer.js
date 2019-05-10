
import objectAssign from 'object-assign';

import initialState from './initialState';
import * as types from '../constants/actionTypes';

export default function profileReducer(state = initialState.promoCodeValidations, action) {
  switch (action.type) {
    case types.SET_PROMO_CODE_VALIDATIONS:
      return objectAssign({}, state, {
        validEmail: action.validEmail,
        expireDate: action.expireDate
      });
    default:
      return state;
  }
}