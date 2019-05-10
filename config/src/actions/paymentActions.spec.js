import { expect } from 'chai';
import sinon from 'sinon';
import configuredMockStore from 'redux-mock-store';
import browserHistory from '../utils/browserHistory';

import * as types from '../constants/actionTypes';
import * as paymentActions from './paymentActions';
import * as paymentApi from '../api/payment';
import * as utils from '../lib/util';

const eResponse = {
  data: 'SUCCESS'
};

const error = {
  data: 'ERROR'
};

describe('Payment Actions', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  describe('payNow()', () => {
    it('should success and redirect to payment page', done => {
      const mockStore = configuredMockStore();
      const store = mockStore({});

      sandbox.stub(paymentApi, 'paymentNow', () => Promise.resolve(eResponse));

      const saveToStorageSpy = sandbox.stub(utils, 'saveToStorage', () => {});

      const browserHistorySpy = sandbox.stub(browserHistory, 'push', () => {});

      paymentActions
        .payNow('AXA-ORDER-REFERENCE', 'en')(store.dispatch)
        .then(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: types.GET_PAYMENT
          });

          expect(saveToStorageSpy.calledOnce).to.be.true;
          expect(browserHistorySpy.calledOnce).to.be.true;

          done();
        });
    });

    it('should dispatch GET_PAYMENT_STATUS_ERROR', done => {
      const mockStore = configuredMockStore();
      const store = mockStore({});

      sandbox.stub(paymentApi, 'paymentNow', () => Promise.reject(error));

      const saveToStorageSpy = sandbox.stub(utils, 'saveToStorage', () => {});

      const browserHistorySpy = sandbox.stub(browserHistory, 'push', () => {});

      paymentActions
        .payNow('AXA-ORDER-REFERENCE')(store.dispatch)
        .then(() => {
          const actions = store.getActions();

          expect(actions[0]).to.deep.equal({
            type: types.GET_PAYMENT
          });

          // should not save to storage and redirect to doku
          expect(saveToStorageSpy.calledOnce).to.be.false;

          // should redirect to error page
          expect(browserHistorySpy.calledOnce).to.be.true;

          // error page URL should contain order reference
          const redirectTo = browserHistorySpy.getCalls()[0].args[0];
          expect(redirectTo).to.contain('AXA-ORDER-REFERENCE');

          done();
        });
    });
  });
});
