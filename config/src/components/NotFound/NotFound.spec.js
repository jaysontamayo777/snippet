import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import sinon from 'sinon';

// mock store
import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import createHistory from 'history/createBrowserHistory';
export const history = createHistory();

import NotFound from './NotFound';

require('../../../tools/setupEnzyme');

describe('NotFound', () => {
  let sandbox;

  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });

  afterEach(() => {
    sandbox.restore();
  });

  it('should be rendered properly', () => {
    const state = Object.assign({}, initialState, { i18n: { locale: {} } });

    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <NotFound />
      </TestProvider>
    );

    const heading = wrapper.find('h4').length;

    expect(heading).to.equal(1);
  });

  it('should be able to redirect to homepage', () => {
    const state = Object.assign({}, initialState, { i18n: { locale: {} } });

    const store = configuredMockStore()(state);

    const browserHistoryPushStub = sandbox.stub(history, 'push', () => { });

    const wrapper = mount(
      <TestProvider store={store}>
        <NotFound />
      </TestProvider>
    );

    const backToHomepageBtn = wrapper.find('a');

    expect(backToHomepageBtn.length).to.equal(1);
    backToHomepageBtn.simulate('click');

    expect(browserHistoryPushStub.called).to.be.false;
    browserHistoryPushStub.restore();
  });
});
