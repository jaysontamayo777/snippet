import React, { Component } from 'react';
import PropTypes from 'prop-types';
import _ from 'lodash';
import { connect } from 'react-redux';
import { Row, Col } from 'reactstrap';

import Agent from '../../components/Agent';
import PromoCode from '../../components/PromoCode';
import Loader from '../../components/Loader/Loader';
import { BurntSiennaButton } from '../../components/AXAToolkit';
import TripSummary from '../../components/Summary/TripSummary';

class BasketDetails extends Component {
  render() {
    const { profile, agent, onClickNext, quote } = this.props;

    if (quote.isLoading) {
      return <Loader id="basket" loadingMessage="Calculating prices..." />;
    } else {
      return (
        <div id="basket" style={{ marginTop: '20px' }}>
          <Row>
            <Col lg={7}>
              <PromoCode />
              <Agent />
            </Col>
            <Col lg={5}>
              <TripSummary />
              <BurntSiennaButton
                fullWidth
                onClick={onClickNext}
                disabled={!_.isEmpty(profile.errors) || agent.isFetching}
              >
                Buy Now
              </BurntSiennaButton>
            </Col>
          </Row>
        </div>
      );
    }
  }
}

BasketDetails.propTypes = {
  profile: PropTypes.object,
  agent: PropTypes.object,
  content: PropTypes.object,
  i18n: PropTypes.object,
  onClickNext: PropTypes.func.isRequired,
  showPrices: PropTypes.bool,
  quote: PropTypes.object
};

function mapStateToProps({ content, i18n, profile, agent, quote }) {
  return {
    content,
    i18n,
    profile,
    agent,
    quote
  };
}

export default connect(mapStateToProps)(BasketDetails);
