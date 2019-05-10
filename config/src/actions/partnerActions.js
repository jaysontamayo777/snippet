import * as TYPES from '../constants/actionTypes';
import getPartnerStyle from '../constants/partners';

function setPartner(payload) {
  return { type: TYPES.SET_PARTNER, payload };
}

/**
 * Updates the partner style object in redux
 *
 * @param {string} partnerCode
 * Partner code, can be considered as key
 *
 * @param {string} partnerName
 * Partner name you want to load
 */
export const savePartnerStyle = (partnerCode, partnerName) => {
  return dispatch => {
    dispatch(setPartner(getPartnerStyle(partnerName, partnerCode)));
  };
};
