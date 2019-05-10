import * as types from '../constants/actionTypes';
import { getPromoCode } from '../api/promoCode';
import { sendLogs } from '../api/logger';

/**
 *  validatePromoCode
 *  Returns boolean if email address is valid accdg to the Promo Code
 *  @param promoCode string required
 *  @param email string optional
 * **/
export function validateEmailPromoCode(promoCode) {
   return dispatch => {

    return getPromoCode(promoCode)
      .then((result) => {
        const { validEmail, expireDate } = result.data;
        dispatch({
          type: types.SET_PROMO_CODE_VALIDATIONS,
          validEmail,
          expireDate
        });
      })
      .catch(error => {
        const errorLog = {
          error: error.message,
          source: 'Validate Promo Code'
        };

        sendLogs(errorLog);
      });
  };
}
