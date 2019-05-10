import { expect } from 'chai';
import sinon from 'sinon';
import configuredMockStore from 'redux-mock-store';

import * as types from '../constants/actionTypes';
import * as orderActions from './orderActions';
import * as orderApi from '../api/order';

const eResponse = {
  data: {
    orderReference: 'TEST_REFERENCE'
  }
};

describe('Order Actions', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should dispatch GET_ORDER_REFERENCE_SUCCESS', done => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const onPayment = sandbox.spy();

    sandbox.stub(orderApi, 'getOrderReference', () =>
      Promise.resolve(eResponse)
    );

    orderActions
      .purchaseOrder({}, {}, {}, {}, onPayment)(store.dispatch)
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: types.GET_ORDER
        });

        expect(actions[1]).to.deep.equal({
          type: types.GET_ORDER_REFERENCE_SUCCESS,
          payload: 'TEST_REFERENCE'
        });

        expect(onPayment.calledOnce).to.be.true;

        done();
      });
  });

  it('should dispatch GET_ORDER_REFERENCE_ERROR', done => {
    const mockStore = configuredMockStore();
    const store = mockStore({});
    const onPayment = sandbox.spy();

    sinon.stub(orderApi, 'getOrderReference', () => Promise.reject('ERROR'));

    orderActions
      .purchaseOrder({})(store.dispatch)
      .then(() => {
        const actions = store.getActions();

        expect(actions[0]).to.deep.equal({
          type: types.GET_ORDER
        });

        expect(actions[1]).to.deep.equal({
          type: types.GET_ORDER_REFERENCE_ERROR,
          payload: 'ERROR'
        });

        expect(onPayment.calledOnce).to.be.false;

        done();
      });
  });
});
