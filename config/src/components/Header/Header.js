import React, { Component } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { I18n } from "react-redux-i18n";
import { Glyphicon } from "react-bootstrap";

// Tag Commander
import { tagClick } from "../../lib/tag";
import {
  PLAN_SELECTION_CONTACT_US,
  CUSTOMER_DETAILS_CONTACT_US
} from "../../constants/tags";

class Header extends Component {
  constructor(props) {
    super(props);
    this._triggerCallUsTag = this._triggerCallUsTag.bind(this);
  }

  _triggerCallUsTag() {
    const { step } = this.props;
    if (step.current === 2) {
      tagClick(PLAN_SELECTION_CONTACT_US);
    } else if (step.current === 3) {
      tagClick(CUSTOMER_DETAILS_CONTACT_US);
    }
  }

  render() {
    const { i18n } = this.props;
    return (
      <header className="header header--subpages">
        <div className="header-meta hidden-sm-down">
          <div className="container">
            <nav className="header-meta-menu float-xs-right">
              <ul className="header-meta-menu-list">
                <li className="header-meta-menu-item" />
              </ul>
            </nav>
          </div>
        </div>

        <div className="header-main">
          <div className="container">
            <a
              href={'/travel-insurance'}
              className="header-brand"
            >
              <svg
                preserveAspectRatio="xMinYMin meet"
                viewBox="0 0 512 512"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M320.667 253.814l-37.712-.1L480.678.008 511.425 0 320.667 253.814z"
                  fill="#ff1721"
                />
                <path
                  d="M298.442 354.484c15.66-19.294 28.628-36.51 33.912-45.023l2.087-3.36.163 4.485c.09 2.466.373 5.445.63 6.62.628 2.86 3.673 12.924 7.843 25.92 1.883 5.87 3.49 10.98 3.57 11.358l.146.686h-48.907l.556-.686zM210.752 409.708c-2.757-8.54-3.97-12.712-3.797-13.057.435-.866 12.09-15.865 12.328-15.865.124 0 .67 1.338 1.21 2.973 1.885 5.698 5.696 16.41 6.62 18.61l.93 2.214-1.69 2.358c-5.074 7.083-11.175 15.317-11.35 15.317-.108 0-2.02-5.647-4.25-12.55zM101.462 354.79c.162-.21 3.035-3.813 6.384-8.006 8.2-10.27 16.55-21.16 21.075-27.5 3.84-5.374 8.305-12.172 8.305-12.64 0-.146.137-.265.304-.265.185 0 .304 1.358.304 3.466 0 1.906.21 4.685.466 6.175.515 2.992 3.335 12.51 8.404 28.365 1.83 5.725 3.328 10.494 3.328 10.597 0 .103-10.995.188-24.433.188-19.5 0-24.374-.077-24.138-.38z"
                  fill="#00008f"
                />
                <path
                  d="M511.695 511.91S.315 511.82.203 511.708C.09 511.597 0 459.46 0 459.46h10.978c10.07 0 11.017-.044 11.453-.533.263-.294 1.6-2.35 2.975-4.572 3.387-5.476 9.006-13.483 12.564-17.904 2.948-3.664 15.66-20.205 34.223-44.535l10.004-13.112h75.58l3.746 12.96 4.34 15.022.59 2.062L160.17 417c-19.426 25.198-22.406 28.796-29.935 36.147-3.44 3.36-5.21 5.3-5.145 5.64.092.482 1.41.527 17.88.6 9.78.043 17.964-.026 18.185-.153.222-.127 1.458-2.324 2.75-4.882 2.455-4.866 4.923-8.578 10.05-15.117 1.687-2.15 3.22-4.106 3.406-4.345.185-.24.42-.435.52-.435.187 0 2.267 6.425 3.663 11.31.412 1.442 1.13 4.92 1.596 7.73.484 2.93 1.028 5.294 1.273 5.538.356.357 3.418.427 18.542.427h18.116l.42-.686c.233-.377 1.436-2.603 2.676-4.947 1.24-2.343 3.304-5.667 4.586-7.386 3.32-4.45 9.142-11.155 9.434-10.86.694.698 3.738 12.02 4.69 17.445.624 3.56 1.198 6.017 1.44 6.17.454.29 45.677.366 46.423.08.264-.102.482-.35.482-.55 0-.198-1.18-2.482-2.624-5.074-5.554-9.973-5.155-8.908-15.953-42.562-2.697-8.407-4.904-15.448-4.904-15.646 0-.198 2.62-4.058 5.82-8.578l5.818-8.216 38.01.077 38.01.078 5.578 17.99c8.252 26.62 13.137 42.647 13.954 45.784.92 3.537 1.638 8.354 1.884 12.658.13 2.274.333 3.502.624 3.794.364.363 4.12.43 24.17.43 13.056 0 23.956-.083 24.22-.185.703-.27.61-.603-.615-2.197-2.235-2.91-5.89-11.374-10.44-24.19-2.66-7.483-8.313-24.683-15.914-48.417-2.71-8.454-5.33-16.476-5.83-17.827-1.722-4.673-24.928-85.657-25.394-88.624-.25-1.595-.605-4.34-.788-6.1-.184-1.76-.405-3.442-.492-3.735-.15-.5-1.33-.534-19.178-.534h-19.02l-1.336 2.822c-1.76 3.71-6.486 11.835-9.002 15.476-6.745 9.757-59.662 79.577-60.024 79.196-.265-.28-5.607-19.293-5.5-19.574.126-.327 11.45-14.763 37.675-48.035 12.288-15.59 18.12-22.302 23.18-26.682 1.357-1.174 2.467-2.374 2.467-2.668 0-.503-1.127-.534-19.51-.534h-19.51l-.152.687c-.084.377-.296 1.535-.473 2.574-.716 4.192-2.022 6.913-5.536 11.53-5.666 7.447-29.763 37.773-30.114 37.9-.132.048-.822-2.01-1.533-4.574-2.1-7.568-7.45-26.462-9.276-32.76-1.615-5.568-2.128-8.51-2.41-13.83l-.072-1.373-23.16-.078c-14.18-.048-23.27.033-23.444.21-.18.178.23 1.294 1.094 2.974 3.646 7.09 5.36 11.892 16.697 46.766 6.228 19.162 11.264 35.07 11.19 35.354-.22.836-11.903 15.582-12.148 15.33-.608-.625-25.192-81.055-25.746-84.23-.248-1.42-.73-5.4-1.073-8.845-.343-3.444-.686-6.57-.764-6.948l-.142-.686H129.403l-4.147 8.31c-2.28 4.57-5.182 10.044-6.446 12.164-2.886 4.837-21.25 29.448-47.754 63.996-5.468 7.128-13.017 17.008-16.776 21.956-14.306 18.833-27.67 35.965-42.676 54.712-5.627 7.03-10.535 13.136-10.907 13.57l-.675.788L0 0h481.946S429.63 68.322 324.52 204.315c-20.327 26.298-36.958 48.067-36.958 48.374 0 .32.29.636.686.74.9.243 27.924.24 28.825 0 .734-.197 1.177-.765 42.004-53.78 12.723-16.522 26.304-34.155 30.182-39.186C405.642 139.204 511.276.16 511.424 0l.27 511.91z"
                  fill="#00008f"
                />
              </svg>
            </a>
            <nav className="float-xs-right hidden-md-up mobile-nav">
              <a href={`tel:${I18n.t("header2.telNum")}`}>
                <Glyphicon glyph="earphone" />
              </a>
            </nav>

            <nav
              className="nav float-xs-right hidden-sm-down"
              data-fade="search"
              data-target="#overviewSearch"
              data-in="fade-in-delayed-xs-up"
              data-out="fade-out-xs-up"
            >
              <ul className="nav-list">
                <li className="nav-item">
                  {I18n.t("header2.needHelp")}
                  <a
                    onClick={() => this._triggerCallUsTag()}
                    href={`tel:${I18n.t("header2.telNum")}`}
                    className="nav-link"
                  >
                    <Glyphicon glyph="earphone" />
                    {I18n.t("header2.callHelp")}
                  </a>
                </li>
              </ul>
              <div
                className="nav-stroke"
                data-spy="stroke"
                data-target="#overviewNav"
              />
            </nav>
          </div>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  content: PropTypes.object,
  i18n: PropTypes.object,
  routing: PropTypes.object,
  onLanguageChange: PropTypes.func,
  step: PropTypes.object
};

function mapStateToProps({ content, i18n, step, routing }) {
  return {
    content,
    i18n,
    step,
    routing
  };
}

export default connect(mapStateToProps)(Header);
