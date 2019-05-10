import { expect } from 'chai';
import policyHolderReducer from './policyHolderReducer';
import * as actions from '../../actions/customerDetails/policyHolderActions';
import * as types from '../../constants/actionTypes';
import paths from '../../constants/routePaths';
import initialState from './../initialState';

describe('Policy Holder Reducer', () => {
  it('should update state of form field and validate field when passed POLICY_HOLDER_FORM_UPDATE_FIELD', () => {
    const initialState = {
      formFields: {
        email: '',
        address: ''
      },
      isOpen: false,
      errors: {}
    };

    const newFields = {
      email: 'loremipsum@gmail.com',
      address: 'Makati'
    };

    const expectedState = {
      formFields: newFields,
      isOpen: false,
      errors: {}
    };

    const action = actions.updatePolicyHolderFields(newFields, {});
    const newState = policyHolderReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should update when moving to another step', () => {
    const ORIGINAL_STATE = {
      originalState: true
    };

    const getAction = (pathname) => {
      return {
        type: types.LOCATION_CHANGE,
        payload: {
          pathname: pathname
        }
      };
    };

    expect(policyHolderReducer(ORIGINAL_STATE, getAction(paths.INDEX)))
      .to.deep.equal(initialState.policyHolder);
    expect(policyHolderReducer(ORIGINAL_STATE, getAction(paths.PLAN_SELECTION)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(policyHolderReducer(ORIGINAL_STATE, getAction(paths.CUSTOMER_DETAILS)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(policyHolderReducer(ORIGINAL_STATE, getAction(paths.SUMMARY_DETAILS)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(policyHolderReducer(ORIGINAL_STATE, getAction(paths.PAYMENT)))
      .to.deep.equal(ORIGINAL_STATE);
    expect(policyHolderReducer(ORIGINAL_STATE, getAction(paths.PAYMENT_CONFIRMATION)))
      .to.deep.equal(initialState.policyHolder);
    expect(policyHolderReducer(ORIGINAL_STATE, getAction('DEFAULT')))
      .to.deep.equal(initialState.policyHolder);
  });
});
