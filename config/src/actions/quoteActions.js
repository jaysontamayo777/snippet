import browserHistory from '../utils/browserHistory';
import _ from 'lodash';

import { getQuotation } from '../api/quotation';
import * as types from '../constants/actionTypes';
import { getPlanList } from '../selectors/plansSelectors';
import routePaths from '../constants/routePaths';
import code from '../constants/errorCode';
import { sendLogs } from '../api/logger';
import { loadPlansSuccess, selectedPlanSuccess } from './planActions';

export const getQuoteSuccess = quote => {
  return { type: types.GET_QUOTE_SUCCESS, payload: quote };
};

export const addPromoCodeError = errors => {
  return  {
    type: types.PROFILE_VALIDATION_ERROR,
    payload: { errors }
  };
};

/**
 * Get Quotation / Profiling
 *
 * Sends the profiling information to Quotation module and stores
 * the response into redux. Response contains the product, plans and
 * add ons information.
 *
 * @param {Object} profileData
 * Object that contains the travel details needed for profiling.
 *
 * @param {Object} selection
 * Object that has all the selection made by the user. Structure should
 * have productId, planId and addOnIds (list of ids of all selected addons)
 *
 * @param {string} locale
 * Can be 'en' or 'zh'
 *
 * @param {boolean} isRedirect
 * Set the value to TRUE if you want to redirect to plan selection page
 * after successful profiling.
 */
export const getQuote = (
  profileData,
  selection,
  locale = 'en',
  isRedirect = false
) => {
  return dispatch => {
    // init get quote
    dispatch({ type: types.GET_QUOTE });

    return getQuotation(profileData, selection)
      .then(response => {
        const quoteResponse = _.get(response, 'data.quote.products', {});
        const isValidPromoCode = _.get(response, 'data.quote.isValidPromoCode', null);
        const errorPromoCode = _.get(response, 'data.quote.errorPromoCode', null);
        const planList = getPlanList(quoteResponse);

        dispatch(getQuoteSuccess(quoteResponse));
        dispatch(loadPlansSuccess(planList));

        if (!_.isEmpty(selection.planId)) {
          dispatch(selectedPlanSuccess(planList, selection));
        }

        if (_.isBoolean(isValidPromoCode) && !isValidPromoCode) {
          const errorMessage = errorPromoCode === 'Expired PromoCode'
            ? 'This group code has expired.'
            : 'Please enter a valid group code.';
          dispatch(addPromoCodeError({
            promoCode: errorMessage
          }));
        } else if ((isValidPromoCode || _.isNil(isValidPromoCode)) && isRedirect) {
          browserHistory.push(routePaths.PLAN_SELECTION, { locale });
          dispatch(addPromoCodeError({}));
        } 
      })
      .catch((err = {}) => {
        const errorLog = {
          error: err,
          source: 'Get Quotation'
        };

        sendLogs(errorLog);

        dispatch({ type: types.GET_QUOTE_ERROR });

        return Promise.reject(err);
      });
  };
};
