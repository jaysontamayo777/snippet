import { expect } from 'chai';
import travellerReducer from './travellerReducer';
import initialState from '../initialState';

describe('Traveller Reducer', () => {
  it('should initialize forms', () => {
    const expectedState = {
      formFields: {
        gender: '',
        firstName: '',
        lastName: '',
        dateOfBirth: ''
      },
      isOpen: false,
      errors: {}
    };

    const newState = travellerReducer(initialState.traveller, 'init');
    expect(newState).to.deep.equal(expectedState);
  });
});
