import { expect } from 'chai';
import * as types from '../constants/actionTypes';
import * as tagCommanderActions from './tagCommanderActions';

import configuredMockStore from 'redux-mock-store';

describe('Tag Commander Actions', () => {
  it('should dispatch SET_PAYMENT_FAILED_TAG', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const trigger = 'trigger';

    tagCommanderActions.setPaymentFailedTag(trigger)(store.dispatch);
    const actions = store.getActions();

    expect(actions[0].type).to.equal(types.SET_PAYMENT_FAILED_TAG);
    expect(actions[0].payload).to.deep.equal(trigger);
  });

  it('should dispatch SET_PAYMENT_SUCCESS_TAG', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const trigger = 'trigger';

    tagCommanderActions.setPaymentSuccessTag(trigger)(store.dispatch);
    const actions = store.getActions();

    expect(actions[0].type).to.equal(types.SET_PAYMENT_SUCCESS_TAG);
    expect(actions[0].payload).to.deep.equal(trigger);
  });
});
