import {
  SET_PAYMENT_SUCCESS_TAG,
  SET_PAYMENT_FAILED_TAG
} from '../constants/actionTypes';

export const setPaymentFailedTag = trigger => dispatch => {
  dispatch({
    type: SET_PAYMENT_FAILED_TAG,
    payload: trigger
  });
};

export const setPaymentSuccessTag = trigger => dispatch => {
  dispatch({
    type: SET_PAYMENT_SUCCESS_TAG,
    payload: trigger
  });
};
