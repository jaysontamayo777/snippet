import { expect } from 'chai';
import agreementsReducer from './agreementsReducer';
import * as types from '../constants/actionTypes';
import initialState from './initialState';

describe('Agreements Reducer', () => {
  it('should reset to initial state when INITIAL_STATE actions triggered', () => {
    const actions = {
      type: types.INITIAL_STATE
    };

    const expectation = { termsAndConditionsAccepted: false };

    expect(agreementsReducer(initialState.agreements, actions)).to.deep.equal(
      expectation
    );
  });

  it('should update terms and conditions when TERMS_AND_CONDITIONS_ACCEPTED actions triggered', () => {
    const actions = {
      type: types.TERMS_AND_CONDITIONS_ACCEPTED,
      payload: true
    };

    const expectation = { termsAndConditionsAccepted: true };

    expect(agreementsReducer(initialState.agreements, actions)).to.deep.equal(
      expectation
    );
  });
});
