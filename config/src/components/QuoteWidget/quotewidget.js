import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';
import _ from 'lodash';
import moment from 'moment';
import { quotationDetailsTravelValidator } from '@axa-asia/ecommerce-field-validator-ph';

import { getQuote } from '../../actions/quoteActions';
import {
  updateProfile,
  getProfileValidationError
} from '../../actions/profileActions';
import { initializeTravellerForms } from '../../actions/customerDetails/travellerActions';
import { initPlans, initSelectedPlans } from '../../actions/planActions';
import{ setCurrentStep } from '../../actions/stepActions';

// === TAG COMMANDER ===
import { tagClickPH } from '../../lib/tag.js';
import { 
  WIDGET_GET_QUOTE 
} from '../../constants/tags.js';
// === END TAG COMMANDER ===

import TRAVEL_TYPES from '../../constants/travelTypes';
import POLICY_TYPES from '../../constants/policyTypes';
import REGIONS from '../../constants/regions';
import { countries } from '../../constants/countries';

import Loader from '../Loader/Loader';

import { Container, Collapse } from 'reactstrap';
import {
  RadioButton,
  BurntSiennaButton,
  Dropdown,
  MultiSelect,
  DatePicker,
  TextField,
  Tooltip
} from '../AXAToolkit';

import * as W from './style';

class QuoteWidget extends Component {
  state = {
    adjustTravellers: false,
    showCoveredDestinationsModal: false,
    collapsedDestination: 0,
    enablePromoCode: false,
    destinationTooltipOpen: false
  };

  toggleCoveredDestinations = () => {
    const { showCoveredDestinationsModal } = this.state;
    this.setState({
      showCoveredDestinationsModal: !showCoveredDestinationsModal,
      collapsedDestination: 0
    });
  };

  toggleDestinationTooltip = () => {
    this.setState({
      destinationTooltipOpen: !this.state.destinationTooltipOpen
    });
  };

  getMainRegion = destinations => {
    const { updateProfile } = this.props;
    const selectedDestinations = destinations || [];

    const regions = _.uniq(
      selectedDestinations.map(x => x.region.toUpperCase())
    );

    let mainRegion;
    if (regions.includes(REGIONS.WORLDWIDE) || regions.includes(REGIONS.WORLDWIDE_SCHENGEN)) {
      mainRegion = REGIONS.WORLDWIDE;
    } else if (regions.includes(REGIONS.ASEAN)) {
      mainRegion = REGIONS.ASEAN;
    } else if (regions.includes(REGIONS.ASIA)) {
      mainRegion = REGIONS.ASIA;
    } else if (regions.includes(REGIONS.DOMESTIC)) {
      mainRegion = REGIONS.DOMESTIC;
    }

    updateProfile('region', mainRegion);
  };

  setEndDate = (startDate, coverage) => {
    const { profile } = this.props;
    delete profile.errors.endDate;
    let endDate;

    if (coverage === TRAVEL_TYPES.ANNUAL_MULTI_TRIP) {
      endDate = moment(startDate, 'YYYY-MM-DD').add('years', 1);
    } else {
      endDate = moment(startDate, 'YYYY-MM-DD');
    }

    this.onBlurField('endDate', endDate.format('YYYY-MM-DD'));
  };

  onAdjustTravellers = () => {
    this.setState({ adjustTravellers: !this.state.adjustTravellers });
  };

  onDecrease = (number, limit, field) => {
    if (number > limit) {
      this.onBlurField(field, number - 1);
    }
  };

  onIncrease = (number, limit, field) => {
    if (number < limit) {
      this.onBlurField(field, number + 1);
    }
  };

  collapseDestinations = itemNo => {
    const { collapsedDestination } = this.state;

    if (collapsedDestination === itemNo) {
      this.setState({
        collapsedDestination: ''
      });
    } else {
      this.setState({
        collapsedDestination: itemNo
      });
    }
  };

  renderListOfDestinations = () => {
    const { profile } = this.props;
    const { collapsedDestination } = this.state;

    const selectedRegionDestinations = countries.filter(
      country => country.region === profile.region
    );

    const aseanDestinations = countries.filter(
      country => country.region === REGIONS.ASEAN
    );

    const asiaDestinations = countries.filter(
      country => country.region === REGIONS.ASIA
    );

    const worldwideDestinations = countries.filter(
      country => country.region === REGIONS.WORLDWIDE
    );

    const schengenDestinations = countries.filter(
      country => country.region === REGIONS.WORLDWIDE_SCHENGEN
    );

    let group;
    if (profile.region === REGIONS.DOMESTIC) {
      group = 'province';
    } else if (
      profile.region === REGIONS.WORLDWIDE_SCHENGEN ||
      profile.region === REGIONS.WORLDWIDE
    ) {
      group = 'continent';
    }

    const selectedRegionDestinationsByGroup = _.groupBy(
      selectedRegionDestinations,
      group
    );

    const worldwideDestinationsByGroup = _.groupBy(
      worldwideDestinations,
      'continent'
    );

    const selectedRegionDestinationsByGroupArr = Object.keys(
      selectedRegionDestinationsByGroup
    )
      .map(function(key) {
        return [String(key), selectedRegionDestinationsByGroup[key]];
      })
      .sort();

    const worldwideDestinationsByGroupArr = Object.keys(
      worldwideDestinationsByGroup
    )
      .map(function(key) {
        return [String(key), worldwideDestinationsByGroup[key]];
      })
      .sort();

    if (
      profile.region === REGIONS.DOMESTIC ||
      profile.region === REGIONS.WORLDWIDE ||
      profile.region === REGIONS.WORLDWIDE_SCHENGEN
    ) {
      return (
        <div>
          {profile.region === REGIONS.WORLDWIDE || profile.region === REGIONS.WORLDWIDE_SCHENGEN ? (
              <div>
                <W.CoveredDestinationsWrapper>
                  <W.CoveredProvince
                    onClick={() =>
                      this.collapseDestinations(
                        profile.region === REGIONS.WORLDWIDE_SCHENGEN ? 100 : 0
                      )
                    }
                  >
                    ASEAN
                    <W.CollapseArrow
                      isOpen={
                        profile.region === REGIONS.WORLDWIDE_SCHENGEN
                          ? collapsedDestination === 100
                          : collapsedDestination === 0
                      }
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#333"
                        fillRule="nonzero"
                        d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                      />
                    </W.CollapseArrow>
                  </W.CoveredProvince>

                  <Collapse
                    isOpen={
                      profile.region === REGIONS.WORLDWIDE_SCHENGEN
                        ? collapsedDestination === 100
                        : collapsedDestination === 0
                    }
                  >
                    <W.CoveredDestinationsList>
                      {aseanDestinations &&
                        aseanDestinations.map(
                          (destination, destinationIndex) => (
                            <W.CoveredDestinationsItem key={destinationIndex}>
                              {destination.name}
                            </W.CoveredDestinationsItem>
                          )
                        )}
                    </W.CoveredDestinationsList>
                  </Collapse>
                </W.CoveredDestinationsWrapper>
                <W.CoveredDestinationsWrapper>
                  <W.CoveredProvince
                    onClick={() => this.collapseDestinations(1)}
                  >
                    Asia
                    <W.CollapseArrow
                      isOpen={collapsedDestination === 1}
                      xmlns="http://www.w3.org/2000/svg"
                      width="30"
                      height="30"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fill="#333"
                        fillRule="nonzero"
                        d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                      />
                    </W.CollapseArrow>
                  </W.CoveredProvince>

                  <Collapse isOpen={collapsedDestination === 1}>
                    <W.CoveredDestinationsList>
                      {asiaDestinations &&
                        asiaDestinations.map(
                          (destination, destinationIndex) => (
                            <W.CoveredDestinationsItem key={destinationIndex}>
                              {destination.name}
                            </W.CoveredDestinationsItem>
                          )
                        )}
                    </W.CoveredDestinationsList>
                  </Collapse>
                </W.CoveredDestinationsWrapper>
              </div>
            ): null}

          {profile.region === REGIONS.WORLDWIDE_SCHENGEN &&
            worldwideDestinationsByGroupArr &&
            worldwideDestinationsByGroupArr.map((group, groupIndex) => (
              <W.CoveredDestinationsWrapper key={groupIndex}>
                <W.CoveredProvince
                  onClick={() =>
                    this.collapseDestinations(
                      profile.region === REGIONS.WORLDWIDE_SCHENGEN
                        ? groupIndex + 2
                        : groupIndex
                    )
                  }
                >
                  {group[0]}
                  <W.CollapseArrow
                    isOpen={
                      profile.region === REGIONS.WORLDWIDE_SCHENGEN
                        ? groupIndex + 2 === collapsedDestination
                        : groupIndex === collapsedDestination
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#333"
                      fillRule="nonzero"
                      d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                    />
                  </W.CollapseArrow>
                </W.CoveredProvince>

                <Collapse
                  isOpen={
                    profile.region === REGIONS.WORLDWIDE_SCHENGEN
                      ? groupIndex + 2 === collapsedDestination
                      : groupIndex === collapsedDestination
                  }
                >
                  <W.CoveredDestinationsList>
                    {group[1].map((city, cityIndex) => (
                      <W.CoveredDestinationsItem key={cityIndex}>
                        {city.name}
                      </W.CoveredDestinationsItem>
                    ))}
                  </W.CoveredDestinationsList>
                </Collapse>
              </W.CoveredDestinationsWrapper>
            ))}

          {selectedRegionDestinationsByGroupArr &&
            selectedRegionDestinationsByGroupArr.map((group, groupIndex) => (
              <W.CoveredDestinationsWrapper key={groupIndex}>
                <W.CoveredProvince
                  onClick={() =>
                    this.collapseDestinations(
                      profile.region === REGIONS.WORLDWIDE
                        ? groupIndex + 2
                        : groupIndex
                    )
                  }
                >
                  {profile.region === REGIONS.WORLDWIDE_SCHENGEN
                    ? 'Worldwide Schengen'
                    : group[0]}
                  <W.CollapseArrow
                    isOpen={
                      profile.region === REGIONS.WORLDWIDE
                        ? groupIndex + 2 === collapsedDestination
                        : groupIndex === collapsedDestination
                    }
                    xmlns="http://www.w3.org/2000/svg"
                    width="30"
                    height="30"
                    viewBox="0 0 16 16"
                  >
                    <path
                      fill="#333"
                      fillRule="nonzero"
                      d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                    />
                  </W.CollapseArrow>
                </W.CoveredProvince>

                <Collapse
                  isOpen={
                    profile.region === REGIONS.WORLDWIDE
                      ? groupIndex + 2 === collapsedDestination
                      : groupIndex === collapsedDestination
                  }
                >
                  <W.CoveredDestinationsList>
                    {group[1].map((city, cityIndex) => (
                      <W.CoveredDestinationsItem key={cityIndex}>
                        {city.name}
                      </W.CoveredDestinationsItem>
                    ))}
                  </W.CoveredDestinationsList>
                </Collapse>
              </W.CoveredDestinationsWrapper>
            ))}

          {profile.region === REGIONS.WORLDWIDE && (
            <W.CoveredDestinationsWrapper>
              <W.CoveredProvince onClick={() => this.collapseDestinations(100)}>
                Worlwide Schengen
                <W.CollapseArrow
                  isOpen={collapsedDestination === 100}
                  xmlns="http://www.w3.org/2000/svg"
                  width="30"
                  height="30"
                  viewBox="0 0 16 16"
                >
                  <path
                    fill="#333"
                    fillRule="nonzero"
                    d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                  />
                </W.CollapseArrow>
              </W.CoveredProvince>

              <Collapse isOpen={collapsedDestination === 100}>
                <W.CoveredDestinationsList>
                  {schengenDestinations &&
                    schengenDestinations.map(
                      (destination, destinationIndex) => (
                        <W.CoveredDestinationsItem key={destinationIndex}>
                          {destination.name}
                        </W.CoveredDestinationsItem>
                      )
                    )}
                </W.CoveredDestinationsList>
              </Collapse>
            </W.CoveredDestinationsWrapper>
          )}
        </div>
      );
    } else {
      return (
        <Collapse isOpen>
          <W.CoveredDestinationsList>
            {selectedRegionDestinations &&
              selectedRegionDestinations.map(
                (destination, destinationIndex) => (
                  <W.CoveredDestinationsItem key={destinationIndex}>
                    {destination.name}
                  </W.CoveredDestinationsItem>
                )
              )}
          </W.CoveredDestinationsList>
          {profile.region === REGIONS.ASIA && (
            <W.CoveredDestinationsList>
              <W.CoveredProvince style={{ padding: '10px 0' }}>
                ASEAN
              </W.CoveredProvince>

              {aseanDestinations &&
                aseanDestinations.map((destination, destinationIndex) => (
                  <W.CoveredDestinationsItem key={destinationIndex}>
                    {destination.name}
                  </W.CoveredDestinationsItem>
                ))}
            </W.CoveredDestinationsList>
          )}
        </Collapse>
      );
    }
  };

  renderListOfAllDestinations = () => {
    const { collapsedDestination } = this.state;

    const coveredDestinationsByRegion = _.groupBy(countries, 'region');
    const coveredDestinationsByRegionArr = Object.keys(
      coveredDestinationsByRegion
    )
      .map(function(key) {
        return [String(key), coveredDestinationsByRegion[key]];
      })
      .sort();

    return (
      coveredDestinationsByRegionArr &&
      coveredDestinationsByRegionArr.map((region, regionIndex) => (
        <W.CoveredDestinationsWrapper key={regionIndex}>
          <W.CoveredProvince
            onClick={() => this.collapseDestinations(regionIndex)}
          >
            {region[0]}
            <W.CollapseArrow
              isOpen={regionIndex === collapsedDestination}
              xmlns="http://www.w3.org/2000/svg"
              width="30"
              height="30"
              viewBox="0 0 16 16"
            >
              <path
                fill="#333"
                fillRule="nonzero"
                d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
              />
            </W.CollapseArrow>
          </W.CoveredProvince>

          <Collapse isOpen={regionIndex === collapsedDestination}>
            <W.CoveredDestinationsList>
              {region[1].map((country, countryIndex) => (
                <W.CoveredDestinationsItem key={countryIndex}>
                  {country.name}
                </W.CoveredDestinationsItem>
              ))}
            </W.CoveredDestinationsList>
          </Collapse>
        </W.CoveredDestinationsWrapper>
      ))
    );
  };

  validate = (field, value) => {
    const { profile, updateProfile } = this.props;
    let errors = profile.errors;
    delete errors[field];
    let errorMessage = {};
    let validator = {};

    if (field === 'destinations' || field === 'region') {
      delete errors['destinations'];
      delete errors['region'];
    }

    if (field === 'coverage' && value !== profile.coverage) {
      validator = quotationDetailsTravelValidator.isValidCoverage(value);

      if (value === TRAVEL_TYPES.ANNUAL_MULTI_TRIP) {
        updateProfile('origin', [{ region: 'DOMESTIC', name: 'Philippines' }]);
      } else {
        updateProfile('origin', []);
      }

      updateProfile('destinations', []);
      updateProfile('region', '');
      errors = {};
    } else if (field === 'policyType' && value !== profile.policyType) {
      updateProfile('destinations', []);
    } else if (field === 'origin') {
      if (profile.coverage === TRAVEL_TYPES.SINGLE_TRIP) {
        validator = quotationDetailsTravelValidator.isValidOriginForSingleTrip(
          value[0]
        );
      } else {
        validator = quotationDetailsTravelValidator.isValidOriginForAnnualMultitrip(
          value[0]
        );
      }
    } else if (field === 'destinations') {
      if (profile.coverage === TRAVEL_TYPES.SINGLE_TRIP) {
        validator = quotationDetailsTravelValidator.isValidDestinationsForSingleTrip(
          value
        );
      }
    } else if (field === 'startDate') {
      validator = quotationDetailsTravelValidator.isValidTravelStartDate(value);
    } else if (field === 'endDate') {
      validator = quotationDetailsTravelValidator.isValidTravelEndDate(
        profile.coverage,
        profile.startDate,
        value
      );
    } else if (field === 'numberOfAdults') {
      validator = quotationDetailsTravelValidator.isValidNumberOfAdults(value);
    } else if (field === 'numberOfChildren') {
      validator = quotationDetailsTravelValidator.isValidNumberOfChildren(
        value
      );
    } else if (field === 'region') {
      validator = quotationDetailsTravelValidator.isValidRegionForAnnualMultitrip(
        value
      );

      if (profile.coverage === TRAVEL_TYPES.ANNUAL_MULTI_TRIP) {
        updateProfile('destinations', [{ name: value, region: value }]);
      }
    }

    if (validator.error) {
      Object.assign(errorMessage, {
        [field]: validator.message
      });
    }

    return Object.assign({}, errors, errorMessage);
  };

  onBlurField = (field, value) => {
    const { updateProfile, getProfileValidationError, initPlans, profile, initSelectedPlans, setCurrentStep } = this.props;
    let filteredValue = value;
    if (field === 'destinations' && typeof value === 'object') {
      filteredValue = _.cloneDeep(value);
      filteredValue = filteredValue.map(x => x.region === REGIONS.WORLDWIDE_SCHENGEN
        ? Object.assign(x, { region : REGIONS.WORLDWIDE })
        : x);
    }
    updateProfile(field, filteredValue);
    getProfileValidationError(this.validate(field, filteredValue));
    if (profile[field] !== filteredValue) {
      initPlans();
      initSelectedPlans();
      setCurrentStep({
        current: 2,
        enabled: 2,
        isAltPage: false,
        previous: 2
      });
    }
  };

  onGetQuote = () => {
    const {
      profile,
      getQuote,
      initializeTravellerForms,
      selection,
      i18n,
      getProfileValidationError,
      onGetSuccessfulQuote
    } = this.props;

    let errors = {};

    const quoteFields = Object.keys(profile);

    quoteFields.map(quoteField => {
      Object.assign(errors, this.validate(quoteField, profile[quoteField]));
    });

    getProfileValidationError(errors);

    if (_.isEmpty(errors)) {
      getQuote(profile, selection, i18n.locale, true);
      initializeTravellerForms(
        profile.numberOfAdults,
        profile.numberOfChildren
      );
      onGetSuccessfulQuote();
    }

    tagClickPH(WIDGET_GET_QUOTE);
  };

  render() {
    const {
      adjustTravellers,
      showCoveredDestinationsModal,
      enablePromoCode,
      destinationTooltipOpen
    } = this.state;
    const {
      profile,
      updateProfile,
      domesticProvinces,
      international,
      regions,
      quote
    } = this.props;

    // Number of traveller
    let adultsTravellerLabel, childrenTravellerLabel;

    if (profile.numberOfAdults === 1) {
      adultsTravellerLabel = 'adult';
    } else {
      adultsTravellerLabel = 'adults';
    }

    if (profile.numberOfChildren === 1) {
      childrenTravellerLabel = 'child';
    } else if (profile.numberOfChildren > 1) {
      childrenTravellerLabel = 'children';
    } else {
      childrenTravellerLabel = '';
    }

    if (quote.isLoading) {
      return <Loader loadingMessage="Calculating prices..." />;
    } else {
      return (
        <W.Wrapper>
          <W.Center>
            <W.Options>
              <RadioButton
                label={I18n.t('profiling-covertypes.singleTrip')}
                checked={profile.coverage === TRAVEL_TYPES.SINGLE_TRIP}
                onClick={() => {
                  this.setEndDate(profile.startDate, TRAVEL_TYPES.SINGLE_TRIP);
                  this.onBlurField('coverage', TRAVEL_TYPES.SINGLE_TRIP);
                }}
              />

              <RadioButton
                label={I18n.t('profiling-covertypes.annualMultiTrip')}
                checked={profile.coverage === TRAVEL_TYPES.ANNUAL_MULTI_TRIP}
                onClick={() => {
                  this.setEndDate(
                    profile.startDate,
                    TRAVEL_TYPES.ANNUAL_MULTI_TRIP
                  );
                  this.onBlurField('coverage', TRAVEL_TYPES.ANNUAL_MULTI_TRIP);
                }}
              />
            </W.Options>

            {profile.errors.coverage && (
              <W.ErrorMessage>{profile.errors.coverage}</W.ErrorMessage>
            )}
          </W.Center>

          {profile.coverage === TRAVEL_TYPES.SINGLE_TRIP && (
            <W.Center>
              <W.Options>
                <W.OptionButton
                  selected={profile.policyType === POLICY_TYPES.INTERNATIONAL}
                  onClick={() =>
                    this.onBlurField('policyType', POLICY_TYPES.INTERNATIONAL)
                  }
                >
                  {POLICY_TYPES.INTERNATIONAL}
                </W.OptionButton>
                <W.OptionButton
                  selected={profile.policyType === POLICY_TYPES.DOMESTIC}
                  onClick={() =>
                    this.onBlurField('policyType', POLICY_TYPES.DOMESTIC)
                  }
                >
                  {POLICY_TYPES.DOMESTIC}
                </W.OptionButton>
              </W.Options>
            </W.Center>
          )}

          <W.Row>
            <W.FormGroup>
              <W.Label>Origin</W.Label>
              <W.Options>
                <Dropdown
                  disabled={profile.coverage === TRAVEL_TYPES.ANNUAL_MULTI_TRIP}
                  filter="contains"
                  data={domesticProvinces}
                  textField="name"
                  value={profile.origin[0]}
                  placeholder="Origin"
                  onChange={value => this.onBlurField('origin', [value])}
                />
              </W.Options>

              {profile.errors.origin && (
                <W.ErrorMessage>{profile.errors.origin}</W.ErrorMessage>
              )}
            </W.FormGroup>

            <W.FormGroup>
              <W.Label>
                {I18n.t('profiling-labels.destination')}
                {I18n.t('contento.destinations_info') !== '' && (
                  <span
                    href="#"
                    id="destinationTooltip"
                    style={{ paddingRight: '3px' }}
                  >
                    <W.InfoIcon
                      xmlns="http://www.w3.org/2000/svg"
                      width="13"
                      height="13"
                      viewBox="0 0 13 13"
                    >
                      <g
                        id="Group_19"
                        data-name="Group 19"
                        transform="translate(-183 -155)"
                      >
                        <g
                          id="Ellipse_1"
                          data-name="Ellipse 1"
                          transform="translate(183 155)"
                          fill={destinationTooltipOpen ? '#3a3fd8' : 'none'}
                          stroke="#3a3fd8"
                          strokeWidth="1"
                        >
                          <circle cx="6.5" cy="6.5" r="6.5" stroke="none" />
                          <circle cx="6.5" cy="6.5" r="6" fill="none" />
                        </g>
                        <text
                          id="i"
                          transform="translate(188 165)"
                          fill={destinationTooltipOpen ? '#fff' : '#3a3fd8'}
                          fontSize="10"
                          fontFamily="SourceSansPro-Bold, Source Sans Pro"
                          fontWeight="700"
                        >
                          <tspan x="0" y="0">
                            i
                          </tspan>
                        </text>
                      </g>
                    </W.InfoIcon>
                  </span>
                )}
                <Tooltip
                  placement="right"
                  hideArrow
                  isOpen={destinationTooltipOpen}
                  target="destinationTooltip"
                  toggle={this.toggleDestinationTooltip}
                >
                  {I18n.t('contento.destinations_info')}
                </Tooltip>
              </W.Label>
              <W.Options>
                {profile.coverage === TRAVEL_TYPES.SINGLE_TRIP ? (
                  <MultiSelect
                    data={
                      profile.policyType === POLICY_TYPES.INTERNATIONAL
                        ? international
                        : domesticProvinces
                    }
                    textField="name"
                    value={profile.destinations}
                    placeholder="Destinations"
                    onChange={value => {
                      this.getMainRegion(value);
                      this.onBlurField('destinations', value);
                    }}
                  />
                ) : (
                  <Dropdown
                    data={regions}
                    value={profile.region}
                    placeholder="Destination"
                    onChange={value => this.onBlurField('region', value)}
                  />
                )}
              </W.Options>

              {profile.coverage === TRAVEL_TYPES.SINGLE_TRIP
                ? profile.errors.destinations && (
                    <W.ErrorMessage>
                      {profile.errors.destinations}
                    </W.ErrorMessage>
                  )
                : profile.errors.region && (
                    <W.ErrorMessage>{profile.errors.region}</W.ErrorMessage>
                  )}
            </W.FormGroup>

            <W.FormGroup>
              <W.Label>Depart date</W.Label>
              <DatePicker
                onKeyDown={e => e.preventDefault()}
                placeholder="Depart date"
                defaultValue={new Date(profile.startDate)}
                value={new Date(profile.startDate)}
                time={false}
                min={
                  new Date(
                    moment()
                      .add(1, 'days')
                      .format('YYYY-MM-DD')
                  )
                }
                onChange={value => {
                  this.setEndDate(value, profile.coverage);
                  this.onBlurField(
                    'startDate',
                    moment(value).format('YYYY-MM-DD')
                  );
                }}
              />

              {profile.errors.startDate && (
                <W.ErrorMessage>{profile.errors.startDate}</W.ErrorMessage>
              )}
            </W.FormGroup>
            <W.FormGroup>
              <W.Label>Return date</W.Label>
              <DatePicker
                onKeyDown={e => e.preventDefault()}
                disabled={profile.coverage === TRAVEL_TYPES.ANNUAL_MULTI_TRIP}
                placeholder="Return date"
                defaultValue={new Date(profile.endDate)}
                value={new Date(profile.endDate)}
                time={false}
                onChange={value =>
                  this.onBlurField(
                    'endDate',
                    moment(value).format('YYYY-MM-DD')
                  )
                }
                min={
                  new Date(
                    moment()
                      .add(1, 'days')
                      .format('YYYY-MM-DD')
                  )
                }
                max={
                  profile.coverage === TRAVEL_TYPES.SINGLE_TRIP
                    ? new Date(
                        moment(profile.startDate, 'YYYY-MM-DD').add('days', 182)
                      )
                    : new Date()
                }
              />

              {profile.errors.endDate && (
                <W.ErrorMessage>{profile.errors.endDate}</W.ErrorMessage>
              )}
            </W.FormGroup>
          </W.Row>
          <W.Row>
            <W.FormGroup>
              <W.CollapsiblePanel>
                <W.TotalTravellers
                  onClick={this.onAdjustTravellers}
                  isOpen={adjustTravellers}
                >
                  <W.CollapsiblePanelLabel>
                    {profile.numberOfAdults} {adultsTravellerLabel}
                    {profile.numberOfChildren >= 1 &&
                      `, ${profile.numberOfChildren} ${childrenTravellerLabel}`}
                    <span aria-hidden="true" className="rw-i rw-i-caret-down" />
                  </W.CollapsiblePanelLabel>
                </W.TotalTravellers>
                <W.Collapse
                  isOpen={adjustTravellers}
                  style={{
                    position: 'absolute',
                    marginTop: '36px'
                  }}
                >
                  <W.InlineSelection>
                    <W.CollapsiblePanelLabel>
                      Adults (18+)
                    </W.CollapsiblePanelLabel>
                    <div>
                      <W.NumberPickerDecrease
                        onClick={() =>
                          this.onDecrease(
                            profile.numberOfAdults,
                            1,
                            'numberOfAdults'
                          )
                        }
                      />
                      <W.NumberPicker
                        min="1"
                        max="15"
                        type="number"
                        disabled
                        value={profile.numberOfAdults}
                      />
                      <W.NumberPickerIncrease
                        onClick={() =>
                          this.onIncrease(
                            profile.numberOfAdults,
                            15,
                            'numberOfAdults'
                          )
                        }
                      />
                    </div>
                  </W.InlineSelection>
                  <W.InlineSelection>
                    <W.CollapsiblePanelLabel>
                      Child (17 and below)
                    </W.CollapsiblePanelLabel>
                    <div>
                      <W.NumberPickerDecrease
                        onClick={() =>
                          this.onDecrease(
                            profile.numberOfChildren,
                            0,
                            'numberOfChildren'
                          )
                        }
                      />
                      <W.NumberPicker
                        min="0"
                        max="15"
                        type="number"
                        disabled
                        value={profile.numberOfChildren}
                      />
                      <W.NumberPickerIncrease
                        onClick={() =>
                          this.onIncrease(
                            profile.numberOfChildren,
                            15,
                            'numberOfChildren'
                          )
                        }
                      />
                    </div>
                  </W.InlineSelection>

                  <W.SiennaButton fullWidth onClick={this.onAdjustTravellers}>
                    Done
                  </W.SiennaButton>
                  
                </W.Collapse>
              </W.CollapsiblePanel>

              {profile.errors.numberOfAdults && (
                <W.ErrorMessage>{profile.errors.numberOfAdults}</W.ErrorMessage>
              )}

              {profile.errors.numberOfChildren && (
                <W.ErrorMessage>
                  {profile.errors.numberOfChildren}
                </W.ErrorMessage>
              )}
            </W.FormGroup>
            <W.FormGroup>
              <W.PromoCode show={!enablePromoCode}>
                <p onClick={() => this.setState({ enablePromoCode: true })}>
                  Group Code
                </p>
              </W.PromoCode>
              <TextField
                hide={!enablePromoCode}
                placeholder="Group Code"
                value={profile.promoCode}
                onBlur={e => updateProfile('promoCode', e.target.value)}
                hasError={!!profile.errors.promoCode}
              />
              {profile.errors.promoCode && (
                <W.ErrorMessage className="error-message">
                  {profile.errors.promoCode}
                </W.ErrorMessage>
              )}
            </W.FormGroup>
            <W.FormGroup style={{ marginTop: '0', marginBottom: '0' }} />
            <W.FormGroup style={{ marginTop: '0', marginBottom: '0' }} />
          </W.Row>

          <W.Center>
            {profile.coverage === TRAVEL_TYPES.SINGLE_TRIP &&
              profile.destinations.length > 0 && (
                <W.Remarks>
                  Based on your selection, you are covered when you travel to
                  any{' '}
                  <span onClick={this.toggleCoveredDestinations}>
                    {profile.region}
                  </span>{' '}
                  destination/s
                </W.Remarks>
              )}
            {profile.coverage === TRAVEL_TYPES.ANNUAL_MULTI_TRIP && (
              <W.Remarks>
                List of covered{' '}
                <span onClick={this.toggleCoveredDestinations}>
                  DESTINATION/S{' '}
                </span>
              </W.Remarks>
            )}

            <W.Remarks>
              Subject to{' '}
              <a href={I18n.t('contento.policy_wording.url')} target="_blank">
                terms and conditions
              </a>{' '}
              of Smart Traveller.
            </W.Remarks>
          </W.Center>

          {profile.region === REGIONS.DOMESTIC && (
            <W.Center>
              <W.Remarks>
                Note: The destination must be 100km away from your residence.
              </W.Remarks>
            </W.Center>
          )}

          <W.Center>
            <W.SubmitButton onClick={this.onGetQuote}>
              Get a Quote
            </W.SubmitButton>
          </W.Center>

          <W.ModalWrapper isOpen={showCoveredDestinationsModal}>
            <Container>
              <W.ModalDialog>
                <W.ModalContent>
                  <W.ModalHeader>
                    <h1>
                      {profile.coverage === TRAVEL_TYPES.SINGLE_TRIP
                        ? profile.region
                        : 'Coverage'}{' '}
                      destinations:
                    </h1>
                    <W.ModalClose onClick={this.toggleCoveredDestinations}>
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="25"
                        height="25"
                        viewBox="0 0 18 18"
                      >
                        <g
                          id="Group_290"
                          data-name="Group 290"
                          transform="translate(-277 -287.994)"
                        >
                          <g
                            id="Ellipse_11"
                            data-name="Ellipse 11"
                            transform="translate(277 287.994)"
                            fill="#fff"
                            stroke="#f07662"
                            strokeWidth="2"
                          >
                            <circle cx="9" cy="9" r="9" stroke="none" />
                            <circle cx="9" cy="9" r="8" fill="none" />
                          </g>
                          <g
                            id="Group_290-2"
                            data-name="Group 290"
                            transform="translate(-0.983 -0.054)"
                          >
                            <path
                              id="Line"
                              d="M-.017.054l2.469,2.5,2.3,2.271"
                              transform="translate(284.5 294.494)"
                              fill="none"
                              stroke="#f07662"
                              strokeLinecap="square"
                              strokeMiterlimit="10"
                              strokeWidth="2"
                            />
                            <path
                              id="Line-2"
                              data-name="Line"
                              d="M4.749.054,2.279,2.55l-2.3,2.271"
                              transform="translate(284.5 294.494)"
                              fill="none"
                              stroke="#f07662"
                              strokeLinecap="square"
                              strokeMiterlimit="10"
                              strokeWidth="2"
                            />
                          </g>
                        </g>
                      </svg>
                    </W.ModalClose>
                  </W.ModalHeader>
                  <W.ModalBody>
                    {profile.coverage === TRAVEL_TYPES.SINGLE_TRIP
                      ? this.renderListOfDestinations()
                      : this.renderListOfAllDestinations()}
                  </W.ModalBody>
                </W.ModalContent>
              </W.ModalDialog>
            </Container>
          </W.ModalWrapper>
        </W.Wrapper>
      );
    }
  }
}

QuoteWidget.propTypes = {
  quote: PropTypes.object,
  getQuote: PropTypes.func,
  profile: PropTypes.object,
  domestic: PropTypes.array,
  domesticProvinces: PropTypes.array,
  international: PropTypes.array,
  destinations: PropTypes.array,
  regions: PropTypes.array,
  content: PropTypes.object,
  i18n: PropTypes.object,
  updateProfile: PropTypes.func,
  getProfileValidationError: PropTypes.func,
  initializeTravellerForms: PropTypes.func,
  selection: PropTypes.object,
  onGetSuccessfulQuote: PropTypes.func,
  initPlans: PropTypes.func,
  initSelectedPlans: PropTypes.func,
  setCurrentStep: PropTypes.func
};

QuoteWidget.defaultProps = {
  onGetSuccessfulQuote: () => {}
};

function mapStateToProps({ profile, quote, i18n, content, selection }) {
  const domestic = countries
    .filter(country => country.region === REGIONS.DOMESTIC)
    .map(city =>
      Object.assign(
        {},
        { name: `${city.name}, ${city.province}`, region: city.region }
      )
    );

  const domesticProvinces = _.uniqBy(
    countries.filter(country => country.region === REGIONS.DOMESTIC),
    'province'
  ).map(city =>
    Object.assign({}, { name: city.province, region: city.region })
  );

  const international = _.sortBy(
    countries.filter(country => country.region !== REGIONS.DOMESTIC),
    'name'
  );

  return {
    profile,
    quote,
    i18n,
    content,
    selection,
    domestic,
    domesticProvinces,
    international,
    destinations: Object.assign([], domestic, international).sort((a, b) => {
      if (a.name < b.name) {
        return -1;
      }
      if (a.name > b.name) {
        return 1;
      }
      return 0;
    }),
    regions: Object.keys(REGIONS)
      .map(key => REGIONS[key])
      .filter(key => key !== REGIONS.WORLDWIDE_SCHENGEN)
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getQuote,
      updateProfile,
      initializeTravellerForms,
      getProfileValidationError,
      initPlans,
      initSelectedPlans,
      setCurrentStep
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(QuoteWidget);
