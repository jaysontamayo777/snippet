import {
  paymentNow,
} from '../api/payment';
import * as types from '../constants/actionTypes';
import routePaths from '../constants/routePaths';
import { sendLogs } from '../api/logger';
import browserHistory from '../utils/browserHistory';

/**
 * Function that will construct the URL for the payment gateway.
 *
 * @param {string} orderReference
 * Order reference number
 */
export const payNow = (orderReference) => {
  return dispatch => {
    dispatch({ type: types.GET_PAYMENT });

    return paymentNow(orderReference)
      .then(response => {
        window.location.href = response.data.redirectUrl;
      })
      .catch(err => {
        const errorLog = {
          error: err,
          source: 'Payment Now'
        };

        sendLogs(errorLog);

        dispatch({ type: types.GET_PAYMENT_STATUS_ERROR });
        // display payment error page
        const pathname = `${routePaths.PAYMENT_CONFIRMATION}/error`;
        browserHistory.push(pathname);
      });
  };
};

