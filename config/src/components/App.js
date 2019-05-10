import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { I18n } from 'react-redux-i18n';

import Loader from './Loader/Loader';
import ProductPageHeader from './Header/ProductPageHeader';
import Header from './Header/Header';
import ProgressBar from './ProgressBar/ProgressBar';
import Footer from './Footer';

import ReactWindowResizeListener from 'window-resize-listener-react';
import Sticky from 'react-sticky-el';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: process.env.NODE_ENV === 'test' ? props.loading : true
    };
  }

  componentDidMount() {
    setTimeout(() => this.setState({ loading: false }), 1500); // eslint-disable-line
  }

  _onResize = ({ windowWidth }) => {
    windowWidth < 991
      ? this.setState({ isMobile: true })
      : this.setState({ isMobile: false });
  };

  render() {
    const { loading, isMobile } = this.state;

    if (loading) {
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
          </Helmet>
          <div className="full-height">
            {this.props.step.current === 1 ? (
              <ProductPageHeader />
            ) : (
              <span>
                <ReactWindowResizeListener
                  handleWidth={true}
                  handleHeight={false}
                  onResize={this._onResize}
                />
                <Header />
                <Sticky
                  disabled={!isMobile}
                  stickyStyle={{
                    zIndex: 10,
                    background: '#fafafa',
                    top: '-1px !important'
                  }}
                >
                  <ProgressBar />
                </Sticky>
              </span>
            )}
            {this.props.children}
          </div>
          <Footer />
        </div>
      );
    }
  }
}

App.propTypes = {
  loading: PropTypes.bool,
  children: PropTypes.element,
  step: PropTypes.object,
  i18n: PropTypes.object
};

function mapStateToProps({ step, i18n }) {
  return {
    step,
    i18n
  };
}

export default connect(mapStateToProps)(App);
