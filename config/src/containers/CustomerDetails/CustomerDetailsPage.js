import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import _ from 'lodash';

import { updatePolicyHolderFields } from '../../actions/customerDetails/policyHolderActions';
import {
  setTravellerAsPolicyHolder,
  updateTravellerFields,
  openForm
} from '../../actions/customerDetails/travellerActions';
import { getTrackingId, sendTrackReports } from '../../actions/trackingActions';
import { validateEmailPromoCode } from '../../actions/promoCodeActions';

import { customerDetailsTravelValidator } from '@axa-asia/ecommerce-field-validator-ph';

import TermsAndConditions from '../../components/TermsAndConditions';
import AdultForm from '../../components/InsuredForms/adultForm';
import ChildForm from '../../components/InsuredForms/childForm';
import SendQuoteForm from '../../components/SendQuoteForm/SendQuoteForm';
import GoBackToPage from '../../components/GoBackToPage/GoBackToPage';
import TripSummary from '../../components/Summary/TripSummary';

import browserHistory from '../../utils/browserHistory';
import routePaths from '../../constants/routePaths';
import { scrollToTop } from '../../utils/scrollUtils';

import { Container } from 'reactstrap';
import { BurntSiennaButton } from '../../components/AXAToolkit';

import * as C from './style';

class CustomerDetailsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: window.innerWidth <= 991,
      sticky: 'disabled',
      stickyWidth: 'auto',
      enableNext: false,
      initialLoad: true
    };
  }

  componentDidMount() {
    const { selection, profile, validateEmailPromoCode } = this.props;

    window.addEventListener('scroll', this.fixOnScroll, true);
    window.addEventListener('resize', this.resize);
    scrollToTop();

    if (!selection.planId) {
      browserHistory.push(routePaths.INDEX);
    }

    if (!_.isEmpty(profile.promoCode)) {
      validateEmailPromoCode(profile.promoCode);
    }
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixOnScroll, true);
  }

  fixOnScroll = () => {
    const { isMobile } = this.state;
    const stickyContainer = document.getElementById('sticky-container');
    const sticky = document.getElementById('sticky');

    const stickyStart = stickyContainer.offsetTop;
    const stickyEnd = stickyContainer.offsetHeight - sticky.offsetHeight;
    const stickyWidth = `${stickyContainer.offsetWidth}px`;

    if (
      !isMobile &&
      window.pageYOffset > stickyStart &&
      window.pageYOffset < stickyEnd + stickyStart
    ) {
      this.setState({ sticky: 'start', stickyWidth, stickyHeight: 'auto' });
    } else if (!isMobile && window.pageYOffset >= stickyEnd + stickyStart) {
      this.setState({ sticky: 'stop', stickyHeight: `${stickyEnd}px` });
    } else {
      this.setState({ sticky: 'disabled', stickyHeight: 'auto' });
    }
  };

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 991 });
  };

  onPurchase = () => {
    const {
      agent,
      travellers,
      profile,
      selection,
      partner,
      trackingReport,
      sendTrackReports,
      updateTravellerFields,
      agreements
    } = this.props;

    const stepVal = 'Your Information';
    delete partner.styles;
    const report = {
      agent,
      profile,
      selectedPlan: selection,
      travellers,
      partner,
      trackingReport,
      stepVal,
      referenceNumber: '',
      agreements
    };

    let hasErrors = false;
    this.setState({ initialLoad: false });
    travellers.map((traveller, travellerIndex) => {
      const fields = Object.keys(traveller.formFields);
      const errors = Object.assign({}, traveller.errors);
      fields.map(field => {
        Object.assign(
          errors,
          this.validate(travellerIndex, field, traveller.formFields[field])
        );

        hasErrors = !_.isEmpty(errors) || hasErrors;
      });

      updateTravellerFields(travellerIndex, traveller.formFields, errors);
    });

    if (hasErrors || !agreements.isPrivacyPolicyConsentAgreed) {
      setTimeout(() => {
        const errorField = document.getElementsByClassName('error-message')[0];
        errorField &&
          errorField.scrollIntoView({ block: 'center', behavior: 'smooth' });
      }, 100);
    } else {
      sendTrackReports(report);
      browserHistory.push(routePaths.CUSTOMER_REVIEW);
    }
  };

  /**
   * Validates the full name length. This is needed for GenWeb
   * validation. 'Group of ' word should be added if the name is for
   * the policy holder and travellers are more than one.
   *
   * @param {object} formDetails
   * Object that contains the names for validation
   *
   * @param {string} field
   * Name of field for validation
   *
   * @param {string} value
   * Value of the field for validation
   *
   * @param {boolean} isPolicyHolder
   * Flag to check if the details are for policy holder
   *
   * @param {boolean} isTraveller
   * Flag to check if the details are for traveller and not beneficiary
   */
  validateConcatenatedName = (
    formDetails,
    field,
    value,
    isPolicyHolder = false,
    isTraveller = false
  ) => {
    const { travellers } = this.props;
    const prefix = isPolicyHolder && travellers.length > 1 ? 'Group of ' : '';
    const validator = isTraveller
      ? customerDetailsTravelValidator.isValidName
      : customerDetailsTravelValidator.isValidBeneficiaryName;
    let result = {};

    if (value && field === 'firstName') {
      result = validator(
        `${prefix}${value} ${formDetails.middleInitial} ${formDetails.lastName}`
      );
    } else if (value && field === 'lastName') {
      result = validator(
        `${prefix}${formDetails.firstName} ${
          formDetails.middleInitial
        } ${value}`
      );
    } else if (value && field === 'middleInitial') {
      result = validator(
        `${prefix}${formDetails.firstName} ${value} ${formDetails.lastName}`
      );
    } else if (
      formDetails.firstName ||
      formDetails.middleInitial ||
      formDetails.lastName
    ) {
      result = validator(
        `${prefix}${formDetails.firstName} ${formDetails.middleInitial} ${
          formDetails.lastName
        }`
      );
    }

    return result.error
      ? { error: true, message: 'Full name must not exceed 50 characters.' }
      : {};
  };

  validate = (index, field, value) => {
    const { travellers, profile, promoCodeValidations } = this.props;
    const { validEmail } = promoCodeValidations;

    let errors = Object.assign({}, travellers[index].errors);
    delete errors[field];
    delete errors.fullName;

    let validator = {};

    if (field === 'firstName' || field === 'lastName') {
      validator = customerDetailsTravelValidator.isValidName(value);
    } else if (field === 'middleInitial') {
      validator = customerDetailsTravelValidator.isValidMiddleInitial(value);
    } else if (field === 'gender') {
      validator = customerDetailsTravelValidator.isValidGender(value);
    } else if (field === 'dateOfBirth') {
      if (travellers[index].travellerType === 'adult') {
        validator = customerDetailsTravelValidator.isValidDateOfBirthAdult(
          value,
          profile.startDate
        );
      } else if (travellers[index].travellerType === 'child') {
        validator = customerDetailsTravelValidator.isValidDateOfBirthChild(
          value,
          profile.startDate
        );
      }
    } else if (
      field === 'occupation' &&
      travellers[index].travellerType === 'adult'
    ) {
      validator = customerDetailsTravelValidator.isValidOccupation(value);
    } else if (field === 'idType') {
      validator = customerDetailsTravelValidator.isValidIdType(value);
    } else if (field === 'idNumber') {
      validator = customerDetailsTravelValidator.isValidIdNumber(value);
    } else if (
      field === 'emailAddress' &&
      index === 0 &&
      travellers[index].travellerType === 'adult' &&
      !_.isEmpty(profile.promoCode) &&
      !_.isEqual(validEmail.toUpperCase(), value.split('@')[1]) &&
      validEmail !== 'N/A'
    ) {
      validator = {
        message: `The email address you entered is incorrect with required format of group code.
        Please enter your email address in format:juandelacruz@${validEmail}.`,
        error: true
      };
    } else if (
      field === 'emailAddress' &&
      travellers[index].travellerType === 'adult' &&
      customerDetailsTravelValidator.isValidEmailAddress(value)
    ) {
      validator = customerDetailsTravelValidator.isValidEmailAddress(value);
    } else if (
      field === 'contactNumber' &&
      travellers[index].travellerType === 'adult'
    ) {
      validator = customerDetailsTravelValidator.isValidMobileNumber(value);
    } else if (
      field === 'address' &&
      travellers[index].travellerType === 'adult'
    ) {
      validator = customerDetailsTravelValidator.isValidAddress(value);
    }

    const fullNameValidation = this.validateConcatenatedName(
      travellers[index].formFields,
      field,
      value,
      travellers[index].isPolicyHolder,
      true
    );

    if (validator.error) {
      Object.assign(
        errors,
        {
          [field]: validator.message
        },
        { fullName: fullNameValidation.message }
      );
    }

    return errors;
  };

  onBlurTraveller = (index, field, value) => {
    const { travellers, updateTravellerFields } = this.props;
    if (typeof value === 'string') {
      value = value.trim();
    }

    const formFields = Object.assign({}, travellers[index].formFields, {
      [field]: value
    });

    const errors = this.validate(index, field, value);

    updateTravellerFields(index, formFields, errors);
  };

  onBlurTravellerBeneficiary = (index, field, value) => {
    const { travellers, updateTravellerFields } = this.props;
    let errors = Object.assign({}, travellers[index].errors.beneficiary);
    let validator = {};

    delete errors[field];
    delete errors.fullName;

    if (typeof value === 'string') {
      value = value.trim();
    }

    if (value && (field === 'firstName' || field === 'lastName')) {
      validator = customerDetailsTravelValidator.isValidName(value);
    } else if (field === 'middleInitial') {
      validator = customerDetailsTravelValidator.isValidMiddleInitial(value);
    } else if (field === 'contactNumber' && value !== '') {
      validator = customerDetailsTravelValidator.isValidMobileNumber(value);
    } else if (field === 'relationship' && value !== '') {
      validator = customerDetailsTravelValidator.isValidRelationship(value);
    }

    const beneficiary = Object.assign(
      {},
      travellers[index].formFields.beneficiary,
      {
        [field]: value
      }
    );

    const formFields = Object.assign({}, travellers[index].formFields, {
      beneficiary
    });

    const fullNameValidation = this.validateConcatenatedName(
      travellers[index].formFields.beneficiary,
      field,
      value
    );
    if (validator.error || fullNameValidation.error) {
      Object.assign(
        errors,
        {
          [field]: validator.message
        },
        { fullName: fullNameValidation.message }
      );
    }

    const errorObject = Object.assign({}, travellers[index].errors, {
      beneficiary: errors
    });

    if (errorObject.beneficiary && _.isEmpty(errorObject.beneficiary)) {
      delete errorObject.beneficiary;
    }

    updateTravellerFields(index, Object.assign({}, formFields), errorObject);
  };

  render() {
    const { travellers } = this.props;
    const {
      isMobile,
      sticky,
      stickyWidth,
      stickyHeight,
      initialLoad
    } = this.state;

    return (
      <Container>
        <C.Wrapper>
          <C.Forms>
            {travellers &&
              travellers.map((traveller, indx) =>
                traveller.travellerType === 'adult' ? (
                  <AdultForm
                    key={indx}
                    travellerIndex={indx}
                    travellerInfo={traveller}
                    onBlurTraveller={this.onBlurTraveller}
                    onBlurTravellerBeneficiary={this.onBlurTravellerBeneficiary}
                    toolTipText={{ address: I18n.t('contento.address_tooltip') }}
                  />
                ) : (
                  <ChildForm
                    key={indx}
                    travellerIndex={indx}
                    travellerInfo={traveller}
                    onBlurTraveller={this.onBlurTraveller}
                    onBlurTravellerBeneficiary={this.onBlurTravellerBeneficiary}
                  />
                )
              )}
            <TermsAndConditions initialLoad={initialLoad} />
          </C.Forms>
          <C.Basket id="sticky-container">
            <C.Sticky
              id="sticky"
              startSticky={sticky === 'start'}
              stopSticky={sticky === 'stop'}
              stickyWidth={
                sticky === 'start' || sticky === 'stop' ? stickyWidth : 'auto'
              }
              stickyHeight={stickyHeight}
            >
              <TripSummary
                collapsing={isMobile}
                showPromoCode={false}
                buttonLabel={I18n.t('basket.payNow')}
                showSendQuote={false}
              />
              <C.SubmitForDesktop>
                <C.ButtonBlockNext>
                  <BurntSiennaButton fullWidth onClick={this.onPurchase}>
                    Next
                  </BurntSiennaButton>
                </C.ButtonBlockNext>
              </C.SubmitForDesktop>

              <C.ErrorList className="error-message">
                {travellers &&
                  travellers.map((traveller, travellerIndex) => (
                    <div key={travellerIndex}>
                      {traveller.errors.fullName && (
                        <li>
                          <b>
                            Traveller #{traveller.travellerTypeIndex + 1} (
                            {traveller.travellerType}):
                          </b>{' '}
                          {traveller.errors.fullName}
                        </li>
                      )}
                      {traveller.errors.beneficiary &&
                        traveller.errors.beneficiary.fullName && (
                          <li>
                            <b>
                              Beneficiary of traveller #
                              {traveller.travellerTypeIndex + 1} (
                              {traveller.travellerType}):
                            </b>{' '}
                            {traveller.errors.beneficiary.fullName}
                          </li>
                        )}
                    </div>
                  ))}
              </C.ErrorList>
            </C.Sticky>
          </C.Basket>
        </C.Wrapper>

        <C.SubmitForMobile>
          <C.ButtonBlockNext>
            <BurntSiennaButton fullWidth onClick={this.onPurchase}>
              Next
            </BurntSiennaButton>
          </C.ButtonBlockNext>
        </C.SubmitForMobile>
        <SendQuoteForm />
        <GoBackToPage />
      </Container>
    );
  }
}

CustomerDetailsPage.propTypes = {
  formCount: PropTypes.number,
  selectedPlan: PropTypes.object,
  selection: PropTypes.object,
  policyHolder: PropTypes.object,
  travellers: PropTypes.array,
  profile: PropTypes.object,
  displayedFormIndex: PropTypes.number,
  filledFormIndex: PropTypes.number,
  agreements: PropTypes.object,
  content: PropTypes.object,
  updatePolicyHolderFields: PropTypes.func,
  updateTravellerFields: PropTypes.func,
  openForm: PropTypes.func,
  setTravellerAsPolicyHolder: PropTypes.func,
  payment: PropTypes.object,
  order: PropTypes.object,
  partner: PropTypes.object,
  getTrackingId: PropTypes.func,
  trackingReport: PropTypes.object,
  sendTrackReports: PropTypes.func,
  validateEmailPromoCode: PropTypes.func,
  promoCodeValidations: PropTypes.object
};

function mapStateToProps({
  agent,
  selection,
  profile,
  customerForm,
  policyHolder,
  travellers,
  agreements,
  order,
  content,
  payment,
  trackingReport,
  partner,
  promoCodeValidations
}) {
  return {
    agent,
    selection,
    filledFormIndex: customerForm.filledFormIndex,
    displayedFormIndex: customerForm.displayedFormIndex,
    profile,
    policyHolder,
    travellers,
    agreements,
    order,
    content,
    payment,
    trackingReport,
    partner,
    promoCodeValidations
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      updatePolicyHolderFields,
      updateTravellerFields,
      openForm,
      setTravellerAsPolicyHolder,
      getTrackingId,
      sendTrackReports,
      validateEmailPromoCode
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerDetailsPage);
