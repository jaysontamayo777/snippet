import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import _ from 'lodash';
import browserHistory from '../../utils/browserHistory';

import { updateProfile } from '../../actions/profileActions';
import { validateCode } from '../../actions/agentActions';
import { getQuote } from '../../actions/quoteActions';
import { selectPlan } from '../../actions/planActions';
import { getSelectedPlan } from '../../selectors/plansSelectors';
import { scrollToTop, scrollToId } from '../../utils/scrollUtils';
import routePaths from '../../constants/routePaths';

// === TAG COMMANDER ===
import { tagClickPH } from '../../lib/tag.js';
import { 
  PLANS_TABLE_SELECTION,
  BASKET_BUY_NOW 
} from '../../constants/tags.js';
// === END TAG COMMANDER ===

import QuoteWidget from '../../components/QuoteWidget';
import PromoCode from '../../components/PromoCode';
import Agent from '../../components/Agent';
import SendQuoteForm from '../../components/SendQuoteForm/SendQuoteForm';
import TripSummary from '../../components/Summary/TripSummary';
import PlansTable from '../../components/PlansTable';
import PlansTableMobile from '../../components/PlansTable/mobile';
import GoBackToPage from '../../components/GoBackToPage/GoBackToPage';
import BasketDetails from '../../containers/BasketDetails/BasketDetails';

import * as P from './style.js';

import { Container, Row, Col } from 'reactstrap';
import { BurntSiennaButton } from '../../components/AXAToolkit';

class PlanSelectionPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      collapseQuoteWidget: false,
      isMobile: window.innerWidth <= 991
    };
  }

  componentDidMount() {
    scrollToTop();
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 991 });
  };

  onSelectPlan = planId => {
    const { selectPlan, plans } = this.props;
    const planSelected = plans.filter(plan => plan.planId === planId)[0] || {};

    selectPlan(plans, planSelected);

    tagClickPH(PLANS_TABLE_SELECTION[planSelected.planName]);
    
    scrollToId('basket');
  };

  onClickNext = () => {
    const { profile, getQuote, validateCode, selection, agent } = this.props;

    validateCode(agent.agentCode, isValid => {
      if (isValid) {
        getQuote(Object.assign({}, profile), selection);
        browserHistory.push(routePaths.CUSTOMER_DETAILS);
      }
    });

    tagClickPH(BASKET_BUY_NOW);
  };

  toggleProfileAdjust = () => {
    this.setState(state => ({
      collapseQuoteWidget: !state.collapseQuoteWidget
    }));
  };

  onGetSuccessfulQuote = () => {
    setTimeout(() => {
      scrollToId('plans-table');
    }, 1100);
  };

  render() {
    const { selectedPlan, profile, agent } = this.props;
    const { collapseQuoteWidget, isMobile } = this.state;

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

    return (
      <Container>
        <P.Profile>
          <P.ProfileSummary>
            <P.Title>Your quote</P.Title>
            <p>
              {profile.coverage}, from {profile.startDate} to {profile.endDate},{' '}
              {profile.numberOfAdults} {adultsTravellerLabel}
              {profile.numberOfChildren >= 1 &&
                `, ${profile.numberOfChildren} ${childrenTravellerLabel}`}
            </p>
            <P.OpenWidget onClick={this.toggleProfileAdjust}>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="12"
                height="12"
                viewBox="0 0 15 7"
                style={{ paddingTop: '2px', marginRight: '5px' }}
              >
                <g
                  fill="none"
                  fillRule="evenodd"
                  stroke="#00008F"
                  strokeLinecap="round"
                  strokeWidth="2"
                >
                  <path d="M.5 3.5H11M9 7l2.798-3.5L9 0" />
                </g>
              </svg>
              Change Travel Details
            </P.OpenWidget>
          </P.ProfileSummary>
          <P.ProfileAdjust isOpen={collapseQuoteWidget}>
            <QuoteWidget onGetSuccessfulQuote={this.onGetSuccessfulQuote} />
          </P.ProfileAdjust>
        </P.Profile>

        {isMobile ? (
          <PlansTableMobile
            showPrices
            enableSelection
            onSelectPlan={this.onSelectPlan}
          />
        ) : (
          <PlansTable
            showPrices
            enableSelection
            onSelectPlan={this.onSelectPlan}
          />
        )}

        {!_.isEmpty(selectedPlan.productId) &&  (
          <BasketDetails
            onClickNext={this.onClickNext}
          />
        )}
        <div className="row" style={{ marginLeft: '0', marginRight: '0' }}>
          <SendQuoteForm />
        </div>
        <GoBackToPage />
      </Container>
    );
  }
}

PlanSelectionPage.propTypes = {
  profile: PropTypes.object,
  quote: PropTypes.object,
  plans: PropTypes.array,
  partner: PropTypes.object,
  agent: PropTypes.object,
  content: PropTypes.object,
  i18n: PropTypes.object,
  selection: PropTypes.object,
  selectedPlan: PropTypes.object,
  selectPlan: PropTypes.func,
  validateCode: PropTypes.func,
  addOns: PropTypes.array,
  selectAddOn: PropTypes.func,
  currency: PropTypes.string,
  updateProfile: PropTypes.func,
  getQuote: PropTypes.func
};

function mapStateToProps({
  profile,
  quote,
  plans,
  selection,
  content,
  partner,
  agent
}) {
  const plan = getSelectedPlan(plans);
  return {
    profile,
    quote,
    plans,
    selection,
    selectedPlan: plan,
    content,
    partner,
    agent
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectPlan,
      updateProfile,
      getQuote,
      validateCode
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlanSelectionPage);
