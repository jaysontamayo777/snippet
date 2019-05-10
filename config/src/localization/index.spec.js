/* eslint-disable import/no-duplicates */
import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
// import sinon from 'sinon';

import { configureTestStore } from '../store/configureStore';
import { TestProvider } from '../utils/testUtils';
// import * as types from '../constants/actionTypes';
// import * as languageActions from '../actions/languageActions';

// import App from '../components/App';
// import TravelInsurancePage from '../containers/TravelInsurance/TravelInsurancePage';

import {
  loadTranslations,
  setLocale,
  syncTranslationWithStore
} from 'react-redux-i18n';
import localization from './index';
import { I18n } from 'react-redux-i18n';

require('../../tools/setupEnzyme');

describe('Localization', () => {
  const store = configureTestStore();
  syncTranslationWithStore(store);
  store.dispatch(loadTranslations(localization));

  it('should have initial locale EN', () => {
    store.dispatch(setLocale('en'));

    const nextState = store.getState();

    expect(nextState.i18n.locale).to.equal('en');
  });

  it('should have initial locale ZH', () => {
    store.dispatch(setLocale('zh'));

    const nextState = store.getState();

    expect(nextState.i18n.locale).to.equal('zh');
  });

  it('should get default translation when nothing is found', () => {
    store.dispatch(setLocale('en'));
    const wrapper = mount(
      <TestProvider store={store}>
        <div>
          <h1 className="not-found">{I18n.t('labels.dummyText')}</h1>
          <h1 className="found">{I18n.t('titles.AXAGeneralInsuranceHK')}</h1>
        </div>
      </TestProvider>
    );

    // By default when i18n cannot find the text from localization,
    // it will take the name ('dummyText') from context ('labels')
    // and text will be in pascal case.
    expect(wrapper.find('.not-found').text()).to.equal('dummyText');
    expect(wrapper.find('.not-found').text()).to.not.equal('Dummy text');

    // if exist.
    // make sure it's not reusing the name as default
    expect(wrapper.find('.found').text()).to.not.equal(
      'AXA General Insurance HK'
    );
  });
});
