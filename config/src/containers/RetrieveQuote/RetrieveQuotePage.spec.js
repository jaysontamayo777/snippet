import React from 'react';
import chai from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';
import sinonChai from 'sinon-chai';
// mock store

import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';
import routePaths from '../../constants/routePaths';
import * as profileActions from '../../actions/profileActions';
import * as quoteActions from '../../actions/quoteActions';
import * as travellerActions from '../../actions/customerDetails/travellerActions';

import { configureTestStore } from '../../store/configureStore';
import * as types from '../../constants/actionTypes';

import RetrieveQuotePage from './RetrieveQuotePage';
import browserHistory from '../../utils/browserHistory';

const expect = chai.expect;
chai.use(sinonChai);

require('../../../tools/setupEnzyme');

/*eslint import/namespace: 0*/

describe('Retrieve Quote Page', () => {
  beforeEach(() => {

    initialState.quote = {
      isLoading: false
    };

    initialState.content =
      {
        updateState: 2,
        contento: {
          en: {
            contento: {
              promotions: {
                title: 'Promotion Title',
                description: [
                  'Promo description here'
                ]
              },
              coverages: [
                {
                  coverage_id: 'CVR-SIN',
                  coverage_insured: 'per insured person',
                  coverage_limit: 'Max Limit/Sub Limit',
                  coverage_name: 'Single Trip',
                  coverage_plan: 'Classic Plan',
                  items: [
                    {
                      main_content: 'Main Content'
                    },
                    {
                      main_content: 'Main Content with Sub Content',
                      sub_content: [
                        'Sub Content'
                      ]
                    }
                  ]
                },
                {
                  coverage_id: 'CVR-ANN',
                  coverage_insured: 'per insured person',
                  coverage_limit: 'Max Limit/Sub Limit',
                  coverage_name: 'Annual Cover',
                  coverage_plan: 'Classic Plan',
                  items: [
                    {
                      main_content: 'Main Content'
                    },
                    {
                      main_content: 'Main Content with Sub Content',
                      sub_content: [
                        'Sub Content'
                      ]
                    }
                  ]
                },
                {
                  coverage_id: 'CVR-SIN-VIP',
                  coverage_insured: 'per insured person',
                  coverage_limit: 'Max Limit/Sub Limit',
                  coverage_name: 'Single Trip',
                  coverage_plan: 'VIP Plan',
                  items: [
                    {
                      main_content: 'Main Content'
                    },
                    {
                      main_content: 'Main Content with Sub Content',
                      sub_content: [
                        'Sub Content'
                      ]
                    }
                  ]
                }
              ],
              plans: [{
                plan_id: "PLN-SIN-CLA",
                plan_insured: "per insured person",
                plan_limit: "Max Limit / Sub-limit",
                plan_name: "Single Journey",
                plan_plan: "Classic Plan",
                items: [{
                  main_content: "main content",
                  sub_content: ["sub1"]
                }]
              }],
              coverage_header_list: [{
                main_content: "Main header",
                sub_content: ["sub header 1"]
              }],
              addon_list: [{
                addon_content: ["Our plan is covering accidental death and 9 degree of disablement by selecting this option."],
                addon_id: "ADN-SIN-CLA-001",
                addon_name: "Enhanced Personal Accident",
                image: "https://axahk.cdn.axa-contento-118412.eu/axahk/1ac49324c9388151ca212e39170ea548ef1b96fa_hand-cross-blue3x.png"
              }]
            }
          }
        }
      };
  });

  it('should redirect to Travel Insurance page', () => {
    const browserHistoryPushStub = sinon.stub(browserHistory, 'push', () => { });

    const store = configuredMockStore()(initialState);
    const wrapper = mount(
      <TestProvider store={store}>
        <RetrieveQuotePage />
      </TestProvider>
    );

    expect(wrapper.find('Loader').length).to.be.equal(1);
    expect(browserHistoryPushStub).to.have.been.calledOnce;
    expect(browserHistoryPushStub).to.have.been.calledWith(routePaths.INDEX);

    browserHistoryPushStub.restore();
  });

  it('should retrieve profile data and redirect to Plan Selection page', () => {
    const browserHistoryPushStub = sinon.stub(browserHistory, 'push', () => { });

    const getQuote = (obj, isRedirect) => {
      expect(isRedirect).to.be.true;

      return (dispatch) => {
        dispatch({
          type: types.GET_QUOTE_SUCCESS,
          payload: obj
        });

        if (isRedirect) {
          browserHistory.push(routePaths.PLAN_SELECTION);
        }
      };
    };

    const updateAll = () => {
      return (dispatch) => dispatch({
        type: types.PROFILE_FORM_UPDATE_ALL,
        payload: {}
      });
    };

    const initializeTravellerForms = () => {
      return (dispatch) => dispatch({
        type: types.TRAVELLER_FORM_INIT,
        payload: {}
      });
    };

    const updateAllStub = sinon.stub(profileActions, 'updateAll', updateAll);
    const quoteActionsStub = sinon.stub(quoteActions, 'getQuote', getQuote);
    const initializeTravellerFormsStub = sinon.stub(travellerActions, 'initializeTravellerForms', initializeTravellerForms);

    const store = configureTestStore(initialState);
    const params = {
      quote: 'W3siaXNMb2FkaW5nIjpmYWxzZSwiZXJyb3JzIjp7fSwidHlwZU9mQ292ZXIiOiJzaW5nbGVUcmlwIiwiZGVwYXJ0dXJlIjoiMDEvMjUvMjAxNyIsInN0YXJ0RGF0ZSI6IjAxLzI1LzIwMTciLCJlbmREYXRlIjoiMDEvMjUvMjAxOCIsInR5cGVPZlBsYW4iOiJpbmRpdmlkdWFsIiwibm9PZkFkdWx0IjoxLCJub09mQ2hpbGQiOjAsInJlZ2lvbiI6Indvcmxkd2lkZSIsImFycml2YWwiOiIwMS8yNi8yMDE3In0sIHt9XQ=='
    };

    const wrapper = mount(
      <TestProvider store={store}>
        <RetrieveQuotePage params={params}
          updateAll={profileActions.updateAll}
          getQuote={quoteActions.getQuote}
          initializeTravellerForms={travellerActions.initializeTravellerForms} />
      </TestProvider>
    );

    expect(wrapper.find('Loader').length).to.be.equal(1);
    expect(browserHistoryPushStub).to.have.been.calledOnce;

    browserHistoryPushStub.restore();
    updateAllStub.restore();
    quoteActionsStub.restore();
    initializeTravellerFormsStub.restore();
  });
});
