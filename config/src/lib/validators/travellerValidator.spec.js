import { expect } from 'chai';
import os from 'object-assign';

import { validateTraveller } from './travellerValidator';
import TRAVEL_TYPES from '../../constants/travelTypes';
 
const VALID_OBJ = {
  gender: 'MALE',
  firstName: 'JOHN',
  lastName: 'DOE',
  dateOfBirth: '10/10/1980'
};

const VALID_OBJ_CHILD = os({}, VALID_OBJ, { dateOfBirth: '10/10/2005' });

const NO_GENDER  = os({}, VALID_OBJ, { gender: undefined });
const NO_GENDER_1  = os({}, VALID_OBJ, { gender: '     ' });

const NO_FIRSTNAME  = os({}, VALID_OBJ, { firstName: undefined });
const NO_FIRSTNAME_1  = os({}, VALID_OBJ, { firstName: '     ' });
const INVALID_FIRSTNAME  = os({}, VALID_OBJ, { firstName: 'John*' });

const NO_LASTNAME = os({}, VALID_OBJ, { lastName: undefined });
const NO_LASTNAME_1 = os({}, VALID_OBJ, { lastName: '     ' });
const INVALID_LASTNAME = os({}, VALID_OBJ, { lastName: 'Doe*' });

const NO_DOB = os({}, VALID_OBJ, { dateOfBirth: undefined });
const INVALID_DOB = os({}, VALID_OBJ, { dateOfBirth: 'invalid' });
const INVALID_DOB_1 = os({}, VALID_OBJ, { dateOfBirth: '01/01/2019' });
const INVALID_DOB_2 = os({}, VALID_OBJ, { dateOfBirth: '01/01/2009' });
const INVALID_DOB_3 = os({}, VALID_OBJ, { dateOfBirth: '01/01/1970' });

const PROFILE =  { startDate: '15/07/2018', travelType: 'Single Trip - One Way' };
const PLAN_ID = 'PLAN-SIN-CLA';

describe('Traveller Validator', () => {

  it('should be success - adult', () => {
    const actualErrors = validateTraveller(VALID_OBJ, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal({});
  });

  it('should be success - Single Trip - Classic - adult 18 to 85 years old', () => {
    // Same month and date of start date, 85 yo
    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/1933' }), PROFILE, true, true, PLAN_ID))
      .to.deep.equal({}); 

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/1932' }), PROFILE, true, true, PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '16/07/1932' }), PROFILE, true, true, PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/2000' }), PROFILE, true, true, PLAN_ID))
      .to.deep.equal({}); 

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/2001' }), PROFILE, true, true, PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '16/07/1999' }), PROFILE, true, true, PLAN_ID))
      .to.deep.equal({});
  });

  it('should be success - Single Trip - VIP - adult 18 to 74 years old', () => {
    const SINGLE_VIP_PLAN_ID = 'PLAN-SIN-VIP';

    // Same month and date of start date, 74 yo
    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/1944' }), PROFILE, true, true, SINGLE_VIP_PLAN_ID))
      .to.deep.equal({}); 

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/1943' }), PROFILE, true, true, SINGLE_VIP_PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidSingleVIPAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '16/07/1943' }), PROFILE, true, true, SINGLE_VIP_PLAN_ID))
      .to.deep.equal({});

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/2000' }), PROFILE, true, true, SINGLE_VIP_PLAN_ID))
      .to.deep.equal({}); 

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/2001' }), PROFILE, true, true, SINGLE_VIP_PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidSingleVIPAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '16/07/1999' }), PROFILE, true, true, 'PLAN-SIN-VIP'))
      .to.deep.equal({});
  });

  it('should be success - Annual Trip - Classic - adult 18 to 74 years old', () => {
    const ANNUAL_PROFILE = Object.assign({}, PROFILE, { travelType: TRAVEL_TYPES.ANNUAL_MULTI_TRIP });
    const ANNUAL_CLASSIC_PLAN_ID = 'PLAN-ANN-CLA';
    // Same month and date of start date. 74 yo
    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/1944' }), ANNUAL_PROFILE, true, true, ANNUAL_CLASSIC_PLAN_ID))
      .to.deep.equal({}); 

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/1943' }), ANNUAL_PROFILE, true, true, ANNUAL_CLASSIC_PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidSingleVIPAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '16/07/1943' }), ANNUAL_PROFILE, true, true, ANNUAL_CLASSIC_PLAN_ID))
      .to.deep.equal({});

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/2000' }), ANNUAL_PROFILE, true, true, ANNUAL_CLASSIC_PLAN_ID))
      .to.deep.equal({}); 

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/2001' }), ANNUAL_PROFILE, true, true, ANNUAL_CLASSIC_PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidSingleVIPAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '16/07/1999' }), ANNUAL_PROFILE, true, true, ANNUAL_CLASSIC_PLAN_ID))
      .to.deep.equal({});
  });

  it('should be success - Annual Trip - VIP - adult 18 to 74 years old', () => {
    const ANNUAL_PROFILE = Object.assign({}, PROFILE, { travelType: TRAVEL_TYPES.ANNUAL_MULTI_TRIP });
    const ANNUAL_VIP_PLAN_ID = 'PLAN-ANN-VIP';
    // Same month and date of start date. 74 yo
    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/1944' }), ANNUAL_PROFILE, true, true, ANNUAL_VIP_PLAN_ID))
      .to.deep.equal({}); 

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/1943' }), ANNUAL_PROFILE, true, true, ANNUAL_VIP_PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidSingleVIPAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '16/07/1943' }), ANNUAL_PROFILE, true, true, ANNUAL_VIP_PLAN_ID))
      .to.deep.equal({});

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/2000' }), ANNUAL_PROFILE, true, true, ANNUAL_VIP_PLAN_ID))
      .to.deep.equal({}); 

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '15/07/2001' }), ANNUAL_PROFILE, true, true, ANNUAL_VIP_PLAN_ID))
      .to.deep.equal({ 'dateOfBirth': 'invalidSingleVIPAdultDOB' });

    expect(validateTraveller(Object.assign(VALID_OBJ, { dateOfBirth: '16/07/1999' }), ANNUAL_PROFILE, true, true, ANNUAL_VIP_PLAN_ID))
      .to.deep.equal({});
  });

  it('should be success - child', () => {
    const actualErrors = validateTraveller(VALID_OBJ_CHILD, PROFILE, false);
    expect(actualErrors).to.deep.equal({});
  });

  it('should fail - all fields are empty - adult', () => {
    const expectedErrors = {
      gender: 'required',
      firstName: 'required',
      lastName: 'required',
      dateOfBirth: 'required'
    };

    const actualErrors = validateTraveller({}, PROFILE);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - all fields are empty - child', () => {
    const expectedErrors = {
      gender: 'required',
      firstName: 'required',
      lastName: 'required',
      dateOfBirth: 'required'
    };

    const actualErrors = validateTraveller({}, PROFILE, false);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no gender', () => {
    const expectedErrors = {
      gender: 'required'
    };

    const actualErrors = validateTraveller(NO_GENDER, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - gender contains all spaces', () => {
    const expectedErrors = {
      gender: 'required'
    };

    const actualErrors = validateTraveller(NO_GENDER_1, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no first name', () => {
    const expectedErrors = {
      firstName: 'required'
    };

    const actualErrors = validateTraveller(NO_FIRSTNAME, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - first name contains all spaces', () => {
    const expectedErrors = {
      firstName: 'required'
    };

    const actualErrors = validateTraveller(NO_FIRSTNAME_1, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid first name', () => {
    const expectedErrors = {
      firstName: 'invalidFirstName'
    };

    const actualErrors = validateTraveller(INVALID_FIRSTNAME, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no last name', () => {
    const expectedErrors = {
      lastName: 'required'
    };

    const actualErrors = validateTraveller(NO_LASTNAME, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - last name contains all spaces', () => {
    const expectedErrors = {
      lastName: 'required'
    };

    const actualErrors = validateTraveller(NO_LASTNAME_1, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid last name', () => {
    const expectedErrors = {
      lastName: 'invalidLastName'
    };

    const actualErrors = validateTraveller(INVALID_LASTNAME, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no date of birth', () => {
    const expectedErrors = {
      dateOfBirth: 'required'
    };

    const actualErrors = validateTraveller(NO_DOB, PROFILE);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid date of birth', () => {
    const expectedErrors = {
      dateOfBirth: 'incorrectDateFormat'
    };

    const actualErrors = validateTraveller(INVALID_DOB, PROFILE);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - date of birth in the future', () => {
    const expectedErrors = {
      dateOfBirth: 'invalidAdultDOB'
    };

    const actualErrors = validateTraveller(INVALID_DOB_1, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - adult is too young', () => {
    const expectedErrors = {
      dateOfBirth: 'invalidAdultDOB'
    };

    const actualErrors = validateTraveller(INVALID_DOB_2, PROFILE, true, true, PLAN_ID);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - child is too old', () => {
    const expectedErrors = {
      dateOfBirth: 'invalidChildDOB'
    };

    const actualErrors = validateTraveller(INVALID_DOB_3, PROFILE, false);
    expect(actualErrors).to.deep.equal(expectedErrors);
  });
});
