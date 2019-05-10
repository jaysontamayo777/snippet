import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { I18n } from 'react-redux-i18n';

import { currencySeparator } from '../../utils/numberUtils';
import { scrollToId } from '../../utils/scrollUtils';
import { tagClickPH } from '../../lib/tag.js';
import { 
  PLANS_TABLE_SELECTION 
} from '../../constants/tags.js';

import Loader from '../Loader/Loader';

import { BurntSiennaButton, Dropdown } from '../AXAToolkit';
import * as P from './style';

class PlansTable extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expand: '' || 0,
      regionDisplay:
        props.profile.region === 'DOMESTIC' ? 'Domestic' : 'International'
    };
  }

  componentDidUpdate = prevProps => {
    const { profile } = this.props;

    if (profile.region !== prevProps.profile.region) {
      this.setState({
        regionDisplay:
          profile.region === 'DOMESTIC' ? 'Domestic' : 'International'
      });
    }
  };

  onChangeRegionDisplay = region => {
    this.setState({ regionDisplay: region });
  };

  expandCoverage = item => {
    const { expand } = this.state;

    item === expand
      ? this.setState({ expand: '' })
      : this.setState({ expand: item });
  };

  render() {
    const {
      i18n,
      plans,
      profile,
      selection,
      showDropDown,
      showPrices,
      enableSelection,
      onSelectPlan,
      quote
    } = this.props;
    const { expand, regionDisplay } = this.state;
    const policyTypes = ['International', 'Domestic'];

    const destinationCoverageHeaders = i18n.translations.en.contento.packages_coverage_per_destination.filter(
      item => item.destination === regionDisplay
    );
    const destinationCoveragePackages = i18n.translations.en.contento.packages.filter(
      item => item.destination === regionDisplay
    );

    if (quote.isLoading && showPrices) {
      return <Loader id="plans-table" loadingMessage="Calculating prices..." />;
    } else {
      return (
        <P.Table id="plans-table">
          <P.Head>
            {destinationCoverageHeaders.map((item, index) => (
              <P.HeadItem key={index}>
                {showDropDown && (
                  <div>
                    {item.title}
                    <Dropdown
                      data={policyTypes}
                      value={regionDisplay}
                      onChange={value => this.onChangeRegionDisplay(value)}
                      style={{ borderBottom: '2px solid #00008f' }}
                    />
                  </div>
                )}
              </P.HeadItem>
            ))}

            {destinationCoveragePackages.map((item, index) => (
              <P.HeadItem
                key={index}
                selected={item.plan_id === selection.planId && enableSelection}
              >
                {item.plan_id === selection.planId && enableSelection && (
                  <P.SelectedPlan>Your Selected Plan</P.SelectedPlan>
                )}

                <P.PlanFlag>
                  {item.flag_label && <span>{item.flag_label}</span>}
                </P.PlanFlag>
                <P.PlanType>{profile.coverage}</P.PlanType>
                <P.PlanName>{item.plan_name}</P.PlanName>

                {showPrices &&
                  plans
                    .filter(planPrices => planPrices.planId === item.plan_id)
                    .map((planPrice, planPriceIndex) => (
                      <P.PlanPrice key={planPriceIndex}>
                        {I18n.t('currency.phpLeft')}
                        {currencySeparator(planPrice.netPremium.groupPolicy)}
                      </P.PlanPrice>
                    ))}

                {enableSelection ? (
                  <BurntSiennaButton
                    fullWidth
                    onClick={e => {
                      e.preventDefault();
                      onSelectPlan(item.plan_id);
                    }}
                  >
                    Select
                  </BurntSiennaButton>
                ) : (
                  <BurntSiennaButton
                    fullWidth
                    onClick={e => {
                      e.preventDefault();
                      scrollToId('getAQuote', 70);
                      tagClickPH(PLANS_TABLE_SELECTION[item.plan_name]);
                    }}
                  >
                    {item.plan_select}
                  </BurntSiennaButton>
                )}
              </P.HeadItem>
            ))}
          </P.Head>

          <P.Body>
            {destinationCoverageHeaders.map(headers =>
              headers.items.map((header, headerIndex) => (
                <P.BodyRow key={headerIndex}>
                  <P.MainItem onClick={() => this.expandCoverage(headerIndex)}>
                    <P.BodyItem main>
                      <P.ArrowContainer>
                        {header.subheading && (
                          <P.Arrow
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 16 16"
                            isOpen={expand === headerIndex}
                          >
                            <path
                              fill="#00008F"
                              fillRule="nonzero"
                              d="M4.175 5L8 8.825 11.825 5 13 6.183l-5 5-5-5z"
                            />
                          </P.Arrow>
                        )}
                      </P.ArrowContainer>
                      <P.MainHeading>{header.heading}</P.MainHeading>
                    </P.BodyItem>

                    {destinationCoveragePackages.map(packages =>
                      packages.items.map(
                        (packageItem, packageItemsIndex) =>
                          headerIndex === packageItemsIndex && (
                            <P.BodyItem
                              center
                              key={packageItemsIndex}
                              selected={
                                packages.plan_id === selection.planId &&
                                enableSelection
                              }
                            >
                              {packageItem.major}
                            </P.BodyItem>
                          )
                      )
                    )}
                  </P.MainItem>
                  <P.Collapse isOpen={expand === headerIndex}>
                    {header.subheading &&
                      header.subheading.map((sub, subIndex) => (
                        <P.MinorItem key={subIndex}>
                          {sub.startsWith('>') ? (
                            <P.BodyItem sub>
                              {ReactHtmlParser(sub.substr(2))}
                            </P.BodyItem>
                          ) : (
                            <P.BodyItem>{ReactHtmlParser(sub)}</P.BodyItem>
                          )}

                          {destinationCoveragePackages.map(packages =>
                            packages.items.map(
                              (packageItem, packageItemIndex) =>
                                headerIndex === packageItemIndex &&
                                packageItem.minor.map(
                                  (minorItem, minorItemsIndex) =>
                                    subIndex === minorItemsIndex && (
                                      <P.BodyItem
                                        center
                                        key={minorItemsIndex}
                                        selected={
                                          packages.plan_id ===
                                            selection.planId && enableSelection
                                        }
                                      >
                                        {ReactHtmlParser(minorItem)}
                                      </P.BodyItem>
                                    )
                                )
                            )
                          )}
                        </P.MinorItem>
                      ))}
                  </P.Collapse>
                </P.BodyRow>
              ))
            )}

            {enableSelection && (
              <P.BodyRow>
                <P.MinorItem>
                  <P.BodyItem />
                  {destinationCoveragePackages.map((item, index) => (
                    <P.BodyItem
                      key={index}
                      selected={item.plan_id === selection.planId}
                    >
                      <BurntSiennaButton
                        fullWidth
                        onClick={e => {
                          e.preventDefault();
                          onSelectPlan(item.plan_id);
                        }}
                      >
                        Select
                      </BurntSiennaButton>
                    </P.BodyItem>
                  ))}
                </P.MinorItem>
              </P.BodyRow>
            )}
          </P.Body>
        </P.Table>
      );
    }
  }
}

PlansTable.propTypes = {
  i18n: PropTypes.object,
  profile: PropTypes.object,
  quote: PropTypes.object,
  plans: PropTypes.array,
  selection: PropTypes.object,
  showDropDown: PropTypes.bool,
  showPrices: PropTypes.bool,
  enableSelection: PropTypes.bool,
  onSelectPlan: PropTypes.func
};

PlansTable.defaultProps = {
  showDropDown: false,
  showPrices: false,
  enableSelection: false
};

function mapStateToProps({ i18n, profile, quote, plans, selection }) {
  return {
    i18n,
    profile,
    quote,
    plans,
    selection
  };
}

export default connect(mapStateToProps)(PlansTable);
