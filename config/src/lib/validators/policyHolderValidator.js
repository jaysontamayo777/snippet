/* eslint-disable no-useless-escape */
import validator from 'validator';
import _ from 'lodash';

import code from '../../constants/errorCode';

import { isValidAddress, isValidName } from '@axa-asia/stp-field-validator-travel-agi';
import rules from "../../constants/rules";
import moment from "moment/moment";

import { getAge, isTodayYourBirthday } from '../../lib/util';

// Validation rules for Policy Holder:
//
// First Name           - firstName     - required | 2 50 | A-Z, single-quote
// Last Name            - lastName      - required | 2 50 | A-Z, single-quote
// Date of Birth        - dateOfBirth
// Nationality          - nationality   - required | default "Indonesia"
// Passport Number      - passport      - required | 2 24 | A-Z , 0-9
// KITAS                - kitas         - required if "Nationality" != "Indonesia" | 2 24 | A-Z , 0-9
// Mobile Phone         - phoneNumber   - required | 2 16 numbers, spaces, stripes (-), plus (+)
// Email                - email         - required | 2 40 | email-format
// Address              - address       - required | 2 40 | A-Z , 0-9
// State                - state         - required | from list of state
// City/Town            - city          - required | from list of city
// Postal Code          - postalCode    - required | Numeric | 5 5
// Country              - country       - not displayed | always "Indonesia"

/**
 *
 * @param {Object} params
 * @returns {Object}
 * Object that contains: field, profile, email
 */
export function validatePolicyHolder(params) {
  const { fields, profile, planId } = params;
  const errors = {};
  const age = getAge(fields.dateOfBirth, profile.startDate, rules.DATE_FORMAT);
  const ageOnPurchase = getAge(fields.dateOfBirth, new Date(), rules.DATE_FORMAT);
  const ageInDays = getAge(fields.dateOfBirth, profile.startDate, rules.DATE_FORMAT, 'days');
  const channel = _.upperCase(profile.channel);
  const travelType = profile.travelType;
  const singleTripList = ['gender','firstName','lastName','dateOfBirth','email','confirmEmail','phoneNumber'];
  const annualTripList = ['gender','firstName','lastName','dateOfBirth','email','confirmEmail','phoneNumber','address','address2','address3','district'];
  const tripList = ["Single Trip - One Way","Single Trip - With Return"].indexOf(profile.travelType) > -1 ? singleTripList : annualTripList;

  tripList.forEach(name => {
    const error = validatePolicyHolderField({ ...params, name, value: fields[name], age, ageOnPurchase, ageInDays, channel, travelType, planId, email: fields.email,
      startDate: profile.startDate, DOB: fields.dateOfBirth });
    if (error) {
      errors[name] = error;
    }
  });

  return _.omitBy(errors, _.isUndefined);
}

export function validatePolicyHolderField( params ) {
  const { channel, name, value, age, ageOnPurchase, ageInDays, email, isAdult = true, planId, valid_staff_email = [], startDate, DOB, isPolicyHolder } = params;

  const ADDRESS_PATTERN = /^([A-Z0-9\ \.\,\/\&\(\)\-\:]){2,40}$/;
  const ADDRESS_LENGTH_LIMIT = 28;
  const DISTRICT_PATTERN = /^([A-Za-z\ ]){2,20}$/;
  const FIRSTNAME_PATTERN = /^([A-Z\'\ ]){1,20}$/;
  const LASTNAME_PATTERN = /^([A-Z\'\ ]){1,30}$/;
  const PHONE_PATTERN = /^([0-9\+\-\ ]){8,16}$/;
  const EMAIL_MAX_LENGTH = 40;
  const STAFF_EMAIL_PATTERN = new RegExp("^[\\w-\\.]+@(" + (valid_staff_email || []).join('|').toUpperCase() + ")$");

  switch(name) {

    case 'gender':
      if (_.isEmpty(value)) {
        return code.VALUE_REQUIRED;
      } else {
        return undefined;
      }

    case 'firstName':
      if (_.isEmpty(value)) {
        return code.VALUE_REQUIRED;
      } else if (!validator.matches(value, FIRSTNAME_PATTERN) || !isValidName(value)) {
        return code.INVALID_FIRST_NAME;
      } else {
        return undefined;
      }

    case 'lastName':
      if (_.isEmpty(value)) {
        return code.VALUE_REQUIRED;
      } else if (!validator.matches(value, LASTNAME_PATTERN) || !isValidName(value)) {
        return code.INVALID_LAST_NAME;
      } else {
        return undefined;
      }

    // case 'dateOfBirth':
    //   if (_.isEmpty(value)) {
    //     return code.VALUE_REQUIRED;

    //   } else if (!moment(value, rules.DATE_FORMAT, true).isValid()) {
    //     return code.INCORRECT_DATE;
      
    //   // PolicyHolder should be 18 during the day of purchase
    //   } else if (isPolicyHolder &&  ageOnPurchase < rules.MIN_AGE_ADULT) {
    //     return code.INVALID_ADULT_DOB;

    //   // Adult, Single Classic plan should be 18 to 85 yo
    //   } else if (isAdult && planId.includes('SIN-CLA') && (age < rules.MIN_AGE_ADULT || age > rules.MAX_AGE_ADULT_SINGLE_CLASSIC)) {
    //     return code.INVALID_ADULT_DOB;
      
    //   // Adult, Single Classic plan should be 18 to 85 yo, should not consider 85 yo and (N+) days
    //   } else if (isAdult && planId.includes('SIN-CLA') && age === rules.MAX_AGE_ADULT_SINGLE_CLASSIC && !isTodayYourBirthday(DOB, startDate)) {
    //     return code.INVALID_ADULT_DOB;

    //   // Adult, any kind of plan (not Single Classic) should be 18 to 75 yo
    //   } else if (isAdult && ! planId.includes('SIN-CLA') && (age < rules.MIN_AGE_ADULT || age > rules.MAX_AGE_ADULT)) {
    //     // Modify this message if need, using this variable for now since message is just the same
    //     // return code.INVALID_SINGLE_VIP_ADULT_DOB;
      
    //   // Child for kind of plan should be 30 days to 17 yo      
    //   } else if(!isAdult && (ageInDays < rules.MIN_AGE_CHILD_DAYS || age > rules.MAX_AGE_CHILD)) {
    //     return code.INVALID_CHILD_DOB;

    //   } else {
    //     return undefined;
    //   }

    case 'phoneNumber':
      const tPhoneNumber = _.trim(value);

      if (_.isEmpty(tPhoneNumber)) {
        return code.VALUE_REQUIRED;
      } else if (!validator.matches(tPhoneNumber, PHONE_PATTERN)) {
        return code.INVALID_PHONE_NUMBER;
      } else {
        return undefined;
      }

    case 'email':
      if (_.isEmpty(value)) {
        return code.VALUE_REQUIRED;
      } else if (!validator.isEmail(value)) {
        return code.INVALID_EMAIL;
      } else if (value.length > EMAIL_MAX_LENGTH) {
        return code.EMAIL_TOO_LONG;
      } else if (channel === "STAFF" && !validator.matches(_.toUpper(value), STAFF_EMAIL_PATTERN)) {
        return code.INVALID_STAFF_EMAIL;
      } else {
        return undefined;
      }

    case 'confirmEmail':
      if (_.isEmpty(value)) {
        return code.VALUE_REQUIRED;
      } else if (!validator.isEmail(value)) {
        return code.INVALID_EMAIL;
      } else if (value.length > EMAIL_MAX_LENGTH) {
        return code.EMAIL_TOO_LONG;
      } else if (email && value !== email) {
        return code.EMAIL_NOT_MATCH;
      } else {
        return undefined;
      }

    case 'address':
      const tAddress = _.trim(value).replace(/\s+/g,' ');
      if (_.isEmpty(tAddress)) {
        return code.VALUE_REQUIRED;
      } else if (value.length > ADDRESS_LENGTH_LIMIT) {
        return code.ADDRESS_TOO_LONG;
      } else if (!validator.matches(tAddress, ADDRESS_PATTERN) || !isValidAddress(tAddress)) {
        return code.INVALID_ADDRESS;
      } else {
        return undefined;
      }

    case 'address2':
      const tAddress2 = _.trim(value).replace(/\s+/g,' ');
      if ( !_.isEmpty(tAddress2) && (!validator.matches(tAddress2, ADDRESS_PATTERN) || !isValidAddress(tAddress2))) {
        return code.INVALID_ADDRESS;
      } else if (value.length > ADDRESS_LENGTH_LIMIT) {
        return code.ADDRESS_TOO_LONG;
      } else {
        return undefined;
      }

    case 'address3':
      const tAddress3 = _.trim(value).replace(/\s+/g,' ');
      if ( !_.isEmpty(tAddress3) && (!validator.matches(tAddress3, ADDRESS_PATTERN) || !isValidAddress(tAddress3))) {
        return code.INVALID_ADDRESS;
      } else if (value.length > ADDRESS_LENGTH_LIMIT) {
        return code.ADDRESS_TOO_LONG;
      } else {
        return undefined;
      }

    case 'district':
      if (_.isEmpty(value)) {
        return code.VALUE_REQUIRED;
      } else if (!validator.matches(value, DISTRICT_PATTERN)) {
        return code.INVALID_DISTRICT;
      } else {
        return undefined;
      }
    
    default:
      return undefined;
  }
}
