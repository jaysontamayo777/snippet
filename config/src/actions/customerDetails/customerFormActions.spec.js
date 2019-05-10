import { expect } from 'chai';
import configuredMockStore from 'redux-mock-store';
import * as types from '../../constants/actionTypes';
import * as customerFormActions from './customerFormActions';

describe('Customer Details Actions', () => {
  it('should call GO_TO_NEXT_FORM action', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const EXPECTED_ACTION = { type: types.GO_TO_NEXT_FORM };

    store.dispatch(customerFormActions.goToNextForm());

    const actions = store.getActions();
    expect(actions[0]).to.deep.equal(EXPECTED_ACTION);
  });

  it('should call GO_TO_SELECTED_FORM action', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const EXPECTED_PAYLOAD = {
      selectedFormIndex: 1
    };

    const EXPECTED_ACTION = { type: types.GO_TO_SELECTED_FORM, payload: EXPECTED_PAYLOAD };

    store.dispatch(customerFormActions.goToSelectedForm(1));

    const actions = store.getActions();
    expect(actions[0]).to.deep.equal(EXPECTED_ACTION);
  });
});
