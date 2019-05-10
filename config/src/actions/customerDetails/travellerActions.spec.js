import { expect } from 'chai';
import configuredMockStore from 'redux-mock-store';
import * as types from '../../constants/actionTypes';
import * as travellerActions from './travellerActions';

describe('Traveller Actions', () => {

  it('should call TRAVELLER_FORM_INIT action', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const numberOfAdult = "1";
    const numberOfChildren = "0";
    const EXPECTED_PAYLOAD = { numberOfAdult, numberOfChildren };
    const EXPECTED_ACTION = { type: types.TRAVELLER_FORM_INIT, payload: EXPECTED_PAYLOAD };

    store.dispatch(travellerActions.initializeTravellerForms(numberOfAdult, numberOfChildren));

    const actions = store.getActions();

    expect(actions[0]).to.deep.equal(EXPECTED_ACTION);
  });

  it('should call TRAVELLER_FORM_UPDATE_FIELDS action', () => {
    const mockStore = configuredMockStore();
    const store = mockStore({});

    const travellerIndex = 1;
    const newFields = {
      firstName: 'Juan',
      lastName: 'Dela Cruz'
    };

    const EXPECTED_PAYLOAD = {
      travellerIndex,
      formFields: newFields,
      errors: {}
    };
    const EXPECTED_ACTION = { type: types.TRAVELLER_FORM_UPDATE_FIELDS, payload: EXPECTED_PAYLOAD };

    store.dispatch(travellerActions.updateTravellerFields(travellerIndex, newFields, {}));

    const actions = store.getActions();
    expect(actions[0]).to.deep.equal(EXPECTED_ACTION);
  });

});
