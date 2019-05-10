import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

// mock store
import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import ProductPageHeader from './ProductPageHeader';

require('../../../tools/setupEnzyme');

describe.only('Product Page Header', () => {
  it('should expand menu sidebar on click to menu button', () => {
    const state = Object.assign({}, initialState, { i18n: { locale: {} } });

    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <ProductPageHeader />
      </TestProvider>
    );

    const expandMenu = wrapper.find('.header-burger');

    // for mobile & desktop
    expect(expandMenu.length).to.equal(2);

    // click menu button
    expandMenu.at(1).simulate('click');
    // open sidebar menu
    expect(wrapper.find('.is-open').length).to.equal(3);
  });

  it('should open modal on click to login button', () => {
    const state = Object.assign({}, initialState, { i18n: { locale: {} } });

    const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <ProductPageHeader />
      </TestProvider>
    );

    const openModal = wrapper.find('.btn-axa-blue--login');

    expect(openModal.length).to.equal(1);

    // click menu button
    openModal.simulate('click');
    // open modal with login links
  });
});
