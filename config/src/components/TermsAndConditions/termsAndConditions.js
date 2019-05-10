import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';
import ReactHtmlParser from 'react-html-parser';

import { setConsent } from '../../actions/customerDetails/customerReviewConsentActions';

import { CheckBox } from '../AXAToolkit';

import * as T from './style';

class TermsAndConditions extends Component {
  constructor(props) {
    super(props);
  }

  /**
   * Updates the value of agreements object on redux.
   *
   * @param {string} field
   * Name of field with agreements object you want to update
   */
  toggleTermsAndConsent = field => {
    const { setConsent, agreements } = this.props;
    setConsent({ [field]: !agreements[field] });
  };

  render() {
    const { agreements, initialLoad } = this.props;

    return (
      <T.Wrapper
        hasError={!initialLoad && !agreements.isPrivacyPolicyConsentAgreed}
        className={!agreements.isPrivacyPolicyConsentAgreed && 'error-message'}
      >
        <T.Header>{I18n.t('termsandconditions.title')}</T.Header>
        <T.Body>
          <CheckBox
            label={I18n.t(
              'contento.terms_and_conditions.0.privacy_policy_consent'
            )}
            checked={agreements.isPrivacyPolicyConsentAgreed}
            onClick={() =>
              this.toggleTermsAndConsent('isPrivacyPolicyConsentAgreed')
            }
          />
          <CheckBox
            label={ReactHtmlParser(
              I18n.t('contento.terms_and_conditions.0.marketing_consent')
            )}
            checked={agreements.isMarketingConsentAgreed}
            onClick={() =>
              this.toggleTermsAndConsent('isMarketingConsentAgreed')
            }
          />
        </T.Body>
      </T.Wrapper>
    );
  }
}

TermsAndConditions.propTypes = {
  agreements: PropTypes.object,
  setConsent: PropTypes.func,
  initialLoad: PropTypes.bool
};

function mapStateToProps({ i18n, agreements }) {
  return {
    i18n,
    agreements,
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      setConsent
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TermsAndConditions);
