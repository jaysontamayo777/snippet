import { expect } from 'chai';
import contentReducer from './contentReducer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';

describe('Content reducer', () => {
  it('should return initial state', () => {
    const actions = {
      type: 'DEFAULT'
    };

    expect(contentReducer(initialState.content, actions)).to.deep.equal(
      initialState.content
    );
  });

  it('should update state if contento update success', () => {
    const actions = {
      type: types.CONTENT_UPDATE_SUCCESS
    };

    expect(contentReducer(initialState.content, actions).updateState).to.equal(
      1
    );
  });

  it('should update state if reference update success', () => {
    const actions = {
      type: types.REFERENCE_UPDATE_SUCCESS,
      payload: {}
    };

    expect(contentReducer(initialState.content, actions).updateState).to.equal(
      2
    );
  });

  it('should reset state if contento update error', () => {
    const actions = {
      type: types.CONTENT_UPDATE_ERROR
    };

    expect(contentReducer(initialState.content, actions).updateState).to.equal(
      0
    );
  });
});
