import { expect } from 'chai';
import * as types from '../constants/actionTypes';
import * as profileActions from './profileActions';

import configuredMockStore from 'redux-mock-store';

describe('Profile Actions', () => {
  it('should dispatch PROFILE_FORM_UPDATE_ALL', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const obj = { key: 'value' };

    profileActions.updateAll(obj)(store.dispatch);
    const actions = store.getActions();

    expect(actions[0].type).to.equal(types.PROFILE_FORM_UPDATE_ALL);
    expect(actions[0].payload).to.deep.equal(obj);
  });

  it('should dispatch PROFILE_VALIDATION_ERROR and get validation errors', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const EXPECTED_ERRORS = [{ name: 'Required' }, { number: 'Not a number' }];

    profileActions.getProfileValidationError(EXPECTED_ERRORS)(store.dispatch);
    const actions = store.getActions();

    expect(actions[0].type).to.equal(types.PROFILE_VALIDATION_ERROR);
    expect(actions[0].payload.errors).to.deep.equal(EXPECTED_ERRORS);
  });

  it('should dispatch CURRENCY_CHANGE', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const value = 'CURRENCY';

    profileActions.changeCurrency(value)(store.dispatch);
    const actions = store.getActions();

    expect(actions[0].type).to.equal(types.CURRENCY_CHANGE);
    expect(actions[0].payload).to.deep.equal(value);
  });
});
