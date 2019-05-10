import { expect } from 'chai';
import sinon from 'sinon';

import * as types from '../constants/actionTypes';
import * as resetAction from './resetActions';

import configuredMockStore from 'redux-mock-store';

describe('Reset Actions', () => {
  it('should dispatch INITIAL_STATE', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const dispatch = sinon.spy(store.dispatch);

    resetAction.resetStates()(dispatch);

    const actions = store.getActions();

    expect(dispatch.calledOnce);
    expect(actions[0].type).to.equal(types.INITIAL_STATE);
  });
});
