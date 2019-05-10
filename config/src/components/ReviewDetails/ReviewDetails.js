import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Row, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import browserHistory from '../../utils/browserHistory';
import routePaths from '../../constants/routePaths';
import { scrollToTop } from '../../utils/scrollUtils';
import REGIONS from '../../constants/regions';
import moment from 'moment';

import * as R from './style';
class ReviewDetails extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      acceptedTermsAndCondition: false,
      expandTravelDetails: ''
    };

    this.onEditTravelDetails = this.onEditTravelDetails.bind(this);
    this.onEditCustomerDetails = this.onEditCustomerDetails.bind(this);
  }

  componentDidMount() {
    scrollToTop();
  }

  collapsePanel = panel => {
    const { expandTravelDetails } = this.state;

    if (expandTravelDetails === panel) {
      this.setState({ expandTravelDetails: '' });
    } else {
      this.setState({ expandTravelDetails: panel });
    }
  };

  filterByName = lists => {
    return lists.map(list => list.name).join(', ');
  };

  getPolicyType = region => {
    return region === REGIONS.DOMESTIC ? 'Domestic' : 'International';
  };

  getRegion = region => {
    let reference = '';

    if (region === REGIONS.WORLDWIDE || region === REGIONS.WORLDWIDE_SCHENGEN) {
      reference = REGIONS.WORLDWIDE;
    } else if (region === REGIONS.ASEAN) {
      reference = REGIONS.ASEAN;
    } else if (region === REGIONS.ASIA) {
      reference = REGIONS.ASIA;
    } else if (region === REGIONS.DOMESTIC) {
      reference = REGIONS.DOMESTIC;
    }

    return reference;
  };

  formatDate = date => {
    return !date ? '' : moment(date, 'YYYY/MM/DD').format('MM/DD/YYYY');
  };

  getTravelerHeader(
    travelerType = 'adult',
    index = 0,
    isFirstTravelPolicyHolder = false
  ) {
    const idx =
      isFirstTravelPolicyHolder && travelerType === 'adult'
        ? index + 1
        : index + 1;
    return travelerType === 'adult'
      ? `${I18n.t('review-details.insuredAdult')}${idx}`
      : `${I18n.t('review-details.insuredChild')}${idx}`;
  }

  onEditTravelDetails() {
    browserHistory.push(`${routePaths.INDEX}#section-nav`);
  }

  onEditCustomerDetails() {
    browserHistory.push(routePaths.CUSTOMER_DETAILS);
  }

  render() {
    const { profile, travellers } = this.props;
    const { expandTravelDetails } = this.state;

    return (
      <R.Wrapper className="panel-group" id="customer-review-form">
        <R.Panel>
          <R.PanelHeader>
            <R.SectionHeader>{I18n.t('review-details.title')}</R.SectionHeader>
            <R.SectionDesc>
              {I18n.t('review-details.description')}
            </R.SectionDesc>
          </R.PanelHeader>
        </R.Panel>

        <R.Panel>
          <R.PanelHeader onClick={() => this.collapsePanel('travelDetails')}>
            <R.PanelHeaderTitle>
              {I18n.t('review-details.travelDetailsTitle')}
              <R.Arrow
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 16 16"
                isOpen={expandTravelDetails === 'travelDetails'}
              >
                <path
                  fill="#00008F"
                  fillRule="nonzero"
                  d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                />
              </R.Arrow>
            </R.PanelHeaderTitle>
            <R.PanelHeaderDesc>
              {profile.coverage},&nbsp;
              {I18n.t('quote-details.from')}{' '}
              {this.formatDate(profile.startDate)} {I18n.t('quote-details.to')}{' '}
              {this.formatDate(profile.endDate)},&nbsp;
              {profile.numberOfAdults}{' '}
              {profile.numberOfAdults > 1
                ? I18n.t('quote-details.adults')
                : I18n.t('quote-details.adult')}
              ,&nbsp;
              {profile.numberOfChildren}{' '}
              {profile.numberOfChildren > 1
                ? I18n.t('quote-details.children')
                : I18n.t('quote-details.child')}
            </R.PanelHeaderDesc>
          </R.PanelHeader>
          <R.PanelBody isOpen={expandTravelDetails === 'travelDetails'}>
            <Row>
              <Col xs={4}>
                <R.SectionContent>
                  {I18n.t('review-details.travelType')}
                </R.SectionContent>
              </Col>
              <Col xs={8}>
                <R.SectionContent>
                  <b>{profile.coverage}</b>
                </R.SectionContent>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <R.SectionContent>
                  {I18n.t('review-details.policyType')}
                </R.SectionContent>
              </Col>
              <Col xs={8}>
                <b>{this.getPolicyType(profile.region)}</b>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <R.SectionContent>
                  {I18n.t('review-details.from')}
                </R.SectionContent>
              </Col>
              <Col xs={8}>
                <R.SectionContent>
                  <b>{this.formatDate(profile.startDate)}</b>
                </R.SectionContent>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <R.SectionContent>
                  {I18n.t('review-details.to')}
                </R.SectionContent>
              </Col>
              <Col xs={8}>
                <R.SectionContent>
                  <b>{this.formatDate(profile.endDate)}</b>
                </R.SectionContent>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <R.SectionContent>
                  {I18n.t('review-details.origin')}
                </R.SectionContent>
              </Col>
              <Col xs={8}>
                <R.SectionContent>
                  <b>{this.filterByName(profile.origin)}</b>
                </R.SectionContent>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <R.SectionContent>
                  {I18n.t('review-details.destination')}
                </R.SectionContent>
              </Col>
              <Col xs={8}>
                <R.SectionContent>
                  <b>{this.filterByName(profile.destinations)}</b>
                </R.SectionContent>
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <R.SectionContent>
                  {I18n.t('review-details.region')}
                </R.SectionContent>
              </Col>
              <Col xs={8}>
                <R.SectionContent>
                  <b>{this.getRegion(profile.region)}</b>
                </R.SectionContent>
              </Col>
            </Row>
          </R.PanelBody>
        </R.Panel>

        {travellers
          .filter(traveler => traveler.travellerType === 'adult')
          .map((traveller, idx) => (
            <R.Panel key={idx}>
              <R.PanelHeader
                id={`parent-panel-${idx}`}
                onClick={() => this.collapsePanel(`adult-${idx}`)}
              >
                <R.PanelHeaderTitle>
                  {this.getTravelerHeader(
                    traveller.travellerType,
                    idx,
                    travellers[0].isPolicyHolder
                  )}
                  <R.Arrow
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    isOpen={expandTravelDetails === `adult-${idx}`}
                  >
                    <path
                      fill="#00008F"
                      fillRule="nonzero"
                      d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                    />
                  </R.Arrow>
                </R.PanelHeaderTitle>
                <R.PanelHeaderDesc>
                  <R.TextCapitalize>
                    <b>
                      {traveller.formFields.firstName}{' '}
                      {traveller.formFields.lastName}
                    </b>
                  </R.TextCapitalize>
                </R.PanelHeaderDesc>
              </R.PanelHeader>
              <R.PanelBody isOpen={expandTravelDetails === `adult-${idx}`}>
                {/* firstName */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.firstName')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <R.TextCapitalize>
                        <b>{traveller.formFields.firstName}</b>
                      </R.TextCapitalize>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* last name */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.lastName')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <R.TextCapitalize>
                        <b>{traveller.formFields.lastName}</b>
                      </R.TextCapitalize>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* middle initial */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.middleInitial')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <R.TextCapitalize>
                        <b>{traveller.formFields.middleInitial}</b>
                      </R.TextCapitalize>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* gender */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.gender')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.gender}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* date of birth */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.dob')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{this.formatDate(traveller.formFields.dateOfBirth)}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* occupation */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.occupation')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.occupation}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* id type */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.idType')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.idType}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* id number */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.idNo')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.idNumber}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* email */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.email')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.emailAddress}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* contact number */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.mobileNo')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.contactNumber}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* address */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.address')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.address}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* beneficiary name */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.beneficiary')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <R.TextCapitalize>
                        <b>
                          {traveller.formFields.beneficiary.firstName}{' '}
                          {traveller.formFields.beneficiary.middleInitial}{' '}
                          {traveller.formFields.beneficiary.lastName}
                        </b>
                      </R.TextCapitalize>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* beneficiary dob */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.dob')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>
                        {this.formatDate(
                          traveller.formFields.beneficiary.dateOfBirth
                        )}
                      </b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* beneficiary relation */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.relationship')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.beneficiary.relationship}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* beneficiary contact */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.mobileNo')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.beneficiary.contactNumber}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
              </R.PanelBody>
            </R.Panel>
          ))}

        {travellers
          .filter(traveler => traveler.travellerType === 'child')
          .map((traveller, idx) => (
            <R.Panel key={idx}>
              <R.PanelHeader
                id={`child-panel-${idx}`}
                onClick={() => this.collapsePanel(`child-${idx}`)}
              >
                <R.PanelHeaderTitle>
                  {this.getTravelerHeader(
                    traveller.travellerType,
                    idx,
                    travellers[0].isPolicyHolder
                  )}
                  <R.Arrow
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="16"
                    viewBox="0 0 16 16"
                    isOpen={expandTravelDetails === `child-${idx}`}
                  >
                    <path
                      fill="#00008F"
                      fillRule="nonzero"
                      d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                    />
                  </R.Arrow>
                </R.PanelHeaderTitle>
                <R.PanelHeaderDesc>
                  <b>
                    {traveller.formFields.firstName}{' '}
                    {traveller.formFields.lastName}
                  </b>
                </R.PanelHeaderDesc>
              </R.PanelHeader>
              <R.PanelBody isOpen={expandTravelDetails === `child-${idx}`}>
                {/* firstName */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.firstName')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.firstName}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* lastName */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.lastName')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.lastName}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* middle initial */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.middleInitial')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.middleInitial}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* gender */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.gender')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.gender}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* date of birth */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.dob')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{this.formatDate(traveller.formFields.dateOfBirth)}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* beneficiary */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.beneficiary')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <R.TextCapitalize>
                        <b>
                          {traveller.formFields.beneficiary.firstName}{' '}
                          {traveller.formFields.beneficiary.middleInitial}{' '}
                          {traveller.formFields.beneficiary.lastName}
                        </b>
                      </R.TextCapitalize>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* beneficiary dob */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.dob')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>
                        {this.formatDate(
                          traveller.formFields.beneficiary.dateOfBirth
                        )}
                      </b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* beneficiary relation */}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.relationship')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.beneficiary.relationship}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
                {/* beneficiary contact*/}
                <Row>
                  <Col xs={4}>
                    <R.SectionContent>
                      {I18n.t('review-details.mobileNo')}
                    </R.SectionContent>
                  </Col>
                  <Col xs={8}>
                    <R.SectionContent>
                      <b>{traveller.formFields.beneficiary.contactNumber}</b>
                    </R.SectionContent>
                  </Col>
                </Row>
              </R.PanelBody>
            </R.Panel>
          ))}
      </R.Wrapper>
    );
  }
}

ReviewDetails.propTypes = {
  profile: PropTypes.object,
  policyHolder: PropTypes.object,
  traveller: PropTypes.object,
  travellers: PropTypes.array,
  i18n: PropTypes.object
};

function mapStateToProps({
  profile,
  traveller,
  travellers,
  policyHolder,
  i18n
}) {
  return {
    profile,
    traveller,
    travellers,
    policyHolder,
    i18n
  };
}

export default connect(mapStateToProps)(ReviewDetails);
