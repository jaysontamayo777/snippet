import { expect } from 'chai';
import os from 'object-assign';

import { validatePolicyHolder } from './policyHolderValidator';

const VALID_SINGLE_TRIP_PROFILE_OBJ = {
  gender: 'male',
  firstName: 'JOHN',
  lastName: 'DOE',
  dateOfBirth: '10/10/1980',
  address: '123 ABC',
  address2: '123 ABC',
  address3: '123 ABC',
  district: 'ABC',
  email: 'testuser@example.com',
  confirmEmail: 'testuser@example.com',
  phoneNumber: '12345678'
};

const VALID_EMAIL = ['axa.com.hk', 'axa-cs.com', 'axa-tech.com', 'axa-im.com', 'axa-hm.com', 'axa-assistance.com.hk', 'axaxl.com'];

const NO_FIRSTNAME = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { firstName: undefined });
const INVALID_FIRSTNAME = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { firstName: 'John*' });
const NO_LASTNAME = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { lastName: undefined });
const INVALID_LASTNAME = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { lastName: 'Doe*' });
const NO_DOB = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { dateOfBirth: undefined });
const INVALID_DOB = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { dateOfBirth: 'invalid' });
const NO_EMAIL = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: undefined });
const INVALID_EMAIL = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: 'test@example' });
const NO_CONFIRM_EMAIL = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { confirmEmail: undefined });
const INVALID_CONFIRM_EMAIL = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { confirmEmail: 'test@example' });
const CONFIRM_EMAIL_NOT_MATCH = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { confirmEmail: 'test@example.com' });
const VALID_STAFF_EMAIL_1 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: 'test@axa.com.hk', confirmEmail: 'test@axa.com.hk' });
const VALID_STAFF_EMAIL_2 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: 'test@axa-cs.com', confirmEmail: 'test@axa-cs.com' });
const VALID_STAFF_EMAIL_3 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: 'test@axa-tech.com', confirmEmail: 'test@axa-tech.com' });
const VALID_STAFF_EMAIL_4 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: 'test@axa-im.com', confirmEmail: 'test@axa-im.com' });
const VALID_STAFF_EMAIL_5 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: 'test@axa-hm.com', confirmEmail: 'test@axa-hm.com' });
const VALID_STAFF_EMAIL_6 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: 'test@axa-assistance.com.hk', confirmEmail: 'test@axa-assistance.com.hk' });
const INVALID_STAFF_EMAIL = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { email: 'test@axa-assistance.com.us', confirmEmail: 'test@axa-assistance.com.us' });
const NO_PHONE = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { phoneNumber: undefined });
const NO_PHONE_1 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { phoneNumber: '      ' });
const INVALID_PHONE = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { phoneNumber: '123phone' });
const NO_DISTRICT = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { district: undefined });
const INVALID_DISTRICT = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { district: 'Abc*' });
const NO_ADDRESS = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address: undefined });
const NO_ADDRESS_1 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address: '     ' });
const INVALID_ADDRESS = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address: '123 abc *' });
const VALID_ADDRESS = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address: '123 ABC, ./&()-:' });

const INVALID_ADDRESS_2 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address2: '123 abc *' });
const VALID_ADDRESS_2 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address2: '123 ABC, ./&()-:' });
const INVALID_ADDRESS_3 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address3: '123 abc *' });
const VALID_ADDRESS_3 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address3: '123 ABC, ./&()-:' });
const NO_ADDRESS_2 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address2: '' });
const NO_ADDRESS_3 = os({}, VALID_SINGLE_TRIP_PROFILE_OBJ, { address3: '' });

const PROFILE =  { startDate: '01/04/2017', dateOfBirth:'10/10/1980', travelType: 'Single Trip - One Way', address: '123 abc', address2: 'abc', address3: 'abc' };
const PROFILE_SINGLE_TRIP = os({}, PROFILE, { travelType: 'Single Trip - One Way' });
const PROFILE_ANNUAL_TRIP = os({}, PROFILE, { travelType: 'Annual - Multi Trip' });
const PROFILE_CHANNEL_STAFF = os({}, PROFILE, { channel: 'Staff' });

const PLAN_ID = 'PLN-SIN-CLA';

describe('PolicyHolder Validator', () => {

  it('should be success', () => {
    const actualErrors = validatePolicyHolder({ fields: VALID_SINGLE_TRIP_PROFILE_OBJ, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal({});
  });

  it('should fail - all fields are empty - profile single trip', () => {
    const expectedErrors = {
      gender: 'required',
      firstName: 'required',
      lastName: 'required',
      dateOfBirth: 'required',
      email: 'required',
      confirmEmail: 'required',
      phoneNumber: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields:{}, profile: PROFILE_SINGLE_TRIP, isTraveller: true, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no first name', () => {
    const expectedErrors = {
      firstName: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_FIRSTNAME, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid first name', () => {
    const expectedErrors = {
      firstName: 'invalidFirstName'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_FIRSTNAME, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no last name', () => {
    const expectedErrors = {
      lastName: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_LASTNAME, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid last name', () => {
    const expectedErrors = {
      lastName: 'invalidLastName'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_LASTNAME, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no date of birth', () => {
    const expectedErrors = {
      dateOfBirth: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_DOB, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid date of birth', () => {
    const expectedErrors = {
      dateOfBirth: 'incorrectDateFormat'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_DOB, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no email', () => {
    const expectedErrors = {
      email: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_EMAIL, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid email', () => {
    const expectedErrors = {
      confirmEmail: 'emailDoNotMatch',
      email: 'invalidEmail'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_EMAIL, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid staff email', () => {
    const expectedErrors = {
      email: 'invalidStaffEmail'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_STAFF_EMAIL, profile: PROFILE_CHANNEL_STAFF, planId: PLAN_ID, valid_staff_email: VALID_EMAIL  });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should pass - valid staff email 1', () => {
    const expectedErrors = {};

    const actualErrors = validatePolicyHolder({ fields: VALID_STAFF_EMAIL_1, profile: PROFILE_CHANNEL_STAFF, planId: PLAN_ID, valid_staff_email: VALID_EMAIL });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should pass - valid staff email 2', () => {
    const expectedErrors = {};

    const actualErrors = validatePolicyHolder({ fields: VALID_STAFF_EMAIL_2, profile: PROFILE_CHANNEL_STAFF, planId: PLAN_ID, valid_staff_email: VALID_EMAIL });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should pass - valid staff email 3', () => {
    const expectedErrors = {};

    const actualErrors = validatePolicyHolder({ fields: VALID_STAFF_EMAIL_3, profile: PROFILE_CHANNEL_STAFF, planId: PLAN_ID, valid_staff_email: VALID_EMAIL });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should pass - valid staff email 4', () => {
    const expectedErrors = {};

    const actualErrors = validatePolicyHolder({ fields: VALID_STAFF_EMAIL_4, profile: PROFILE_CHANNEL_STAFF, planId: PLAN_ID, valid_staff_email: VALID_EMAIL });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should pass - valid staff email 5', () => {
    const expectedErrors = {};

    const actualErrors = validatePolicyHolder({ fields: VALID_STAFF_EMAIL_5, profile: PROFILE_CHANNEL_STAFF, planId: PLAN_ID, valid_staff_email: VALID_EMAIL });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should pass - valid staff email 6', () => {
    const expectedErrors = {};

    const actualErrors = validatePolicyHolder({ fields: VALID_STAFF_EMAIL_6, profile: PROFILE_CHANNEL_STAFF, planId: PLAN_ID, valid_staff_email: VALID_EMAIL });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no confirm email', () => {
    const expectedErrors = {
      confirmEmail: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_CONFIRM_EMAIL, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid confirm email', () => {
    const expectedErrors = {
      confirmEmail: 'invalidEmail'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_CONFIRM_EMAIL, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - do not match confirm email to email', () => {
    const expectedErrors = {
      confirmEmail: 'emailDoNotMatch'
    };

    const actualErrors = validatePolicyHolder({ fields: CONFIRM_EMAIL_NOT_MATCH, profile: PROFILE, email:'test@sample.com', planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no phone number', () => {
    const expectedErrors = {
      phoneNumber: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_PHONE, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - phone number contains all spaces', () => {
    const expectedErrors = {
      phoneNumber: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_PHONE_1, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid phone number', () => {
    const expectedErrors = {
      phoneNumber: 'invalidPhoneNumber'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_PHONE, profile: PROFILE, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no district', () => {
    const expectedErrors = {
      district: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_DISTRICT, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - invalid district', () => {
    const expectedErrors = {
      district: 'invalidDistrict'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_DISTRICT, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - no address', () => {
    const expectedErrors = {
      address: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_ADDRESS, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should fail - address contains all spaces', () => {
    const expectedErrors = {
      address: 'required'
    };

    const actualErrors = validatePolicyHolder({ fields: NO_ADDRESS_1, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should pass - address2 is empty', () => {
    const actualErrors = validatePolicyHolder({ fields: NO_ADDRESS_2, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal({});
  });

  it('should pass - address3 is empty', () => {
    const actualErrors = validatePolicyHolder({ fields: NO_ADDRESS_3, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal({});
  });

  it('should fail - invalid address', () => {
    const expectedErrors = {
      address: 'invalidAddress'
    };

    const actualErrors = validatePolicyHolder({ fields: INVALID_ADDRESS, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should success - valid address - with comma, period, forward-slash, and, parantheses, stripe, colon', () => {
    const actualErrors = validatePolicyHolder({ fields: VALID_ADDRESS, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal({});
  });

  it('should fail - invalid address2', () => {
    const expectedErrors = {
      address2: 'invalidAddress'
    };
    const actualErrors = validatePolicyHolder({ fields: INVALID_ADDRESS_2, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should success - valid address2 - with comma, period, forward-slash, and, parantheses, stripe, colon', () => {
    const actualErrors = validatePolicyHolder({ fields: VALID_ADDRESS_2, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal({});
  });

  it('should fail - invalid address3', () => {
    const expectedErrors = {
      address3: 'invalidAddress'
    };
    const actualErrors = validatePolicyHolder({ fields: INVALID_ADDRESS_3, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal(expectedErrors);
  });

  it('should success - valid address3 - with comma, period, forward-slash, and, parantheses, stripe, colon', () => {
    const actualErrors = validatePolicyHolder({ fields: VALID_ADDRESS_3, profile: PROFILE_ANNUAL_TRIP, planId: PLAN_ID });
    expect(actualErrors).to.deep.equal({});
  });
});
