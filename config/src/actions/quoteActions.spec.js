import { expect } from 'chai';
import sinon from 'sinon';
import * as types from '../constants/actionTypes';
import * as quoteActions from './quoteActions';
import * as Quotation from '../api/quotation';

import configuredMockStore from 'redux-mock-store';

const SELECTION = {
  productId: 'PRD0001',
  planId: 'PLN0001',
  addOnIds: ['ADDON001']
};

describe('Quote Actions', () => {
  afterEach(done => {
    Quotation.getQuotation.restore && Quotation.getQuotation.restore();
    done();
  });

  describe('Get Quotation', () => {
    it('should proceed to GET_QUOTE_SUCCESS action and get quotation data', done => {
      const mockStore = configuredMockStore();
      const store = mockStore({});
      const PROFILING_DATA = {
        region: 'Asia'
      };

      const RESPONSE_QUOTE = {
        products: [
          { productId: 'PRD0001', plans: [{ planId: 'PLN0001', fee: '1' }] }
        ]
      };
      const EXPECTED_ACTION = {
        type: types.GET_QUOTE_SUCCESS,
        payload: RESPONSE_QUOTE
      };
      const EXPECTED_CHANNEL_UPDATE_ACTION = {
        type: types.PROFILE_FORM_UPDATE,
        payload: { name: 'channel', value: 'Direct' }
      };

      const dispatch = sinon.spy(store.dispatch);
      sinon.stub(Quotation, 'getQuotation', () =>
        Promise.resolve({ data: { quote: RESPONSE_QUOTE } })
      );

      quoteActions
        .getQuote(PROFILING_DATA, SELECTION, 'en')(dispatch)
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.equal(types.GET_QUOTE);
          expect(actions[1]).to.deep.equal(EXPECTED_CHANNEL_UPDATE_ACTION);
          expect(actions[2]).to.deep.equal(EXPECTED_ACTION);
          done();
        })
        .catch(error => {
          done(error);
        });
    });

    it('should proceed to GET_QUOTE_ERROR action when not eligible', done => {
      const mockStore = configuredMockStore();
      const store = mockStore({});
      const PROFILING_DATA = {
        region: 'Asia'
      };

      const RESPONSE_QUOTE = {
        products: [{ productId: 'PRD0001', plans: [{ planId: 'PLN0001' }] }]
      };

      const dispatch = sinon.spy(store.dispatch);
      sinon.stub(Quotation, 'getQuotation', () => {
        return new Promise(resolve =>
          resolve({ data: { quote: RESPONSE_QUOTE } })
        );
      });

      quoteActions
        .getQuote(PROFILING_DATA, SELECTION, 'en', true)(dispatch)
        .then(() => {
          const actions = store.getActions();
          expect(actions[0].type).to.equal(types.GET_QUOTE);
          expect(actions[1].type).to.equal(types.GET_QUOTE_ERROR);
          done();
        });
    });

    it('should proceed to GET_QUOTE_ERROR action when getQuotation fails', done => {
      const mockStore = configuredMockStore();
      const store = mockStore({});

      const dispatch = sinon.spy(store.dispatch);
      sinon.stub(Quotation, 'getQuotation', () => {
        return new Promise((resolve, reject) => reject({}));
      });

      quoteActions
        .getQuote({}, SELECTION, 'en', true)(dispatch)
        .catch(() => {
          const actions = store.getActions();
          expect(dispatch.calledOnce);
          expect(actions[0].type).to.equal(types.GET_QUOTE);
          expect(actions[1].type).to.equal(types.GET_QUOTE_ERROR);
          done();
        });
    });

    it('should proceed to GET_QUOTE_VALIDATION_ERROR action and PROFILE_VALIDATION_ERROR when validation for promoCode on getQuotation fails', done => {
      const mockStore = configuredMockStore();
      const store = mockStore({});

      const badRequestError = {
        response: {
          status: 400,
          data: {
            error: {
              promoCode: 'invalid promoCode'
            }
          }
        }
      };

      const dispatch = sinon.spy(store.dispatch);
      sinon.stub(Quotation, 'getQuotation', () => {
        return new Promise((resolve, reject) => reject(badRequestError));
      });

      quoteActions
        .getQuote(null, true)(dispatch)
        .catch(() => {
          const actions = store.getActions();
          expect(dispatch.calledOnce);
          expect(actions[0].type).to.equal(types.GET_QUOTE);
          expect(actions[1].type).to.equal(types.PROFILE_VALIDATION_ERROR);
          expect(actions[2].type).to.equal(types.GET_QUOTE_VALIDATION_ERROR);
          done();
        });
    });
  });
});
