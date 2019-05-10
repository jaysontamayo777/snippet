import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';

// mock store
import configuredMockStore from 'redux-mock-store';
import initialState from '../../reducers/initialState';
import { TestProvider } from '../../utils/testUtils';

import SendQuoteForm from './SendQuoteForm';

require('../../../tools/setupEnzyme');
const profile = {
  test: 'test'
};

const selection = {
  test: 'test'
};

describe('Send Quote form component', () => {
  const state = Object.assign({}, initialState);

  const store = configuredMockStore()(state);

    const wrapper = mount(
      <TestProvider store={store}>
        <SendQuoteForm
          sendEmail={() => Promise.resolve('success')}
          profile={profile}
          selection={selection}
        />
      </TestProvider>
    );

  it('button should not do anything if tac not checked', (done) => {
    expect(wrapper.find('.btn-ghost')).to.exist; 
    expect(wrapper.find('.toastr').length).to.equal(0);

    wrapper.find('.btn-ghost').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.toastr').length).to.equal(0);
      done();
    }, 1000);
  });

  it('should not send quote if email is incorrect', (done) => {
    expect(wrapper.find('.btn-ghost')).to.exist;
    expect(wrapper.find('Toastr').length).to.equal(1);

    wrapper.find('input[type="checkbox"]').at(0).simulate('change', { target: { checked: false } });
    wrapper.find('input').at(1).simulate('change', { target: { value: 'test' } });
    wrapper.find('.btn-ghost').at(0).simulate('click');

    setTimeout(() => {
      const toast = wrapper.find('Toastr');
      expect(toast.length).to.equal(1);
      expect(toast.find('.top-content-bar--warning').length).to.equal(1);
      expect(toast.find('.top-content-bar--content').length).to.equal(0);
      done();
    }, 1000);
  });

  it('should show error if request rejected by server', (done) => {
    const wrapper = mount(
      <TestProvider store={store}>
        <SendQuoteForm
          sendEmail={() => Promise.reject(new Error())}
          profile={profile}
          selection={selection}
        />
      </TestProvider>
    );

    expect(wrapper.find('.btn-ghost')).to.exist;
    expect(wrapper.find('.toastr').length).to.equal(0);

    wrapper.find('input[type="checkbox"]').at(0).simulate('change', { target: { checked: false } });
    wrapper.find('input').at(1).simulate('change', { target: { value: 'test@example.com' } });
    wrapper.find('.btn-ghost').simulate('click');

    setTimeout(() => {
      expect(wrapper.find('.toastr').length).to.equal(1);
      expect(wrapper.find('.top-content-bar--warning').length).to.equal(1);
      expect(wrapper.find('.top-content-bar--content').length).to.equal(0);
      done();
    }, 1000);
  });
});
