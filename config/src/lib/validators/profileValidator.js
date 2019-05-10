import { quotationDetailsTravelValidator } from '@axa-asia/ecommerce-field-validator-ph';
import TRAVEL_TYPES from '../../constants/travelTypes';

/**
 * Implements the business rules for profiling. 'promoCode' will not
 * be validated since it's an optional field while 'channel' will have
 * a default value of 'Direct' so it will never be empty.
 *
 * @param {Object} profile
 * Object that contains all the answers for profiling questions
 * from front-end.
 */
export default function validateProfile(profile) {
  let errors = {};

  const {
    startDate,
    endDate,
    numberOfAdults,
    numberOfChildren,
    coverage,
    origin,
    destinations
  } = profile;

  const isValidTravelStartDate = quotationDetailsTravelValidator.isValidTravelStartDate(startDate);
  const isValidTravelEndDate = quotationDetailsTravelValidator.isValidTravelEndDate(
    coverage,
    startDate,
    endDate
  );
  const isValidCoverage = quotationDetailsTravelValidator.isValidCoverage(coverage);
  const isValidOrigin = coverage === TRAVEL_TYPES.SINGLE_TRIP 
    ? quotationDetailsTravelValidator.isValidOriginForSingleTrip(origin[0])
    : quotationDetailsTravelValidator.isValidOriginForAnnualMultitrip(origin[0]);
  const isValidDestinations = coverage === TRAVEL_TYPES.SINGLE_TRIP &&
    !quotationDetailsTravelValidator.isValidDestinationsForSingleTrip(destinations);
  const isValidAdults = quotationDetailsTravelValidator.isValidNumberOfAdults(numberOfAdults);
  let isValidChild;

  errors.startDate = isValidTravelStartDate.error && isValidTravelStartDate.message;
  errors.endDate = isValidTravelEndDate.error && isValidTravelEndDate.message;
  errors.coverage = isValidCoverage.error && isValidCoverage.message;
  errors.origin = isValidOrigin.error && isValidOrigin.message;
  errors.destinations = isValidDestinations.error && isValidDestinations.message;

  errors.numberOfAdults = isValidAdults.error && isValidAdults.message;

  if (numberOfChildren > 0) {
    isValidChild = quotationDetailsTravelValidator.isValidNumberOfChildren(
      numberOfChildren
    );
    errors.numberOfChildren = isValidChild.error && isValidChild.message;
  }

  // delete error[key] if value is false
  // only return errors that has messages
  Object.keys(errors).forEach((key) => {
    const obj = errors[key];
    if (!obj) {
      delete errors[key];
    }
  });

  return errors;
}
