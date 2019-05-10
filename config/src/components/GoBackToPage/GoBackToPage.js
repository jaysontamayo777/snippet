import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import browserHistory from '../../utils/browserHistory';

import { I18n } from 'react-redux-i18n';

import * as G from './style';

import paths from '../../constants/routePaths';

class GoBackToPage extends Component {
  redirectBack = () => {
    const { step, finalStep } = this.props;
    let backToStep;

    if (step.current === 1) {
      backToStep = 1;
    } else {
      backToStep = step.current - 1;
    }

    if (backToStep === 1 || finalStep) {
      browserHistory.push(paths.INDEX);
    } else if (backToStep === 2) {
      browserHistory.push(paths.PLAN_SELECTION);
    } else if (backToStep === 3) {
      browserHistory.push(paths.CUSTOMER_DETAILS);
    } else if (backToStep === 4) {
      browserHistory.push(paths.CUSTOMER_REVIEW,);
    } else if (backToStep === 5) {
      browserHistory.push(paths.PAYMENT);
    }
  };

  render() {
    return (
      <G.Wrapper onClick={this.redirectBack}>
        <G.Arrow
          xmlns="http://www.w3.org/2000/svg"
          width="12"
          height="12"
          viewBox="0 0 14 7"
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
        </G.Arrow>
        {this.props.finalStep ? I18n.t('steps.goToHomePage') : I18n.t('steps.goBack')}
      </G.Wrapper>
    );
  }
}

GoBackToPage.propTypes = {
  step: PropTypes.object,
  finalStep: PropTypes.bool
};

function mapStateToProps({ step }) {
  return {
    step
  };
}

export default connect(mapStateToProps)(GoBackToPage);
