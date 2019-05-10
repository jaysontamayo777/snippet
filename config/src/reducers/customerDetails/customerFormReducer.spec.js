import { expect } from 'chai';
import customerFormReducer from './customerFormReducer';
import * as actions from '../../actions/customerDetails/customerFormActions';
import * as types from '../../constants/actionTypes';
import paths from '../../constants/routePaths';
import initialState from './../initialState';

describe('Customer Form Reducer', () => {
  it('should increment form Indexes by 1 when passed GO_TO_NEXT_FORM', () => {
    const initialState = {
      filledFormIndex: 0,
      displayedFormIndex: 0
    };

    const expectedState = {
      filledFormIndex: 1,
      displayedFormIndex: 1
    };

    const action = actions.goToNextForm();
    const newState = customerFormReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should increment form Indexes', () => {
    const initialState = {
      filledFormIndex: 2,
      displayedFormIndex: 1
    };

    const expectedState = {
      filledFormIndex: 2,
      displayedFormIndex: 2
    };

    const action = actions.goToNextForm();
    const newState = customerFormReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should not increment form Indexes', () => {
    const initialState = {
      filledFormIndex: 1,
      displayedFormIndex: 2
    };

    const expectedState = {
      filledFormIndex: 1,
      displayedFormIndex: 2
    };

    const action = actions.goToNextForm();
    const newState = customerFormReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should set displayedFormIndex to selected form when passed GO_TO_SELECTED_FORM', () => {
    const initialState = {
      filledFormIndex: 2,
      displayedFormIndex: 2
    };

    const expectedState = {
      filledFormIndex: 2,
      displayedFormIndex: 1
    };

    const action = actions.goToSelectedForm(1);
    const newState = customerFormReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should update when moving to another step', () => {
    const ORIGINAL_STATE = {
      filledFormIndex: 0,
      displayedFormIndex: 0
    };

    const getAction = (pathname) => {
      return {
        type: types.LOCATION_CHANGE,
        payload: {
          pathname: pathname
        }
      };
    };

    expect(customerFormReducer(ORIGINAL_STATE, getAction(paths.INDEX)))
      .to.deep.equal(initialState.customerForm);
    expect(customerFormReducer(ORIGINAL_STATE, getAction(paths.PLAN_SELECTION)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(customerFormReducer(ORIGINAL_STATE, getAction(paths.CUSTOMER_DETAILS)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(customerFormReducer(ORIGINAL_STATE, getAction(paths.SUMMARY_DETAILS)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(customerFormReducer(ORIGINAL_STATE, getAction(paths.PAYMENT)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(customerFormReducer(ORIGINAL_STATE, getAction(paths.PAYMENT_CONFIRMATION)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(customerFormReducer(ORIGINAL_STATE, getAction('DEFAULT')))
      .to.deep.equal(initialState.customerForm);
  });
});
