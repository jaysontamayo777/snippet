import moment from 'moment';

export default {
  quote: {
    isLoading: false,
    isError: false
  },
  profile: {
    isLoading: true,
    errors: {},
    startDate: moment(new Date())
      .add(1, 'days')
      .format('YYYY-MM-DD'),
    endDate: moment(new Date())
      .add(1, 'days')
      .format('YYYY-MM-DD'),
    numberOfAdults: 1,
    numberOfChildren: 0,
    currency: 'PHP',
    promoCode: '',
    origin: [],
    region: '',
    destinations: [],
    coverage: 'SINGLE TRIP',
    policyType: 'INTERNATIONAL'
  },
  plans: [],
  selection: {
    productId: '',
    planId: ''
  },
  traveller: {
    formFields: {
      firstName: '',
      lastName: '',
      middleInitial: '',
      gender: '',
      dateOfBirth: '',
      occupation: '',
      idType: '',
      idNumber: '',
      emailAddress: '',
      contactNumber: '',
      address: '',
      beneficiary: {
        firstName: '',
        lastName: '',
        middleInitial: '',
        dateOfBirth: '',
        relationship: '',
        contactNumber: ''
      }
    },
    isOpen: false,
    errors: {}
  },
  travellers: [
    {
      travellerType: 'adult',
      travellerTypeIndex: 0,
      formFields: {
        firstName: '',
        lastName: '',
        middleInitial: '',
        gender: '',
        dateOfBirth: '',
        occupation: '',
        idType: '',
        idNumber: '',
        emailAddress: '',
        contactNumber: '',
        address: '',
        beneficiary: {
          firstName: '',
          lastName: '',
          middleInitial: '',
          dateOfBirth: '',
          relationship: '',
          contactNumber: ''
        }
      },
      isOpen: false,
      errors: {},
      isPolicyHolder: true
    }
  ],
  policyHolder: {
    formFields: {
      salutation: '',
      firstName: '',
      lastName: '',
      middleInitial: '',
      gender: '',
      dateOfBirth: '',
      placeOfBirth: '',
      nationality: '',
      passportNo: '',
      typeOfId: '',
      idNo: '',
      employer: '',
      position: '',
      natureOfWork: '',
      phoneNumber: '',
      email: '',
      confirmEmail: '',
      address: '',
      address2: '',
      address3: '',
      district: 'Makati City'
    },
    isOpen: true,
    errors: {}
  },
  customerForm: {
    filledFormIndex: 0,
    displayedFormIndex: 0
  },
  order: {},
  payment: {
    isLoading: false
  },
  content: {
    updateState: -1,
    contento: {},
    reference: {}
  },
  agreements: {
    isPrivacyPolicyConsentAgreed: false,
    isMarketingConsentAgreed: false
  },
  step: {
    current: 1,
    enabled: 1,
    isAltPage: false
  },
  tagCommanderTrigger: {
    paymentSuccess: false,
    paymentFailed: false
  },
  partner: {
    code: '',
    name: '',
    styles: {
      color: '',
      borderColor: '',
      backgroundColor: ''
    }
  },
  promoCodeValidations: {
    validEmail: '',
    expireDate: ''
  },
  trackingReport: {
    trackingId: '',
    isTrackingSent: false,
    source: '',
    medium: '',
    campaign: '',
    content: ''
  },
  agent: {
    agentCode: '',
    isValid: true,
    isFetching: false
  }
};
