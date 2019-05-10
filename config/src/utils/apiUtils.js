import _ from 'lodash';
import travellerTypes from '../constants/travellerTypes';
import { OCCUPATIONS } from '../constants/occupations';

//User Agent
import browser from 'browser-detect';

/**
 * Function to send profiling information to Quotation module.
 *
 * @param {Object} profile
 * Object that contains all profiling questions and values.
 *
 * @param {Object} selection
 * Object that should have the productId, planId and addOnIds (Array[String])
 */
export const getProfile = (profile, selection) => {
  return {
    profile: {
      coverage: profile.coverage,
      numberOfAdults: profile.numberOfAdults,
      numberOfChildren: profile.numberOfChildren || 0,
      promoCode: profile.promoCode,
      destinations: profile.destinations,
      origin: profile.origin[0] || {},
      startDate: profile.startDate,
      endDate: profile.endDate,
      currency: profile.currency
    },
    selection: {
      productId: selection.productId || '',
      planId: selection.planId || ''
    }
  };
};

/**
 * Constructs the fields for Policy Holder needed for processing
 *
 * @param {Object} policyHolderFields
 * Object from redux for policy holder
 */
const getPolicyHolderFieldValues = travellers => {
  const policyHolder = travellers.filter(
    traveller => traveller.isPolicyHolder === true
  );
  const policyHolderFields = policyHolder[0].formFields;
  const occupation = _.find(OCCUPATIONS, occ => {
    return occ.position === policyHolderFields.occupation;
  });

  return {
    firstName: policyHolderFields.firstName,
    lastName: policyHolderFields.lastName,
    middleInitial: policyHolderFields.middleInitial,
    gender: policyHolderFields.gender,
    dateOfBirth: policyHolderFields.dateOfBirth,
    occupation: policyHolderFields.occupation,
    occupationCode: _.get(occupation, 'code'),
    idType: policyHolderFields.idType,
    idNumber: policyHolderFields.idNumber,
    email: policyHolderFields.emailAddress,
    phoneNumber: policyHolderFields.contactNumber,
    address: policyHolderFields.address,
    beneficiary: {
      firstName: policyHolderFields.beneficiary.firstName,
      lastName: policyHolderFields.beneficiary.lastName,
      middleInitial: policyHolderFields.beneficiary.middleInitial,
      dateOfBirth: policyHolderFields.beneficiary.dateOfBirth,
      relationship: policyHolderFields.beneficiary.relationship,
      contactNumber: policyHolderFields.beneficiary.contactNumber
    }
  };
};

/**
 * Constructs the fields for Traveler needed for processing
 *
 * @param {Object} travellerFields
 * Object from redux for traveler
 */
const getTravellerFieldValues = (travellerFields, isPolicyHolder) => ({
  firstName: travellerFields.firstName,
  lastName: travellerFields.lastName,
  middleInitial: travellerFields.middleInitial,
  gender: travellerFields.gender.toUpperCase(),
  dateOfBirth: travellerFields.dateOfBirth,
  occupation: travellerFields.occupation,
  occupationCode: travellerFields.occupationCode,
  idType: travellerFields.idType,
  idNumber: travellerFields.idNumber,
  email: travellerFields.emailAddress,
  phoneNumber: travellerFields.contactNumber,
  address: travellerFields.address,
  isPolicyHolder,
  beneficiary: {
    firstName: travellerFields.beneficiary.firstName,
    lastName: travellerFields.beneficiary.lastName,
    middleInitial: travellerFields.beneficiary.middleInitial,
    dateOfBirth: travellerFields.beneficiary.dateOfBirth,
    relationship: travellerFields.beneficiary.relationship,
    contactNumber: travellerFields.beneficiary.contactNumber
  }
});

const getTravellerObject = (travellers, travellerType) => {
  return travellers
    .filter(traveller => traveller.travellerType === travellerType)
    .map(traveller => {
      const occupation = _.find(OCCUPATIONS, occ => {
        return occ.position === traveller.formFields.occupation;
      });
      _.set(traveller, 'formFields.occupationCode', _.get(occupation, 'code'));
      return getTravellerFieldValues(traveller.formFields, traveller.isPolicyHolder)
    });
};

export const getOrderRequestObject = (
  agent,
  profile,
  selection,
  travellers,
  partner,
  trackingReport,
  agreements
) => {
  const profileAndSelection = getProfile(profile, selection);
  const { code, name } = partner;
  const { trackingId, source, medium, campaign, content } = trackingReport;
  const utm = {
    source,
    medium,
    campaign,
    content
  };
  return _.assign(
    {
      finalQuote: {
        premiumTotal: _.toString(selection.totalPremium.groupPolicy),
        currencyCode: profile.currency
      },
      partner: {
        code,
        name,
      },
      trackingId,
      utm,
      policyHolder: getPolicyHolderFieldValues(travellers),
      policyCover: {
        travellingAdults: getTravellerObject(travellers, travellerTypes.ADULT),
        travellingChildren: getTravellerObject(travellers, travellerTypes.CHILD)
      },
      agent: {
        agentCode: agent.agentCode
      },
      agreements
    },
    profileAndSelection,
    {
      profile: _.assign({}, profileAndSelection.profile, {
        isAgreedToUsePersonalData: profile.isAgreedToUsePersonalData
      })
    }
  );
};

export const constructReportsPayload = (report) => {
  const {
    formattedAgent,
    profile,
    selectedPlan,
    travellers,
    partner,
    formattedTracking,
    stepVal,
    referenceNumber,
    agreements
  } = report;
  const profileAndSelection = getProfile(profile, selectedPlan);
  const { trackingId, source, medium, campaign, content } = formattedTracking;
  const { code } = partner;

  const updatedTravellers = travellers
    .map(traveller => {
      const occupation = _.find(OCCUPATIONS, occ => {
        return occ.position === traveller.formFields.occupation;
      });
      _.set(traveller, 'formFields.occupationCode', _.get(occupation, 'code'));
      return getTravellerFieldValues(traveller.formFields, traveller.isPolicyHolder)
    });

  return {
    finalQuote: {
      currencyCode: profile.currency,
      netPremium: _.toString(selectedPlan.netPremium.groupPolicy),
      premiumTotal: _.toString(selectedPlan.totalPremium.groupPolicy),
      totalLocalGovernmentTax: _.toString(selectedPlan.localGovtTax.groupPolicy),
      totalPremiumTax: _.toString(selectedPlan.premiumTax.groupPolicy),
      totalDocumentaryStampTax: _.toString(selectedPlan.docStampTax.groupPolicy),
      totalSavings: _.toString(selectedPlan.totalSavings),
      originalAmount: _.toString(selectedPlan.originalAmount)
    },
    policyCover: updatedTravellers,
    trackingId,
    step: stepVal,
    partner: code,
    source,
    medium,
    campaign,
    content,
    referenceNumber,
    profile: _.get(profileAndSelection, 'profile', {}),
    selection: _.get(profileAndSelection, 'selection', {}),
    agent: formattedAgent,
    agreements
  };
};

export function getLogs(err) {
  const result = browser();
  result.error = err;

  return result;
}
