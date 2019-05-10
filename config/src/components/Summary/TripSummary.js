import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';
import { bindActionCreators } from 'redux';

import { selectAddOn } from '../../actions/planActions';
import { getQuote } from '../../actions/quoteActions';
import { updateProfile } from '../../actions/profileActions';
import { currencySeparator } from '../../utils/numberUtils';

import * as S from './style';

class TripSummary extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      collapsed: false
    };
  }


  collapseBody = () => {
    const { collapsed } = this.state;

    this.setState({
      collapsed: !collapsed
    });
  };

  render() {
    let { profile, collapsing, selection } = this.props;
    const { collapsed } = this.state;

    let isPriceZero = (value) => {
      return value === '0.00';
    };

    return (
      <div>
        <S.Wrapper>
          <S.Header onClick={this.collapseBody}>
            <S.Title>Total Premium & Taxes</S.Title>
            <S.TotalPrice>
              {I18n.t('currency.phpLeft')}
              {currencySeparator(selection.totalPremium && selection.totalPremium.groupPolicy)}
            </S.TotalPrice>
          </S.Header>

          <S.Body isOpen={collapsing ? collapsed : true}>
            {
              isPriceZero(selection.totalSavings) ?  '' :
                (
                  <S.Bodyheader>
                    <S.BodyheaderTitle>TOTAL SAVINGS</S.BodyheaderTitle>
                    <S.BodyheaderPrice>
                      {I18n.t('currency.phpLeft')}
                      {currencySeparator(selection.totalSavings)}
                    </S.BodyheaderPrice>
                  </S.Bodyheader>
                ) 
            }
            <S.ProductName>Travel Insurance</S.ProductName>
            <S.Row>
              <span>Net Premium</span>
              <span>
                {I18n.t('currency.phpLeft')}
                {currencySeparator(selection.netPremium && selection.netPremium.groupPolicy)}
              </span>
            </S.Row>
            <S.Row>
              <S.Region>{selection.planName} ({profile.region})</S.Region>
            </S.Row>
            <S.Row>
              <span>Local Gov't Tax</span>
              <span>
                {I18n.t('currency.phpLeft')}
                {currencySeparator(selection.localGovtTax && selection.localGovtTax.groupPolicy)}
              </span>
            </S.Row>
            <S.Row>
              <span>Premium Tax</span>
              <span>
                {I18n.t('currency.phpLeft')}
                {currencySeparator(selection.premiumTax && selection.premiumTax.groupPolicy)}
              </span>
            </S.Row>
            <S.Row>
              <span>Documentary Stamp Tax</span>
              <span>
                {I18n.t('currency.phpLeft')}
                {currencySeparator(selection.docStampTax && selection.docStampTax.groupPolicy)}
              </span>
            </S.Row>
          </S.Body>
        </S.Wrapper>
      </div>
    );
  }
}

TripSummary.propTypes = {
  i18n: PropTypes.object,
  selection: PropTypes.object,
  profile: PropTypes.object,
  collapsing: PropTypes.bool,
  plans: PropTypes.array,
  step: PropTypes.object
};

function mapStateToProps({ i18n, selection, profile, plans, step }) {
  return {
    i18n,
    selection,
    profile,
    plans,
    step
  };
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(
    {
      selectAddOn,
      getQuote,
      updateProfile
    },
    dispatch
  );
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TripSummary);
