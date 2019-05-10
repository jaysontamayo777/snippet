import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { I18n } from 'react-redux-i18n';

import browserHistory from '../../utils/browserHistory';
import { setProgress } from '../../actions/stepActions';
import paths from '../../constants/routePaths';

import { Container } from 'reactstrap';

import * as P from './style';

class PageIndicator extends Component {
  redirect = pageNo => {
    if (this.props.step.enabled >= pageNo) {
      if (pageNo === 2) {
        browserHistory.push(paths.PLAN_SELECTION);
      } else if (pageNo === 3) {
        browserHistory.push(paths.CUSTOMER_DETAILS);
      } else if (pageNo === 4) {
        browserHistory.push(paths.CUSTOMER_REVIEW);
      } else if (pageNo === 5) {
        browserHistory.push(paths.PAYMENT);
      }
    }
  };

  render() {
    const { step } = this.props;

    return (
      <P.Wrapper>
        <Container>
          <P.PageList>
            <P.PageListItem
              active={step.current === 2}
              completed={step.enabled >= 2}
              onClick={() => this.redirect(2)}
            >
              <span>1</span>
              <p>{I18n.t('steps.yourQuote')}</p>
            </P.PageListItem>
            <P.PageListItem
              active={step.current === 3}
              completed={step.enabled >= 3}
              onClick={() => this.redirect(3)}
            >
              <span>2</span>
              <p>{I18n.t('steps.yourInformation')}</p>
            </P.PageListItem>
            <P.PageListItem
              active={step.current === 4}
              completed={step.enabled >= 4}
              onClick={() => this.redirect(4)}
            >
              <span>3</span>
              <p>{I18n.t('steps.yourOffer')}</p>
            </P.PageListItem>
            <P.PageListItem
              active={step.current === 5}
              completed={step.enabled >= 5}
              onClick={() => this.redirect(5)}
            >
              <span>4</span>
              <p>{I18n.t('steps.payment')}</p>
            </P.PageListItem>
          </P.PageList>
        </Container>
      </P.Wrapper>
    );
  }
}

PageIndicator.propTypes = {
  step: PropTypes.object
};

function mapStateToProps({ step }) {
  return {
    step
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setProgress
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PageIndicator);
