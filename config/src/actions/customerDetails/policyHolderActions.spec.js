import { expect } from 'chai';
import configuredMockStore from 'redux-mock-store';
import * as types from '../../constants/actionTypes';
import * as policyHolderActions from './policyHolderActions';

describe('Policy Holder Actions', () => {

  it('should call POLICY_HOLDER_FORM_UPDATE_FIELD action', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const newFields = {
      firstName: 'Juan',
      lastName: 'Dela Cruz'
    };

    const EXPECTED_PAYLOAD = {
      formFields: newFields,
      errors: {}
    };

    const EXPECTED_ACTION = { type: types.POLICY_HOLDER_FORM_UPDATE_FIELDS, payload: EXPECTED_PAYLOAD };

    store.dispatch(policyHolderActions.updatePolicyHolderFields(newFields, {}));

    const actions = store.getActions();
    expect(actions[0]).to.deep.equal(EXPECTED_ACTION);
  });

});
