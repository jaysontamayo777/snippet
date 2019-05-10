import { expect } from 'chai';
import tagCommanderReducer from './tagCommanderReducer';
import * as types from '../constants/actionTypes';
import paths from '../constants/routePaths';
import initialState from './initialState';

const getAction = pathname => {
  return {
    type: types.LOCATION_CHANGE,
    payload: {
      pathname: pathname
    }
  };
};

describe('TagCommander Reducer', () => {
  it('should return initial state', () => {
    expect(
      tagCommanderReducer(initialState.tagCommanderTrigger, getAction(''))
    ).to.deep.equal({ paymentSuccess: false, paymentFailed: false });
  });

  it('should reset to initial state when GET_QUOTE_SUCCESS actions triggered', () => {
    const actions = {
      type: types.GET_QUOTE_SUCCESS
    };

    const expectation = {
      paymentSuccess: false,
      paymentFailed: false
    };

    expect(
      tagCommanderReducer(initialState.tagCommanderTrigger, actions)
    ).to.deep.equal(expectation);
  });

  it('should paymentFailed update to tru when SET_PAYMENT_FAILED_TAG actions triggered', () => {
    const actions = {
      type: types.SET_PAYMENT_FAILED_TAG,
      payload: true
    };

    const expectation = {
      paymentSuccess: false,
      paymentFailed: true
    };

    expect(
      tagCommanderReducer(initialState.tagCommanderTrigger, actions)
    ).to.deep.equal(expectation);
  });

  it('should paymentSuccess update to tru when SET_PAYMENT_SUCCESS_TAG actions triggered', () => {
    const actions = {
      type: types.SET_PAYMENT_SUCCESS_TAG,
      payload: true
    };

    const expectation = {
      paymentSuccess: true,
      paymentFailed: false
    };

    expect(
      tagCommanderReducer(initialState.tagCommanderTrigger, actions)
    ).to.deep.equal(expectation);
  });

  it('should move to plan selection page', () => {
    const expectation = {
      paymentSuccess: false,
      paymentFailed: false
    };
    expect(
      tagCommanderReducer(expectation, getAction(paths.PLAN_SELECTION))
    ).to.deep.equal(initialState.tagCommanderTrigger);
  });
});
