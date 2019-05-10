import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import sinon from 'sinon';

import ModalWrapper from './ModalWrapper';

require('../../../tools/setupEnzyme');

describe('Modal Wrapper', () => {
  it('should display title and content', () => {
    const wrapper = shallow(
      <ModalWrapper
        title="Basic Title"
        content={<div className="content">Basic content</div>}
        />
    );

    expect(wrapper.find('.modal-title').text()).to.equal('Basic Title');
    expect(wrapper.find('.content').text()).to.equal('Basic content');
  });

  it('should close modal', () => {
    const onHide = sinon.spy();
    const wrapper = shallow(
      <ModalWrapper
        show={true}
        onHide={onHide}
        footer={<button onClick={onHide}>Close</button>}
        />
    );

    const closeBtn = wrapper.find('.close');
    closeBtn.simulate('click');
    expect(onHide.calledOnce).to.equal(true);
  });
});
