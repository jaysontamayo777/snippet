import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { I18n } from 'react-redux-i18n';

import { currencySeparator } from '../../../utils/numberUtils';
import { scrollToId } from '../../../utils/scrollUtils';

import { Collapse } from 'reactstrap';
import { Dropdown, BurntSiennaButton } from '../../AXAToolkit';

import * as P from './style';

class PlansTableMobile extends Component {
  constructor(props, context) {
    super(props, context);

    this.state = {
      expand: '' || 0,
      activeIndex: 0,
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
    this.setState({ regionDisplay: region, activeIndex: 0 });
  };

  prevPlan = planIndex => {
    if (planIndex >= 1) {
      this.setState({ activeIndex: planIndex - 1 });
    }
  };

  nextPlan = (planIndex, maxLimit) => {
    if (planIndex < maxLimit) {
      this.setState({ activeIndex: planIndex + 1 });
    }
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
      profile,
      plans,
      selection,
      showDropDown,
      showPrices,
      enableSelection,
      onSelectPlan
    } = this.props;
    const { activeIndex, expand, regionDisplay } = this.state;
    const policyTypes = ['International', 'Domestic'];

    const destinationCoverageHeaders = i18n.translations.en.contento.packages_coverage_per_destination.filter(
      item => item.destination === regionDisplay
    );

    const destinationCoveragePackages = i18n.translations.en.contento.packages.filter(
      item => item.destination === regionDisplay
    );

    return (
      <div>
        {showDropDown && (
          <P.Selection>
            <P.Label>{destinationCoverageHeaders[0].title}</P.Label>
            <Dropdown
              data={policyTypes}
              value={regionDisplay}
              onChange={value => this.onChangeRegionDisplay(value)}
              style={{ borderBottom: '2px solid #00008f' }}
            />
          </P.Selection>
        )}

        <P.Table withSelectedPlan={!!selection.planId}>
          {destinationCoveragePackages.map((packages, packagesIndex) => (
            <P.TableColumn
              key={packagesIndex}
              active={packagesIndex === 1}
              prev={packagesIndex < activeIndex}
              next={packagesIndex > activeIndex}
            >
              <P.SelectedPlan>
                {packages.plan_id === selection.planId && enableSelection && (
                  <div>
                    Your Selected Plan <span />
                  </div>
                )}
              </P.SelectedPlan>

              <P.Head>
                <P.PlanFlag>
                  {packages.flag_label && <span>{packages.flag_label}</span>}
                </P.PlanFlag>
                <P.PlanType>{profile.coverage}</P.PlanType>
                <P.PlanName>{packages.plan_name}</P.PlanName>

                {destinationCoveragePackages.length > 1 && (
                  <P.Navigation pushRight={packagesIndex < 1}>
                    {packagesIndex > 0 && (
                      <P.NavButton
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        onClick={() => this.prevPlan(packagesIndex)}
                      >
                        <g
                          id="Group_163"
                          data-name="Group 163"
                          transform="translate(290.269 376.269) rotate(180)"
                        >
                          <g
                            id="Group_160"
                            data-name="Group 160"
                            transform="translate(121 200)"
                          >
                            <circle
                              id="Ellipse_10"
                              data-name="Ellipse 10"
                              cx="22.634"
                              cy="22.634"
                              r="22.634"
                              transform="translate(124 131)"
                              fill="#fff"
                            />
                          </g>
                          <g
                            id="Group_161"
                            data-name="Group 161"
                            transform="translate(263 360) rotate(-90)"
                          >
                            <line
                              id="Line_6"
                              data-name="Line 6"
                              x2="4.401"
                              y2="3.771"
                              transform="translate(0 7.884)"
                              fill="none"
                              stroke="#676767"
                              strokeLinecap="round"
                              strokeWidth="2"
                            />
                            <line
                              id="Line_7"
                              data-name="Line 7"
                              x1="4.401"
                              y2="3.771"
                              transform="translate(4.401 7.884)"
                              fill="none"
                              stroke="#676767"
                              strokeLinecap="round"
                              strokeWidth="2"
                            />
                            <line
                              id="Line_25"
                              data-name="Line 25"
                              y2="11.655"
                              transform="translate(4.401)"
                              fill="none"
                              stroke="#676767"
                              strokeLinecap="round"
                              strokeWidth="2"
                            />
                          </g>
                        </g>
                      </P.NavButton>
                    )}

                    {packagesIndex < destinationCoveragePackages.length - 1 && (
                      <P.NavButton
                        xmlns="http://www.w3.org/2000/svg"
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        onClick={() =>
                          this.nextPlan(
                            packagesIndex,
                            destinationCoveragePackages.length - 1
                          )
                        }
                      >
                        <g
                          id="Group_162"
                          data-name="Group 162"
                          transform="translate(-245 -331)"
                        >
                          <g
                            id="Group_160"
                            data-name="Group 160"
                            transform="translate(121 200)"
                          >
                            <circle
                              id="Ellipse_10"
                              data-name="Ellipse 10"
                              cx="22.634"
                              cy="22.634"
                              r="22.634"
                              transform="translate(124 131)"
                              fill="#fff"
                            />
                          </g>
                          <g
                            id="Group_161"
                            data-name="Group 161"
                            transform="translate(260 356) rotate(-90)"
                          >
                            <line
                              id="Line_6"
                              data-name="Line 6"
                              x2="4.401"
                              y2="3.771"
                              transform="translate(0 7.884)"
                              fill="none"
                              stroke="#676767"
                              strokeLinecap="round"
                              strokeWidth="2"
                            />
                            <line
                              id="Line_7"
                              data-name="Line 7"
                              x1="4.401"
                              y2="3.771"
                              transform="translate(4.401 7.884)"
                              fill="none"
                              stroke="#676767"
                              strokeLinecap="round"
                              strokeWidth="2"
                            />
                            <line
                              id="Line_25"
                              data-name="Line 25"
                              y2="11.655"
                              transform="translate(4.401)"
                              fill="none"
                              stroke="#676767"
                              strokeLinecap="round"
                              strokeWidth="2"
                            />
                          </g>
                        </g>
                      </P.NavButton>
                    )}
                  </P.Navigation>
                )}

                {showPrices &&
                  plans
                    .filter(
                      planPrices => planPrices.planId === packages.plan_id
                    )
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
                      onSelectPlan(packages.plan_id);
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
                    }}
                  >
                    {packages.plan_select}
                  </BurntSiennaButton>
                )}
              </P.Head>

              <P.Body>
                {destinationCoverageHeaders.map(headers =>
                  headers.items.map((header, headerIndex) => (
                    <div key={headerIndex}>
                      <P.BodyItem
                        heading
                        onClick={() => this.expandCoverage(headerIndex)}
                      >
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
                        {header.heading}
                      </P.BodyItem>

                      {packages.items.map(
                        (packageItem, packageItemIndex) =>
                          headerIndex === packageItemIndex &&
                          packageItem.major && (
                            <P.BodyItem key={packageItemIndex}>
                              {packageItem.major}
                            </P.BodyItem>
                          )
                      )}

                      {header.subheading &&
                        header.subheading.map((subHeader, subHeaderIndex) => (
                          <Collapse
                            isOpen={expand === headerIndex}
                            key={subHeaderIndex}
                          >
                            {subHeader.startsWith('>') ? (
                              <P.BodyItem>
                                <P.Row>
                                  <div>
                                    {ReactHtmlParser(subHeader.substr(2))}
                                  </div>

                                  {packages.items.map(
                                    (packageItem, packageItemIndex) =>
                                      headerIndex === packageItemIndex &&
                                      packageItem.minor.map(
                                        (minorItem, minorItemIndex) =>
                                          subHeaderIndex === minorItemIndex &&
                                          minorItem && (
                                            <div
                                              style={{ textAlign: 'center' }}
                                              key={minorItemIndex}
                                            >
                                              {ReactHtmlParser(minorItem)}
                                            </div>
                                          )
                                      )
                                  )}
                                </P.Row>
                              </P.BodyItem>
                            ) : (
                              <div>
                                <P.BodyItem subheading>
                                  {ReactHtmlParser(subHeader)}
                                </P.BodyItem>

                                {packages.items.map(
                                  (packageItem, packageItemIndex) =>
                                    headerIndex === packageItemIndex &&
                                    packageItem.minor.map(
                                      (minorItem, minorItemIndex) =>
                                        subHeaderIndex === minorItemIndex &&
                                        minorItem && (
                                          <P.BodyItem key={minorItemIndex}>
                                            {ReactHtmlParser(minorItem)}
                                          </P.BodyItem>
                                        )
                                    )
                                )}
                              </div>
                            )}
                          </Collapse>
                        ))}
                    </div>
                  ))
                )}
              </P.Body>
            </P.TableColumn>
          ))}
        </P.Table>
      </div>
    );
  }
}

PlansTableMobile.propTypes = {
  i18n: PropTypes.object,
  profile: PropTypes.object,
  plans: PropTypes.array,
  selection: PropTypes.object,
  showPrices: PropTypes.bool,
  showDropDown: PropTypes.bool,
  enableSelection: PropTypes.bool,
  onSelectPlan: PropTypes.func
};

function mapStateToProps({ i18n, profile, plans, selection }) {
  return {
    i18n,
    profile,
    plans,
    selection
  };
}

export default connect(mapStateToProps)(PlansTableMobile);
