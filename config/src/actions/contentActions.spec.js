import { expect } from 'chai';
import sinon from 'sinon';
import configuredMockStore from 'redux-mock-store';

import * as types from '../constants/actionTypes';
import * as contentAction from './contentActions';
import * as getContento from '../api/content';

const mockResponse = {
  data: [{ en: {} }, { zh: {} }]
};

describe.only('Content Actions', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should dispatch CONTENT_UPDATE_ERROR if got some error while fetching', done => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const cb = sandbox.spy();

    sandbox.stub(getContento, 'getContento', () =>
      Promise.resolve(mockResponse)
    );

    contentAction
      .loadContents({}, cb)(store.dispatch)
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: types.CONTENT_UPDATE_ERROR
        });

        expect(cb.calledOnce).to.be.false;
        done();
      });
  });
});
