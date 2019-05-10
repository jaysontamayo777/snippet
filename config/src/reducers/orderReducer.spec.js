import { expect } from 'chai';
import orderReducer from './orderReducer';
import * as types from '../constants/actionTypes';
import initialState from './initialState';
import paths from '../constants/routePaths';

describe('Order reducer', () => {
  it('should return initial state', () => {
    const actions = {
      type: 'DEFAULT'
    };

    expect(orderReducer(initialState.order, actions)).to.deep.equal(
      initialState.order
    );
  });

  it('should show loading screen when starting to get order', () => {
    const actions = {
      type: types.GET_ORDER
    };

    expect(orderReducer(initialState.order, actions).isLoading).to.equal(true);
  });

  it('should hide loading screen after having order reference', () => {
    const actions = {
      type: types.GET_ORDER_REFERENCE_SUCCESS,
      payload: 'ORDER_REFERENCE'
    };

    const result = orderReducer(initialState.order, actions);

    expect(result.isLoading).to.equal(false);
    expect(result.orderReference).to.equal('ORDER_REFERENCE');
  });

  it('should hide loading screen and show error if having issue getting order reference', () => {
    const actions = {
      type: types.GET_ORDER_REFERENCE_ERROR
    };

    const result = orderReducer(initialState.order, actions);

    expect(result.isLoading).to.equal(false);
    expect(result.isError).to.equal(true);
  });

  it('should show loading screen when starting to get payment', () => {
    const actions = {
      type: types.GET_PAYMENT
    };

    const result = orderReducer(initialState.order, actions);

    expect(result.isLoading).to.equal(true);
  });

  it('should hide loading screen if getting payment success', () => {
    const actions = {
      type: types.GET_PAYMENT_STATUS_ERROR
    };

    const result = orderReducer(initialState.order, actions);

    expect(result.isLoading).to.equal(false);
  });

  it('should hide loading screen if getting payment errror', () => {
    const actions = {
      type: types.GET_PAYMENT_STATUS_SUCCESS
    };

    const result = orderReducer(initialState.order, actions);

    expect(result.isLoading).to.equal(false);
  });

  it('should update when moving to another step', () => {
    const ORIGINAL_STATE = {
      originalState: true
    };

    const getAction = pathname => {
      return {
        type: types.LOCATION_CHANGE,
        payload: {
          pathname: pathname
        }
      };
    };

    expect(
      orderReducer(ORIGINAL_STATE, getAction(paths.CUSTOMER_DETAILS))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      orderReducer(ORIGINAL_STATE, getAction(paths.SUMMARY_DETAILS))
    ).to.deep.equal(ORIGINAL_STATE);
    expect(
      orderReducer(ORIGINAL_STATE, getAction(paths.PAYMENT))
    ).to.deep.equal(ORIGINAL_STATE);
  });
});
