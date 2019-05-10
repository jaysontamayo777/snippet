import { expect } from 'chai';
import travellerDetailsReducer from './travellersReducer';
import * as actions from '../../actions/customerDetails/travellerActions';

describe('Travellers Reducer', () => {
  it('should initialize forms depending on the number of adult and child in profile ' +
    'when passed TRAVELLER_FORM_INIT', () => {
    const expectedState = [
      {
        travellerType: "adult",
        travellerTypeIndex: 0,
        formFields: {
          gender: '',
          firstName: '',
          lastName: '',
          dateOfBirth: ''
        },
        isOpen: false,
        errors: {},
        isPolicyHolder: true
      },
      {
        travellerType: "child",
        travellerTypeIndex: 0,
        formFields: {
          gender: '',
          firstName: '',
          lastName: '',
          dateOfBirth: ''
        },
        isOpen: false,
        errors: {}
      },
      {
        travellerType: "child",
        travellerTypeIndex: 1,
        formFields: {
          gender: '',
          firstName: '',
          lastName: '',
          dateOfBirth: ''
        },
        isOpen: false,
        errors: {}
      }
    ];

    const numberOfAdult = "1";
    const numberOfChildren = "2";
    const action = actions.initializeTravellerForms(numberOfAdult, numberOfChildren);
    const newState = travellerDetailsReducer([], action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should update state of form fields and set filled status when passed TRAVELLER_FORM_UPDATE_FIELDS - traveller is policy holder', () => {
    const initialState = [
      {
        formFields: {
          gender: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          email: '',
          address: '',
          address2: '',
          address3: '',
          district: '',
          confirmEmail: '',
          phoneNumber: ''
        },
        isOpen: true,
        errors: {}
      }
    ];

    const newFields = {
      gender: 'Male',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '01/01/1990',
      email: 'johndoe@email.com',
      address: '1 abc',
      address2: 'abc, abc',
      address3: 'abc, abc',
      district: 'Makati',
      confirmEmail: 'johndoe@email.com',
      phoneNumber: '09876465677'
    };

    const expectedState = [
      {
        formFields: newFields,
        isOpen: true,
        errors: {}
      }
    ];

    const formIndex = 0;
    const action = actions.updateTravellerFields(formIndex, newFields, {});
    const newState = travellerDetailsReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });

  it('should update state of form fields and set filled status when passed TRAVELLER_FORM_UPDATE_FIELDS - traveller is NOT policy holder', () => {
    const initialState = [
      {
        formFields: {
          gender: '',
          firstName: '',
          lastName: '',
          dateOfBirth: '',
          email: '',
          address: '',
          address2: '',
          address3: '',
          district: '',
          confirmEmail: '',
          phoneNumber: ''
        },
        isOpen: true,
        errors: {}
      }
    ];

    const newFields = {
      gender: 'Male',
      firstName: 'John',
      lastName: 'Doe',
      dateOfBirth: '01/01/1990',
      email: 'johndoe@email.com',
      address: '1 abc',
      address2: 'abc, abc',
      address3: 'abc, abc',
      district: 'Makati',
      confirmEmail: 'johndoe@email.com',
      phoneNumber: '09876465677'
    };

    const expectedState = [
      {
        formFields: newFields,
        isOpen: true,
        errors: {}
      }
    ];

    const formIndex = 0;
    const action = actions.updateTravellerFields(formIndex, newFields, {});
    const newState = travellerDetailsReducer(initialState, action);

    expect(newState).to.deep.equal(expectedState);
  });
});
