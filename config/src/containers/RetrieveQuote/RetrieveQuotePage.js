import React, { Component } from 'react';
import PropTypes from 'prop-types';
import routePaths from '../../constants/routePaths';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import queryString from 'query-string';

import { decode, parseJson } from '../../lib/util';
import browserHistory from '../../utils/browserHistory';

import Loader from '../../components/Loader/Loader';
import Profile from '../../components/Widget/Profile';
import { updateAll, getProfileValidationError } from '../../actions/profileActions';
import { getQuote } from '../../actions/quoteActions';
import { initializeTravellerForms } from '../../actions/customerDetails/travellerActions';
import { selectPlan } from '../../actions/planActions'; 
import { savePartnerStyle } from '../../actions/partnerActions';
import { setTrackingId, setTrackingUtm } from '../../actions/trackingActions';
import { saveAgentDetails } from '../../actions/agentActions'; 

class RetrieveQuotePage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      quote:
        props.location && props.location.search
          ? decodeURIComponent(queryString.parse(props.location.search).quote)
          : undefined,
      selectedPlan: {},
      selectedPartner: {}
    };
  }

  componentWillMount() {
    const { props } = this;

    if (_.has(props, 'content.contento.en')) {
      return this._decodePayloadAndUpdateProps();
    }
  }


  componentWillReceiveProps(props) {
    const { selectedPlan } = this.state;

    if (props.plans.length === 0) {
      return this._decodePayloadAndUpdateProps();
    } else if(!selectedPlan || !selectedPlan.planId) {
      return this._selectPlanBasedOnSelectionData(props.plans);
    } else {
      setTimeout(() => this._goToPlanSelectionPage(), 100);
    }
  }

  /**
   * Redirects the page to Home page
   */
  _goToHomePage() {
    return browserHistory.push(routePaths.INDEX);
  }

  /**
   * Redirects the page to plan selection page.
   */
  _goToPlanSelectionPage() {
    return browserHistory.push(routePaths.PLAN_SELECTION);
  }

  /**
   * Decodes the payload from URL and sends to quotation module
   * for profiling.
   */
  _decodePayloadAndUpdateProps() {
    const decodedQuote = decode(this.state.quote);
    const { updateAll, initializeTravellerForms, getQuote, savePartnerStyle,
      setTrackingId, setTrackingUtm, getProfileValidationError, saveAgentDetails } = this.props;
    const quote = parseJson(decodedQuote);

    if (!quote && !_.isObject(quote)) {
      return this._goToHomePage();
    }

    const { profile, partner, trackingReport, agent } = quote;
    const { agentCode } = agent;

    // update profile data
    const profileData = new Profile(profile);

    // if there is a selected partner, save it on the redux
    if (partner && partner.code) {
      savePartnerStyle(partner.code, partner.name);
    }

    // save current tracking Id from the email
    if (trackingReport) {
      const { trackingId, medium, source, campaign, content } = trackingReport;
      setTrackingId(trackingId);
      setTrackingUtm(medium, source, campaign, content);
    }

    // save agent ID
    if (!_.isEmpty(agentCode)) {
      saveAgentDetails(agent);
    }

    // render selected quote and errors
    if (!profileData.isValid()) {
      updateAll(profileData);
      getProfileValidationError(profileData.errors);
      return this._goToHomePage();
    }

    // update all profile data since it's valid
    updateAll(profileData);

    initializeTravellerForms(profileData.numberOfAdults, profileData.numberOfChildren);

    // Load selected plans and addons to props based on profile
    // Based from business rules, plans and addons should not be selected
    getQuote(profileData, {});
  }

   /**
   * Decodes the selected plan from URL and sends to quotation module
   * for profiling.
   */
  _selectPlanBasedOnSelectionData(plans) {
    const { selectPlan } = this.props;
    const decodedQuote = decode(this.state.quote);
    const quote = parseJson(decodedQuote);
    const { selection } = quote;

    // get selected plan using planId
    const selectedPlan = _.filter(plans, (p) => p.planId === selection.planId)[0];

    // if failed to retrieve plan, still redirect to plan selection page
    if (!selectedPlan || !selectedPlan.planId) {
      return this._goToPlanSelectionPage();
    }

    this.setState({ selectedPlan: selectedPlan });

    selectPlan(plans, selectedPlan);
  }

  render() {
    return <Loader />;
  }
}

RetrieveQuotePage.propTypes = {
  content: PropTypes.object,
  plans: PropTypes.array,
  location: PropTypes.object,
  updateAll: PropTypes.func,
  getQuote: PropTypes.func,
  initializeTravellerForms: PropTypes.func,
  selectPlan: PropTypes.func,
  savePartnerStyle: PropTypes.func,
  setTrackingId: PropTypes.func,
  setTrackingUtm: PropTypes.func,
  getProfileValidationError: PropTypes.func,
  saveAgentDetails: PropTypes.func
};

function mapStateToProps({ content, plans }) {
  return {
    content,
    plans
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      updateAll,
      getQuote,
      initializeTravellerForms,
      selectPlan,
      savePartnerStyle,
      setTrackingId,
      setTrackingUtm,
      getProfileValidationError,
      saveAgentDetails
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RetrieveQuotePage);
