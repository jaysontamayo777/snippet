import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

// mock store
import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import Header from './Header';

require('../../../tools/setupEnzyme');

const state = Object.assign({}, initialState, { i18n: { locale: {} } });

const store = configuredMockStore()(state);

const wrapper = mount(
  <TestProvider store={store}>
    <Header />
  </TestProvider>
);

describe('Header', () => {
  it('should be rendered properly', () => {
    const header = wrapper.find('.header').length;

    expect(header).to.equal(1);
  });

  it('should be able to make a call', () => {
    const navLink = wrapper.find('.nav-link');

    expect(navLink.length).to.equal(1);

    navLink.simulate('click');
  });  
});
