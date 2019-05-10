import { expect } from 'chai';
import quoteReducer from './quoteReducer';
import initialState from './initialState';
import * as types from '../constants/actionTypes';

describe('Quote reducer', () => {
  it('should return initial state', () => {
    const actions = {
      type: 'DEFAULT'
    };

    expect(quoteReducer(initialState.quote, actions)).to.deep.equal(
      initialState.quote
    );
  });

  it('should reset to initial state when INITIAL_STATE actions triggered', () => {
    const actions = {
      type: types.INITIAL_STATE
    };

    const expectation = {
      isLoading: false,
      isError: false
    };

    expect(quoteReducer(initialState.quote, actions)).to.deep.equal(
      expectation
    );
  });

  it('should reset to initial state when GET_QUOTE_VALIDATION_ERROR actions triggered', () => {
    const actions = {
      type: types.GET_QUOTE_VALIDATION_ERROR
    };

    const expectation = {
      isLoading: false,
      isError: false
    };

    expect(quoteReducer(initialState.quote, actions)).to.deep.equal(
      expectation
    );
  });

  it('should show loading screen when starting to get quote', () => {
    const actions = {
      type: types.GET_QUOTE
    };

    const result = quoteReducer(initialState.quote, actions);
    expect(result.isLoading).to.be.true;
    expect(result.isError).to.be.false;
  });

  it('should hide loading screen when finish getting quote', () => {
    const actions = {
      type: types.GET_QUOTE_SUCCESS
    };

    const result = quoteReducer(initialState.quote, actions);
    expect(result.isLoading).to.be.false;
    expect(result.isError).to.be.false;
  });

  it('should hide loading screen and show error when get quote fail', () => {
    const actions = {
      type: types.GET_QUOTE_ERROR
    };

    const result = quoteReducer(initialState.quote, actions);
    expect(result.isLoading).to.be.false;
    expect(result.isError).to.be.true;
  });

  it('should hide loading screen when getting reference success', () => {
    const actions = {
      type: types.REFERENCE_UPDATE_SUCCESS
    };

    const result = quoteReducer(initialState.quote, actions);
    expect(result.isLoading).to.be.false;
  });

  it('should hide error when profile data is updated', () => {
    const actions = {
      type: types.PROFILE_FORM_UPDATE
    };

    const result = quoteReducer(initialState.quote, actions);
    expect(result.isLoading).to.be.false;
  });
});
