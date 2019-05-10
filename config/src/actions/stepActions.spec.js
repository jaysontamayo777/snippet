import { expect } from 'chai';
import sinon from 'sinon';

import * as types from '../constants/actionTypes';
import * as stepActions from './stepActions';

import configuredMockStore from 'redux-mock-store';

describe('Step Actions', () => {
  it('should set isAltPage to false when calling SET_STARTUP_PAGE', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const dispatch = sinon.spy(store.dispatch);

    stepActions.setStartupPage(false)(dispatch);

    const actions = store.getActions();

    expect(dispatch.calledOnce);
    expect(actions[0].type).to.equal(types.SET_STARTUP_PAGE);
    expect(actions[0].payload).to.be.false;
  });

  it('should set isAltPage to true when calling SET_STARTUP_PAGE', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const dispatch = sinon.spy(store.dispatch);

    stepActions.setStartupPage(true)(dispatch);

    const actions = store.getActions();

    expect(dispatch.calledOnce);
    expect(actions[0].type).to.equal(types.SET_STARTUP_PAGE);
    expect(actions[0].payload).to.be.true;
  });

  it('should dispatch SET_PROGRESS', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const dispatch = sinon.spy(store.dispatch);

    stepActions.setProgress(1)(dispatch);

    const actions = store.getActions();

    expect(dispatch.calledOnce);
    expect(actions[0].type).to.equal(types.SET_PROGRESS);
    expect(actions[0].payload).to.equal(1);
  });
});
