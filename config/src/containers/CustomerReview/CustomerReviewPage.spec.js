import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

// mock store
import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import CustomerReviewPage from './CustomerReviewPage';

import * as profileActions from '../../actions/profileActions';
import * as types from '../../constants/actionTypes';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

require('../../../tools/setupEnzyme');

describe('Customer Review page', () => {
  let sandbox;
  beforeEach(() => { sandbox = sinon.sandbox.create(); });
  afterEach(() => { sandbox.restore(); });

  const state = Object.assign({}, initialState);

  state.i18n = {
    locale: 'en'
  };
  const store = configuredMockStore()(state);

  it('should display Customer Details', () => {
    const wrapper = mount(
      <TestProvider store={store}>
        <CustomerReviewPage />
      </TestProvider>
    );

    const customerDetails = wrapper.find('ReviewDetails').length;
    const termsAndConditions = wrapper.find('Agreement').length;
    const basket = wrapper.find('TripSummary').length;

    expect(customerDetails).to.equal(1);
    expect(termsAndConditions).to.equal(1);
    expect(basket).to.equal(2);
  });

  it('should enable Pay Now button upon agree on Terms and Conditions', () => {
    const wrapper = mount(
      <TestProvider store={store}>
        <CustomerReviewPage
          haveReadTermsAndCondition={true}
        />
      </TestProvider>
    );

    const readtermsAndConditions = wrapper.find('#read-terms-and-conditions');
    expect(readtermsAndConditions.length).to.equal(1);
    readtermsAndConditions.simulate('change');

    expect(wrapper.find('button.disabled')).to.have.length(0);
  });

  it('should enable Pay Now button upon agree on Terms and Conditions', () => {
    const onUpdateProfile = sinon.spy(store, 'dispatch');
    sinon.stub(profileActions, 'updateProfile', (name, value) => {
      return (() => store.dispatch({
        type: types.PROFILE_FORM_UPDATE,
        payload: { name, value }
      }))();
    });

    const wrapper = mount(
      <TestProvider store={store}>
        <CustomerReviewPage
          haveReadTermsAndCondition={true}
        />
      </TestProvider>
    );

    const agreeForPersonalData = wrapper.find('#agreed-to-use-personal-data');
    expect(agreeForPersonalData.length).to.equal(1);
    agreeForPersonalData.simulate('change');

    expect(onUpdateProfile.called).to.equal(true);
  });
});
