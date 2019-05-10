import { expect } from 'chai';
import paymentReducer from './paymentReducer';
import * as types from '../constants/actionTypes';
import initialState from './initialState';
import paths from '../constants/routePaths';

describe('Payment reducer', () => {
  it('should return initial state', () => {
    const actions = {
      type: 'DEFAULT'
    };

    expect(paymentReducer(initialState.payment, actions)).to.deep.equal(
      initialState.payment
    );

    const actions_1 = {
      type: types.PAYMENT
    };

    expect(paymentReducer(initialState.payment, actions_1)).to.deep.equal(
      initialState.payment
    );
  });

  it('should hide loading screen when payment info success', () => {
    const actions = {
      type: types.PAYMENT_INFO_SUCCESS,
      info: {}
    };

    expect(paymentReducer(initialState.payment, actions).isLoading).to.equal(
      false
    );
  });

  it('should show loading screen when start getting payment', () => {
    const actions = {
      type: types.GET_PAYMENT
    };

    expect(paymentReducer(initialState.payment, actions).isLoading).to.equal(
      true
    );
  });

  it('should hide loading screen when getting payment success or fail', () => {
    const actions = {
      type: types.GET_PAYMENT_STATUS_SUCCESS
    };

    expect(paymentReducer(initialState.payment, actions).isLoading).to.equal(
      false
    );

    const actions_2 = {
      type: types.GET_PAYMENT_STATUS_ERROR
    };

    expect(paymentReducer(initialState.payment, actions_2).isLoading).to.equal(
      false
    );
  });

  it('should update when moving to another step', () => {
    const ORIGINAL_STATE = { original: true };

    const getAction = pathname => {
      return {
        type: types.LOCATION_CHANGE,
        payload: {
          pathname: pathname
        }
      };
    };

    expect(
      paymentReducer(ORIGINAL_STATE, getAction(paths.INDEX))
    ).to.deep.equal(initialState.payment);
    expect(
      paymentReducer(ORIGINAL_STATE, getAction(paths.PLAN_SELECTION))
    ).to.deep.equal(initialState.payment);
    expect(
      paymentReducer(ORIGINAL_STATE, getAction(paths.CUSTOMER_DETAILS))
    ).to.deep.equal(initialState.payment);
    expect(
      paymentReducer(ORIGINAL_STATE, getAction(paths.SUMMARY_DETAILS))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      paymentReducer(ORIGINAL_STATE, getAction(paths.PAYMENT))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      paymentReducer(ORIGINAL_STATE, getAction(paths.PAYMENT_CONFIRMATION))
    ).to.deep.equal(initialState.payment);
    expect(paymentReducer(ORIGINAL_STATE, getAction('DEFAULT'))).to.deep.equal(
      initialState.payment
    );
  });
});
