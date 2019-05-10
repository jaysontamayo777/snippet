import { expect } from 'chai';
import moment from 'moment';
import _ from 'lodash';

import RULES from '../../constants/rules';
import validateProfile from './profileValidator';

const VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY = {
  travelType: 'Single Trip - One Way',
  startDate: moment().format(RULES.DATE_FORMAT),
  endDate: moment().add(5, 'days').format(RULES.DATE_FORMAT),
  isFamily: true,
  numberOfAdults: 2,
  numberOfMainInsured: 1,
  numberOfSpouse: 1,
  numberOfChildren: 2,
  currency: 'PHP',
  channel: 'Direct',
  promoCode: ''
};

const VALID_OBJECT_WITH_ANNUAL_TRIP = {
  travelType: 'Annual - Multi Trip',
  startDate: moment().format(RULES.DATE_FORMAT),
  endDate: moment().add(5, 'days').format(RULES.DATE_FORMAT),
  isFamily: false,
  numberOfAdults: 1,
  numberOfMainInsured: 1,
  numberOfSpouse: 0,
  numberOfChildren: 0,
  currency: 'PHP',
  channel: 'Direct',
  promoCode: ''
};

describe('Profile Validator', () => {
  it('should return no errors', () => {
    const result = validateProfile(VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY);
    expect(result).to.deep.equal({});
  });

  describe('Travel Type', () => {
    it('should accept "Single Trip - One Way"', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { travelType: 'Single Trip - One Way' });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should accept "Single Trip - With Return"', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { travelType: 'Single Trip - With Return' });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should accept "Annual - Multi Trip"', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        travelType: 'Annual - Multi Trip',
        endDate: moment(VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY.startDate, RULES.DATE_FORMAT)
          .add(RULES.TRAVEL_INSURANCE.YEAR_LENGTH, 'days')
          .format(RULES.DATE_FORMAT)
      });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should reject empty value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { travelType:  '' });
      expect(validateProfile(profile)).to.deep.equal({
        travelType: 'required'
      });
    });

    it('should reject invalid value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { travelType:  'SOMETHING' });
      expect(validateProfile(profile)).to.deep.equal({
        travelType: 'invalidTravelType'
      });
    });
  });

  describe('Start Date', () => {
    it('should accept Date now', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { startDate: moment().format(RULES.DATE_FORMAT) });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should reject before Date now', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        startDate: moment().add(-1, 'days').format(RULES.DATE_FORMAT)
      });
      expect(validateProfile(profile)).to.deep.equal({
        startDate: 'invalidStartDate'
      });
    });

    it('should reject empty value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        startDate: ''
      });
      expect(validateProfile(profile)).to.deep.equal({
        startDate: 'required'
      });
    });

    it('should reject invalid value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        startDate: 'SOMETHING'
      });
      expect(validateProfile(profile)).to.deep.equal({
        startDate: 'incorrectDateFormat'
      });
    });

    it('should reject if days greater than 90 days from current days to start date of travel', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        startDate: moment().add(92, 'days').format(RULES.DATE_FORMAT),
        endDate: moment().add(96, 'days').format(RULES.DATE_FORMAT)
      });
      expect(validateProfile(profile)).to.deep.equal({
        startDate: 'startDateOverLimit'
      });
    });
  });

  describe('End Date', () => {
    it('should accept Date now', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { endDate: moment().format(RULES.DATE_FORMAT) });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should reject before Start date', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        endDate: moment(VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY.startDate, RULES.DATE_FORMAT)
          .add(-1, 'days')
          .format(RULES.DATE_FORMAT)
      });
      expect(validateProfile(profile)).to.deep.equal({
        endDate: 'invalidEndDate'
      });
    });

    it('should reject "Single Trip - One Way" and exceeded 7 days from start date', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        endDate: moment(VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY.startDate, RULES.DATE_FORMAT)
          .add(8, 'days')
          .format(RULES.DATE_FORMAT),
        travelType: 'Single Trip - One Way'
      });
      expect(validateProfile(profile)).to.deep.equal({
        endDate: 'endDateOverLimit'
      });
    });

    it('should reject "Single Trip - With Return" and exceeded 184 days from start date', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        endDate: moment(VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY.startDate, RULES.DATE_FORMAT)
          .add(185, 'days')
          .format(RULES.DATE_FORMAT),
        travelType: 'Single Trip - With Return'
      });
      expect(validateProfile(profile)).to.deep.equal({
        endDate: 'endDateOverLimit'
      });
    });

    it('should reject "Annual - Multi Trip" and not equal to 1 year', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        endDate: moment(VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY.startDate, RULES.DATE_FORMAT)
          .add(1, 'years')
          .add(1, 'days')
          .format(RULES.DATE_FORMAT),
        travelType: 'Annual - Multi Trip'
      });
      expect(validateProfile(profile)).to.deep.equal({
        endDate: 'invalidAnnualEndDate'
      });
    });

    it('should reject empty value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        endDate: ''
      });
      expect(validateProfile(profile)).to.deep.equal({
        endDate: 'required'
      });
    });

    it('should reject invalid value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        endDate: 'SOMETHING'
      });
      expect(validateProfile(profile)).to.deep.equal({
        endDate: 'incorrectDateFormat'
      });
    });
  });

  describe('Is Family', () => {
    it('should accept TRUE input', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { isFamily: true });
      expect(validateProfile(profile)).to.deep.equal({});
    });
  });

  describe('Number of Adults', () => {
    it('should accept 2 as valid input', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { numberOfAdults: 2 });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should reject value if not equal to sum of numberOfMainInsured and numberOfSpouse', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfAdults: 2,
        numberOfMainInsured: 1,
        numberOfSpouse: 0
      });
      expect(validateProfile(profile).numberOfAdults).to.equal('invalidNumberOfAdult');
    });

    it('should reject value if "isFamily" true and value more than 2', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfAdults: 3,
        numberOfMainInsured: 2,
        numberOfSpouse: 1,
        isFamily: true
      });
      expect(validateProfile(profile)).to.deep.equal({
        numberOfAdults: 'invalidNumberOfAdult'
      });
    });

    it('should reject value if "isFamily" false and value more than 9', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfAdults: 10,
        numberOfSpouse: 0,
        numberOfChildren: 0,
        isFamily: false
      });
      expect(validateProfile(profile)).to.deep.equal({
        numberOfAdults: 'invalidNumberOfAdult'
      });
    });

    it('should reject empty value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfAdults: ''
      });
      expect(validateProfile(profile)).to.deep.equal({
        numberOfAdults: 'invalidNumberOfAdult'
      });
    });

    it('should reject invalid value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfAdults: 'SOMETHING'
      });
      expect(validateProfile(profile)).to.deep.equal({
        numberOfAdults: 'invalidNumberOfAdult'
      });
    });

    it('should fail if travel type is annual, dont have family and number of adult more than 1', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_ANNUAL_TRIP, {
        endDate: moment(VALID_OBJECT_WITH_ANNUAL_TRIP.startDate, RULES.DATE_FORMAT)
          .add(RULES.TRAVEL_INSURANCE.YEAR_LENGTH, 'days')
          .format(RULES.DATE_FORMAT),
        travelType: 'Annual - Multi Trip',
        numberOfAdults: 2
      });
      expect(validateProfile(profile)).to.deep.equal({
        numberOfAdults: 'invalidNumberOfAdult'
      });
    });

    it('should pass if travel type is annual, dont have family and number of adult is equal to 1 ', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_ANNUAL_TRIP, {
        endDate: moment(VALID_OBJECT_WITH_ANNUAL_TRIP.startDate, RULES.DATE_FORMAT)
          .add(RULES.TRAVEL_INSURANCE.YEAR_LENGTH, 'days')
          .format(RULES.DATE_FORMAT),
        travelType: 'Annual - Multi Trip'
      });
      expect(validateProfile(profile)).to.deep.equal({});
    });
  });

  describe('Number of Main Insured', () => {
    it('should accept 1 as valid input', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, { numberOfMainInsured: 1 });
      expect(validateProfile(profile)).to.deep.equal({});
    });
  });

  describe('Number of Spouse', () => {
    it('should accept 0 as valid input', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfAdults: 1,
        numberOfSpouse: 0
      });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should accept 1 as valid input if numberOfAdults is 2', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfAdults: 2,
        numberOfMainInsured: 1,
        numberOfSpouse: 1
      });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should reject 1 as valid input if numberOfAdults is 2 and isFamily is false', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfAdults: 2,
        numberOfMainInsured: 1,
        numberOfSpouse: 1,
        isFamily: false
      });
      expect(validateProfile(profile).numberOfSpouse).to.equal('invalidNumberOfSpouse');
    });
  });

  describe('Number of Children', () => {
    it('should accept 0 as valid input if isFamily = true', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfChildren: 0,
        isFamily: true
      });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should accept 1 as valid input if isFamily = true', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfChildren: 1,
        isFamily: true
      });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should reject more than 4 as input if isFamily = true', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfChildren: 5,
        isFamily: true
      });
      expect(validateProfile(profile)).to.deep.equal({
        numberOfChildren: 'invalidNumberOfChildren'
      });
    });

    it('should reject more than 0 as input if isFamily = false ', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        numberOfChildren: 1,
        isFamily: false
      });
      expect(validateProfile(profile).numberOfChildren).to.equal('invalidNumberOfChildren');
    });
  });

  describe('Currency', () => {
    it('should accept PHP as valid', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        currency: 'PHP'
      });
      expect(validateProfile(profile)).to.deep.equal({});
    });

    it('should reject empty value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        currency: ''
      });
      expect(validateProfile(profile)).to.deep.equal({
        currency: 'required'
      });
    });

    it('should accept invalid value', () => {
      const profile = _.assign({}, VALID_OBJECT_WITH_SINGLE_TRIP_AND_FAMILY, {
        currency: 'SOMETHING'
      });
      expect(validateProfile(profile)).to.deep.equal({
        currency: 'invalidCurrency'
      });
    });
  });
});
