import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import _ from 'lodash';
import validator from 'validator';
import { I18n } from 'react-redux-i18n';

import Toastr from '../../components/Toastr/Toastr';
import * as utils from '../../lib/util';
import { sendQuote } from '../../api/email';
import { TextField } from '../AXAToolkit';
import {
  BaseBox, BaseHeader, BaseContent, SendQuoteRow,
  SendQuoteLabel, SendQuoteGroup, SendQuoteGroupCol1, SendQuoteGroupCol2,
  QuoteMessage
}
  from './style';

// Tag Commander
import { tagClick } from '../../lib/tag';
import {
  PLAN_SELECTION_SEND_QUOTE,
  CUSTOMER_DETAILS_SEND_QUOTE
} from '../../constants/tags';

import QuoteInfo from './QuoteInfo';

class SendQuoteForm extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      isAgreed: false,
      isAgreedReceivedEmailFromAXA: false,
      isAgreedUseDataForMarketing: false,
      isAggreedPersonalDetailsFromAXA: false,
      email: '',
      isSending: false,
      toastr: {
        show: false,
        title: '',
        body: '',
        type: 'content'
      }
    };

    this._onAcceptReceivedEmailFromAXA = this._onAcceptReceivedEmailFromAXA.bind(
      this
    );
    this._sendEmail = this._sendEmail.bind(this);
    this._onTick = this._onTick.bind(this);
    this._onChange = this._onChange.bind(this);
  }

  _isInvalid(details) {
    return !(
      _.isString(details.bodyEmail) &&
      _.isString(details.encodedQuote) &&
      validator.isEmail(details.bodyEmail)
    );
  }

  _setToastr(isShow = false, title = '', body = '', type = 'content') {
    this.setState({
      toastr: {
        show: isShow,
        title: title,
        body: body,
        type: type
      }
    });

    setTimeout(() => this._resetToast(), 3000);
  }

  _resetToast() {
    this.setState({
      toastr: {
        show: false,
        title: '',
        body: '',
        type: 'content'
      }
    });
  }

  // encode to [profileData, selectionData, partnerData, trackingReportData]
  _getEncodedQuote(profile, selection, partner, trackingReport, agent) {
    const allObject = {
      profile,
      selection,
      partner,
      trackingReport,
      agent
    };
    return utils.encode(JSON.stringify(allObject));
  }

  _sendEmail() {
    const { profile, selection, step, partner, trackingReport, agent } = this.props;
    const { region } = profile;
    const { agentCode, isValid } = agent;
    const newProfile = Object.assign({}, profile);
    let agentObj;

    if (!profile || !selection) {
      return;
    }

    if (_.has(newProfile, 'errors.promoCode')) {
      newProfile.promoCode = '';
    }

    // Save the agent code if not empty and valid only
    agentObj = !_.isEmpty(agentCode) && isValid
      ? agent
      : {};

    const details = {
      bodyEmail: this.state.email,
      encodedQuote: this._getEncodedQuote(newProfile, selection, partner, trackingReport, agentObj),
      region
    };

    // validation
    if (this._isInvalid(details)) {
      return this._setToastr(
        true,
        '',
        I18n.t('messages.emailInvalid'),
        'warning'
      );
    }

    // disable submit button
    this.setState({
      isSending: true
    });

    sendQuote(details)
      .then(() => {
        if (step.current === 2) {
          tagClick(PLAN_SELECTION_SEND_QUOTE);
        } else if (step.current === 3) {
          tagClick(CUSTOMER_DETAILS_SEND_QUOTE);
        }
        this._setToastr(
          true,
          '',
          I18n.t('messages.sendEmailSuccess'),
          'content'
        );

        setTimeout(function() {
          this.setState({
            isSending: false
          });
        }.bind(this), 30000);
      })
      .catch(() => {
        this._setToastr(true, '', I18n.t('messages.sendEmailFail'), 'warning');
      });
  }

  _onChange(key, ev) {
    this.setState({
      [key]: ev.target.value
    });
  }

  _onTick() {
    this.setState({ isAgreed: !this.state.isAgreed });
  }

  _onAcceptReceivedEmailFromAXA() {
    this.setState({
      isAgreedReceivedEmailFromAXA: !this.state.isAgreedReceivedEmailFromAXA
    });
  }

  _onAcceptPersonalDetailsFromAXA = () => {
    this.setState({
      isAggreedPersonalDetailsFromAXA: !this.state.isAggreedPersonalDetailsFromAXA
    });
  }

  render() {
    const {
      save_quote_terms: {
        header,
        privacy_policy,
        terms_and_conditions
      }
    } = this.props;
    const { toastr } = this.state;
    const isAbleToSendQuote = this.state.isAgreedReceivedEmailFromAXA;
    const isEmailEmpty = this.state.email === "";
    const disabledSendButton = !isAbleToSendQuote || isEmailEmpty || this.state.isSending;

    return (
      <BaseBox>
        <BaseHeader>
          <span className="section-header section-header--sm">
            {header}
          </span>
        </BaseHeader>
        <BaseContent className="nobackground">
          <SendQuoteRow>
            <QuoteInfo
              checked={this.state.isAgreedReceivedEmailFromAXA}
              onChange={this._onAcceptReceivedEmailFromAXA}
              textInfo={privacy_policy[0]}
            />
          </SendQuoteRow>
          <SendQuoteRow>
            <QuoteInfo
              checked={this.state.isAggreedPersonalDetailsFromAXA}
              onChange={this._onAcceptPersonalDetailsFromAXA}
              textInfo={terms_and_conditions[0]}
            />
          </SendQuoteRow>
          <SendQuoteGroup>
            <SendQuoteGroupCol1>
              <SendQuoteLabel>
                <span>{I18n.t('quote-save.emailAddress')}</span>
              </SendQuoteLabel>
            </SendQuoteGroupCol1>
            {toastr.show &&
              <SendQuoteGroupCol2>
                <QuoteMessage type={toastr.type}>
                  {toastr.body}
                </QuoteMessage>
              </SendQuoteGroupCol2>
            }
          </SendQuoteGroup>
          <SendQuoteGroup>
            <SendQuoteGroupCol1>
              <TextField
                id="email"
                placeholder="example@gmail.com"
                onBlur={(ev) => this._onChange('email', ev)}
                value={this.state.email}
              />
            </SendQuoteGroupCol1>
            <SendQuoteGroupCol2>
              <button
                className="btn btn-ghost"
                onClick={this._sendEmail}
                disabled={disabledSendButton}
              >
                {I18n.t('quote-save.save')}
              </button>
            </SendQuoteGroupCol2>
          </SendQuoteGroup>
        </BaseContent>
      </BaseBox>
    );
  }
}

SendQuoteForm.propTypes = {
  profile: PropTypes.object,
  selection: PropTypes.object,
  sendEmail: PropTypes.func,
  step: PropTypes.object,
  partner: PropTypes.object,
  trackingReport: PropTypes.object,
  save_quote_terms: PropTypes.object,
  agent: PropTypes.object
};

function mapStateToProps({ i18n, profile, selection, step, partner, trackingReport, agent }) {
  const { translations: { en: { contento: { save_quote_terms } } } } = i18n;
  return {
    i18n,
    profile,
    selection,
    step,
    partner,
    trackingReport,
    agent,
    save_quote_terms: save_quote_terms[0] || {}
  };
}

export default connect(mapStateToProps)(SendQuoteForm);
