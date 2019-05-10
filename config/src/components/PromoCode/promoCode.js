import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import * as P from './style';
import { TextField } from '../AXAToolkit';

import { scrollToId } from '../../utils/scrollUtils';
import { getQuote } from '../../actions/quoteActions';
import { updateProfile } from '../../actions/profileActions';

class PromoCode extends Component {
  constructor(props) {
    super(props);
    this.state = {
      promoCode: props.profile.promoCode
    };

    this.onChange = this.onChange.bind(this);
    this.onAddPromoCode = this.onAddPromoCode.bind(this);
  }

  componentDidMount() {
    scrollToId('basket');
  }

  onAddPromoCode() {
    const { profile, selection, getQuote, updateProfile } = this.props;
    const { promoCode } = this.state;
    const newProfile = Object.assign({}, profile, { promoCode });
    updateProfile('promoCode', promoCode);
    getQuote(newProfile, selection);
  }

  onChange(ev) {
    this.setState({
      promoCode: ev.target.value
    });
  }

  render() {
    const { i18n, profile } = this.props;
    const { errors } = profile;

    return (
      <div>
        <P.Title>{i18n.translations.en.basket.promoCodeTitle}</P.Title>

        <P.InlineForm>
          <TextField
            type="text"
            placeholder={i18n.translations.en.basket.promoCodeField}
            onBlur={(ev) => this.onChange(ev)}
            bordered
            value={profile.promoCode}
            hasError={!!errors.promoCode}
          />

          <P.Button onClick={this.onAddPromoCode}>
            {i18n.translations.en.basket.applyPromoCode}
          </P.Button>
        </P.InlineForm>

        {errors.promoCode && (
          <P.ErrorMessage className="error-message">
            {errors.promoCode}
          </P.ErrorMessage>
        )}
      </div>
    );
    }
}

PromoCode.propTypes = {
  i18n: PropTypes.object,
  getQuote: PropTypes.func,
  profile: PropTypes.object,
  selection: PropTypes.object,
  updateProfile: PropTypes.func,
  plans: PropTypes.object
};

function mapStateToProps({ i18n, profile, selection, plans }) {
  return {
    i18n,
    profile,
    selection,
    plans
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      getQuote,
      updateProfile
    },
    dispatch
  );
}

export default connect(mapStateToProps, mapDispatchToProps)(PromoCode);

