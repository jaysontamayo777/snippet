import { expect } from 'chai';
import * as tag from './tag';
import sinon from 'sinon';

describe('Tag Commander', () => {
  let sandbox;
  beforeEach(() => {
    sandbox = sinon.sandbox.create();
  });
  afterEach(() => {
    sandbox.restore();
  });

  it('should click tag', () => {
    const options = {
      category: '',
      action: '',
      label: ''
    };
    const tagClickVar = tag.tagClick(options);
    expect(tagClickVar).to.be.false;
  });
});
