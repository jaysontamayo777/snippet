import { expect } from 'chai';
import stepReducer from './stepReducer';
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

describe('Step reducer', () => {
  it('should return initial state', () => {
    expect(stepReducer(initialState.step, getAction(''))).to.deep.equal({
      current: 1,
      enabled: 1,
      previous: 1,
      isAltPage: false
    });
  });

  it('should move to new step', () => {
    expect(
      stepReducer(initialState.step, getAction(paths.INDEX))
    ).to.deep.equal({ current: 1, enabled: 1, previous: 1, isAltPage: false });
    expect(
      stepReducer(initialState.step, getAction(paths.TRAVEL_INSURANCE))
    ).to.deep.equal({ current: 1, enabled: 1, previous: 1, isAltPage: false });
    expect(
      stepReducer(initialState.step, getAction(paths.PLAN_SELECTION))
    ).to.deep.equal({ current: 2, enabled: 2, previous: 1, isAltPage: false });
    expect(
      stepReducer(initialState.step, getAction(paths.CUSTOMER_DETAILS))
    ).to.deep.equal({ current: 3, enabled: 3, previous: 1, isAltPage: false });
    expect(
      stepReducer(initialState.step, getAction(paths.SUMMARY_DETAILS))
    ).to.deep.equal({ current: 3, enabled: 3, previous: 1, isAltPage: false });
    expect(
      stepReducer(
        initialState.step,
        getAction(paths.PAYMENT_CONFIRMATION)
      )
    ).to.deep.equal({ current: 5, enabled: 1, previous: 1, isAltPage: false });
  });

  it('should reset to initial state when INITIAL_STATE actions triggered', () => {
    const actions = {
      type: types.INITIAL_STATE
    };

    const expectation = {
      current: 1,
      enabled: 1,
      isAltPage: false
    };

    expect(stepReducer(initialState.step, actions)).to.deep.equal(expectation);
  });

  it('should set isAltPage when SET_STARTUP_PAGE actions triggered', () => {
    const actions = {
      type: types.SET_STARTUP_PAGE,
      payload: true
    };

    const expectation = {
      current: 1,
      enabled: 1,
      isAltPage: true
    };

    expect(stepReducer(initialState.step, actions)).to.deep.equal(expectation);
  });

  it('should set progress when SET_PROGRESS actions triggered', () => {
    const actions = {
      type: types.SET_PROGRESS,
      payload: 1
    };

    const expectation = {
      current: 1,
      enabled: 1,
      isAltPage: false,
      progress: 1
    };

    expect(stepReducer(initialState.step, actions)).to.deep.equal(expectation);
  });
});
