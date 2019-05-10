/* eslint-disable no-useless-escape, no-unused-vars */
import _ from 'lodash';
import validator from 'validator';
import moment from 'moment';

import rules from '../../constants/rules';
import code from '../../constants/errorCode';

import { getAge, isTodayYourBirthday } from '../../lib/util';
import { isValidName } from '@axa-asia/stp-field-validator-travel-agi';

// Validation rules for Policy Holder:
//
// First Name           - firstName     - required | 2 20 | A-Z, single-quote
// Last Name            - lastName      - required | 2 30 | A-Z, single-quote
// Date of Birth        - dateOfBirth
// Nationality          - nationality   - required | default "Indonesia"
// Passport Number      - passport      - required | 2 24 | A-Z , 0-9
// Country              - country       - not displayed | always "Indonesia"

const FIRSTNAME_PATTERN = /^([A-Z\'\ ]){1,20}$/;
const LASTNAME_PATTERN = /^([A-Z\'\ ]){1,30}$/;
const ID_PATTERN = /[A-Za-z]{1,2}[0-9]{6}\(?[0-9Aa]{1}\)?$/;

export function validateTraveller(fields, profile, isAdult = true, isTraveller = true, planId, isPolicyHolder = false, cb) {
  const errors = {};
  const age = getAge(fields.dateOfBirth, profile.startDate, rules.DATE_FORMAT);
  const ageOnPurchase = getAge(fields.dateOfBirth, new Date(), rules.DATE_FORMAT);
  const ageInDays = getAge(fields.dateOfBirth, profile.startDate, rules.DATE_FORMAT, 'days');
  const listOfFields = ['gender', 'firstName', 'lastName', 'dateOfBirth'];

  listOfFields.forEach(name => {
    const error = validateTravellerField(name, fields[name], age, ageOnPurchase, ageInDays, planId, isAdult, fields.dateOfBirth, profile.startDate, isPolicyHolder);

    if (error) {
      errors[name] = error;
    }
  });

  const filteredErrors = _.omitBy(errors, _.isUndefined);

  if (cb) {
    return cb(filteredErrors);
  }

  return filteredErrors;
}

export function validateTravellerField(field, value, age, ageOnPurchase, ageInDays, planId, isAdult = true, DOB, startDate, isPolicyHolder) {
  const tValue = _.trim(value).replace(/\s+/g,' ');

  switch(field) {
    case 'gender':
      if (_.isEmpty(tValue)) {
        return code.VALUE_REQUIRED;
      } else {
        return undefined;
      }

    case 'firstName':
      if (_.isEmpty(tValue)) {
        return code.VALUE_REQUIRED;
      } else if (!validator.matches(tValue, FIRSTNAME_PATTERN) || !isValidName(value)) {
        return code.INVALID_FIRST_NAME;
      } else {
        return undefined;
      }

    case 'lastName':
      if (_.isEmpty(tValue)) {
        return code.VALUE_REQUIRED;
      } else if (!validator.matches(tValue, LASTNAME_PATTERN) || !isValidName(value)) {
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

    default:
      return undefined;
  }
}
