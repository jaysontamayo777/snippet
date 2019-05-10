import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import _ from 'lodash';
import queryString from 'query-string';

import { savePartnerStyle } from '../../actions/partnerActions';
import { saveAgentDetails } from '../../actions/agentActions';
import { setTrackingUtm } from '../../actions/trackingActions';
import { getSafeContent } from '../../utils/contentoUtil';

import HeroBanner from '../../components/HeroBanner';
import StickyBar from '../../components/StickyBar';
import QuoteWidget from '../../components/QuoteWidget';
import Benefits from '../../components/Benefits';
import PlansTable from '../../components/PlansTable';
import PlansTableMobile from '../../components/PlansTable/mobile';
import Claims from '../../components/Claims';
import Faq from '../../components/FAQ';

import { Container } from 'reactstrap';
import * as T from './style';

class TravelInsurancePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isMobile: window.innerWidth <= 991
    };
  }

  componentDidMount() {
    const { trackingReport, partner } = this.props;
    const { medium, source, campaign, content } = trackingReport;
    const { code } = partner;
    this.scrollToSection(this.props.location.hash.substring(1));

    if (
      !_.isEmpty(medium) ||
      !_.isEmpty(source) ||
      !_.isEmpty(campaign) ||
      !_.isEmpty(content) ||
      !_.isEmpty(code)
    ) {
      this.processQueryParamsUrl();
    } else {
      this.processQueryParams();
    }

    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 991 });
  };

  /**
   * Processes on putting the url parameters from the retrieve quote page
   **/
  processQueryParamsUrl = () => {
    const { trackingReport, partner, location = {}, history } = this.props;
    const { medium, source, campaign, content } = trackingReport;
    const { code } = partner;
    const linkPartner = !_.isEmpty(code) ? `partner=${code}` : '';
    const linkSource = !_.isEmpty(source) ? `utm_source=${source}` : '';
    const linkMedium = !_.isEmpty(medium) ? `utm_medium=${medium}` : '';
    const linkCampaign = !_.isEmpty(campaign) ? `utm_campaign=${campaign}` : '';
    const linkContent = !_.isEmpty(content) ? `utm_content=${content}` : '';
    const allParam = {
      code: linkPartner,
      source: linkSource,
      medium: linkMedium,
      campaign: linkCampaign,
      content: linkContent
    };

    let strParam = '';
    Object.keys(allParam).forEach((key, i) => {
      if (!_.isEmpty(allParam[key]) && i === 0) {
        strParam = `?${allParam[key]}`;
      } else if (!_.isEmpty(allParam[key]) && i > 0) {
        strParam = `${strParam}&${allParam[key]}`;
      }
    });

    if (!_.isEmpty(strParam)) {
      history.push(`${location.pathname.replace(/\/$/g, '')}${strParam}`);
    }
  };

  processQueryParams = () => {
    const {
      history,
      i18n,
      location = {},
      savePartnerStyle,
      saveAgentDetails,
      setTrackingUtm
    } = this.props;

    const queryParam = queryString.parse(location.search);
    const {
      partner,
      utm_source,
      utm_medium,
      utm_campaign,
      utm_content
    } = queryParam;

    if (partner) {
      const partnerList = i18n.translations.en.contento.partners_list;
      const partnerContent =
        partnerList.filter(item => partner === item.code)[0] || {};
      savePartnerStyle(partner, partnerContent.name);
      saveAgentDetails({ agentCode: partnerContent.agent_code });
    }

    if (
      !_.isEmpty(utm_medium) ||
      !_.isEmpty(utm_source) ||
      !_.isEmpty(utm_campaign) ||
      !_.isEmpty(utm_content)
    ) {
      setTrackingUtm(utm_medium, utm_source, utm_campaign, utm_content);
    }

    history.push(
      `${location.pathname.replace(/\/$/g, '')}?${queryString.stringify(
        queryParam
      )}`
    );
  };

  scrollToSection = sectionId => {
    const element = document.getElementById(sectionId);
    if (element) {
      try {
        window.scroll({
          top: element.offsetTop,
          left: 0,
          behavior: 'smooth'
        });
      } catch (e) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  };

  render() {
    const { i18n } = this.props;
    const { isMobile } = this.state;

    return (
      <T.Wrapper>
        <HeroBanner />

        <StickyBar />

        <T.Section background="white" id="benefits">
          <Benefits />
        </T.Section>

        <T.Section id="getAQuote">
          <Container>
            <T.Title>Tell us your travel details</T.Title>
            <T.Remarks>I want travel coverage for</T.Remarks>
            <QuoteWidget />
          </Container>
        </T.Section>

        <T.Section id="coverage" background="white">
          <Container>
            <T.Title>{I18n.t('contento.coverage.0.title')}</T.Title>
            <T.Remarks>
              {getSafeContent(I18n.t('contento.coverage.0.description'))}
            </T.Remarks>
            {isMobile ? (
              <PlansTableMobile showDropDown />
            ) : (
              <PlansTable showDropDown />
            )}
          </Container>
        </T.Section>

        <T.Section id="claims">
          <Claims />
        </T.Section>

        {_.has(i18n, 'translations.en.contento.faq.0.title') && (
          <T.Section id="faq" background="white">
            <Faq />
          </T.Section>
        )}
      </T.Wrapper>
    );
  }
}

TravelInsurancePage.propTypes = {
  i18n: PropTypes.object,
  history: PropTypes.object,
  location: PropTypes.object,
  savePartnerStyle: PropTypes.func.isRequired,
  saveAgentDetails: PropTypes.func.isRequired,
  setTrackingUtm: PropTypes.func.isRequired,
  trackingReport: PropTypes.object,
  partner: PropTypes.object
};

function mapStateToProps({ i18n, trackingReport, partner }) {
  return {
    i18n,
    trackingReport,
    partner
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      savePartnerStyle,
      saveAgentDetails,
      setTrackingUtm
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TravelInsurancePage);
