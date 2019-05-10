/* eslint-disable react/prop-types, max-len */
import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Switch, Route } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { I18n } from 'react-redux-i18n';

import Loader from '../../components/Loader/Loader';
import PageIndicator from '../../components/PageIndicator';
import NotFound from '../../components/NotFound/NotFound';
import Header from '../../components/Header/Header';
import ContactUs from '../../components/ContactUs';
import Footer from '../../components/Footer';
import ProductPageHeader from '../../components/Header/ProductPageHeader';
import Drawer from '../../components/Drawer/Drawer';
import TravelInsurancePage from '../TravelInsurance/TravelInsurancePage';
import PlanSelectionPage from '../PlanSelection/PlanSelectionPage';
import CustomerDetailsPage from '../CustomerDetails/CustomerDetailsPage';
import PaymentConfirmationPage from '../Payment/PaymentConfirmationPage';
import RetrieveQuotePage from '../RetrieveQuote/RetrieveQuotePage';
import CustomerReviewPage from '../CustomerReview/CustomerReviewPage';

class RouteWrapper extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: process.env.NODE_ENV === 'test' ? props.loading : true
    };

    this.state = {
      routeTable: this.buildRoutable(),
      openSideMenu: false
    };
  }

  buildRoutable() {
    const basePath = this.props.match.path;
    return [
      {
        path: `${basePath}`,
        component: TravelInsurancePage,
        exact: true
      },
      {
        path: `${basePath}/plan-selection`,
        component: PlanSelectionPage,
        exact: true
      },
      {
        path: `${basePath}/customer-details`,
        component: CustomerDetailsPage,
        exact: true
      },
      {
        path: `${basePath}/payment-confirmation/:status`,
        component: PaymentConfirmationPage
      },
      {
        path: `${basePath}/retrieve-quote`,
        component: RetrieveQuotePage
      },
      {
        path: `${basePath}/customer-review`,
        component: CustomerReviewPage,
        exact: true
      },
      {
        component: NotFound
      }
    ];
  }

  _openSideMenu = menu => {
    this.setState({
      openSideMenu: menu
    });
  };

  render() {
    const { openSideMenu } = this.state;
    const { content } = this.props;
    const routes = this.state.routeTable.map((r, i) => (
      <Route key={i} {...r} />
    ));

    const current_path = this.props.location.pathname.replace(/\/$/, '');
    if (content.updateState === -1) {
      return <Loader />;
    } else {
      return (
        <div>
          <Helmet>
            <meta charSet="utf-8" />
            <meta
              name="description"
              content={I18n.t('contento.seo_tags.0.description')}
            />
            <meta
              name="keywords"
              content={I18n.t('contento.seo_tags.0.keywords')}
            />

            <title>{I18n.t('pagetitle.title')}</title>
          </Helmet>
          <ProductPageHeader onOpenSideMenu={this._openSideMenu} />

          { current_path !== this.props.match.path && <PageIndicator /> }
         
          <Switch {...this.props}>{routes}</Switch>

          <ContactUs />

          <Footer />

          <Drawer
            isMenuOpen={openSideMenu}
            onOpenSideMenu={this._openSideMenu}
          />
        </div>
      );
    }
  }
}

RouteWrapper.propTypes = {
  match: PropTypes.object.isRequired
};

function mapStateToProps({ step, content }) {
  return {
    step,
    content
  };
}

export default connect(mapStateToProps)(RouteWrapper);
