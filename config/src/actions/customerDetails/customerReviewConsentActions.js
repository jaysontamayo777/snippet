import * as types from '../../constants/actionTypes';

function _setConsent(termsAndConsent) {
  return { type: types.TERMS_AND_CONDITIONS_ACCEPTED, payload: termsAndConsent };
}

export const setConsent = (customerConsent) => {
  return dispatch => {
    dispatch(_setConsent(customerConsent));
  };
};
