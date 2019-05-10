import * as types from '../constants/actionTypes';

export const updateProfile = (name, value) => {
  return dispatch =>
    dispatch({
      type: types.PROFILE_FORM_UPDATE,
      payload: { name, value }
    });
};

export const updateAll = obj => {
  return dispatch =>
    dispatch({
      type: types.PROFILE_FORM_UPDATE_ALL,
      payload: obj
    });
};

export const getProfileValidationError = errors => {
  return dispatch =>
    dispatch({
      type: types.PROFILE_VALIDATION_ERROR,
      payload: { errors }
    });
};

export const changeCurrency = value => {
  return dispatch =>
    dispatch({
      type: types.CURRENCY_CHANGE,
      payload: value
    });
};
