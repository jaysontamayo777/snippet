import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { Container } from 'reactstrap';

import { payNow } from '../../actions/paymentActions';
import { purchaseOrder } from '../../actions/orderActions';

import Loader from '../../components/Loader/Loader';
import GoBackToPage from '../../components/GoBackToPage/GoBackToPage';
import TripSummary from '../../components/Summary/TripSummary';

import ReviewDetails from '../../components/ReviewDetails/ReviewDetails';

// Tag Commander
import { tagClick, tagVirtualPage, tagClickPH } from '../../lib/tag';
import {
  CUSTOMER_REVIEW_COVER_TYPE,
  CUSTOMER_REVIEW,
  REVIEW_PAGE_PAY_NOW
} from '../../constants/tags';

import TRAVEL_TYPES from '../../constants/travelTypes';
import { updateProfile } from '../../actions/profileActions';
import { setConsent } from '../../actions/customerDetails/customerReviewConsentActions';

import * as C from './style';

class CustomerReviewPage extends Component {
  /* istanbul ignore next */
  constructor(props) {
    super(props);

    this.state = {
      isPreparing: false,
      haveReadTermsAndConditions: false,
      isMobile: false
    };

    this._onSaveOrderDetails = this._onSaveOrderDetails.bind(this);
    this._triggerPayment = this._triggerPayment.bind(this);
    this._triggerOnClickNextTag = this._triggerOnClickNextTag.bind(this);
    this._onHaveReadTermsAndCondition = this._onHaveReadTermsAndCondition.bind(
      this
    );
    this._onAgreedToUsePersonalData = this._onAgreedToUsePersonalData.bind(
      this
    );
  }

  componentWillMount() {
    this.resize();
  }

  componentDidMount() {
    tagVirtualPage(CUSTOMER_REVIEW);
    window.addEventListener('resize', this.resize);
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 991 });
  };

  _triggerOnClickNextTag() {
    const { profile, travellers } = this.props;
    let adultCount = 1;
    let childCount = 1;
    travellers.map(traveller => {
      if (traveller.travellerType === 'adult') {
        if (
          profile.travelType === TRAVEL_TYPES.SINGLE_TRIP_ONE_WAY ||
          profile.travelType === TRAVEL_TYPES.SINGLE_TRIP_WITH_RETURN
        ) {
          tagClick(
            Object.assign({}, CUSTOMER_REVIEW_COVER_TYPE, {
              action: 'single',
              label: `adult_${adultCount}`
            })
          );
        } else if (profile.travelType === TRAVEL_TYPES.ANNUAL_MULTI_TRIP) {
          tagClick(
            Object.assign({}, CUSTOMER_REVIEW_COVER_TYPE, {
              action: 'annual',
              label: `adult_${adultCount}`
            })
          );
        }
        adultCount++;
      } else if (traveller.travellerType === 'child') {
        if (
          profile.travelType === TRAVEL_TYPES.SINGLE_TRIP_ONE_WAY ||
          profile.travelType === TRAVEL_TYPES.SINGLE_TRIP_WITH_RETURN
        ) {
          tagClick(
            Object.assign({}, CUSTOMER_REVIEW_COVER_TYPE, {
              action: 'single',
              label: `child_${childCount}`
            })
          );
        } else if (profile.travelType === TRAVEL_TYPES.ANNUAL_MULTI_TRIP) {
          tagClick(
            Object.assign({}, CUSTOMER_REVIEW_COVER_TYPE, {
              action: 'annual',
              label: `child_${childCount}`
            })
          );
        }
        childCount++;
      }
    });
  }

  _triggerPayment() {
    const { order, payNow, i18n } = this.props;
    if (order.orderReference) {
      payNow(order.orderReference, i18n.locale);
    }
  }

  _onSaveOrderDetails() {
    const {
      agent,
      profile,
      selection,
      travellers,
      order,
      purchaseOrder,
      partner,
      trackingReport,
      agreements
    } = this.props;
    const stepVal = 'Your Offer';

    tagClickPH(REVIEW_PAGE_PAY_NOW);
    
    return this.setState(
      {
        isPreparing: true
      },
      () => {
        if (!order.orderReference) {
          this._triggerOnClickNextTag();
          purchaseOrder(
            agent,
            profile,
            selection,
            travellers,
            partner,
            this._triggerPayment,
            trackingReport,
            stepVal,
            agreements
          );
        }
      }
    );
  }

  _onHaveReadTermsAndCondition() {
    this.setState({
      haveReadTermsAndConditions: !this.state.haveReadTermsAndConditions
    });
    this.props.setConsent({
      termsAndConditionsAccepted: !this.state.haveReadTermsAndConditions
    });
  }

  _onAgreedToUsePersonalData() {
    this.props.updateProfile(
      'isAgreedToUsePersonalData',
      !this.props.profile.isAgreedToUsePersonalData
    );
    this.props.updateProfile(
      'genericPromotionCode',
      I18n.t('contento.generic_promotion_code')
    );
    this.props.setConsent({
      consentAccepted: !this.props.profile.isAgreedToUsePersonalData
    });
  }

  render() {
    const { isPreparing, isMobile } = this.state;

    if (isPreparing) {
      return <Loader message={I18n.t('payment.redirectMessage')} />;
    }

    return (
      <Container>
        <C.Wrapper>
          <C.ReviewBlock>
            <ReviewDetails />
          </C.ReviewBlock>

          <C.Basket>
            <TripSummary collapsing={isMobile} />
            <C.HiddenOnMobile>
              <C.ButtonBlockNext>
                <C.ReviewPageButton
                  className="btn btn-ghost"
                  onClick={this._onSaveOrderDetails}
                >
                  Pay Now
                </C.ReviewPageButton>
              </C.ButtonBlockNext>
            </C.HiddenOnMobile>
          </C.Basket>
        </C.Wrapper>

        <C.VisibleOnMobile>
          <C.ButtonBlockNext>
            <C.ReviewPageButton
              className="btn btn-ghost"
              onClick={this._onSaveOrderDetails}
            >
              Pay Now
            </C.ReviewPageButton>
          </C.ButtonBlockNext>
        </C.VisibleOnMobile>
        <GoBackToPage />
      </Container>
    );
  }
}

CustomerReviewPage.propTypes = {
  formCount: PropTypes.number,
  selection: PropTypes.object,
  policyHolder: PropTypes.object,
  travellers: PropTypes.array,
  profile: PropTypes.object,
  i18n: PropTypes.object,
  displayedFormIndex: PropTypes.number,
  filledFormIndex: PropTypes.number,
  agreements: PropTypes.object,
  content: PropTypes.object,
  payNow: PropTypes.func,
  purchaseOrder: PropTypes.func,
  payment: PropTypes.object,
  order: PropTypes.object,
  updateProfile: PropTypes.func,
  partner: PropTypes.object,
  trackingReport: PropTypes.object,
  setConsent: PropTypes.func
};

function mapStateToProps({
  agent,
  profile,
  selection,
  customerForm,
  policyHolder,
  travellers,
  agreements,
  i18n,
  order,
  content,
  payment,
  partner,
  trackingReport
}) {
  return {
    agent,
    selection,
    filledFormIndex: customerForm.filledFormIndex,
    displayedFormIndex: customerForm.displayedFormIndex,
    updateProfile: PropTypes.func,
    profile,
    policyHolder,
    travellers,
    agreements,
    i18n,
    order,
    content,
    payment,
    partner,
    trackingReport
  };
}

const mapDispatchToProps = dispatch =>
  bindActionCreators(
    {
      payNow,
      purchaseOrder,
      updateProfile,
      setConsent,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(CustomerReviewPage);
