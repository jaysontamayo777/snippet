import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Row, Col } from 'react-grid-system';
import { I18n } from 'react-redux-i18n';
import routePaths from '../../constants/routePaths';
import browserHistory from '../../utils/browserHistory';

class NotFound extends Component {
  constructor(props) {
    super(props);

    this._onGoToHomePage = this._onGoToHomePage.bind(this);
  }

  _onGoToHomePage() {
    browserHistory.push(routePaths.INDEX);
  }

  render() {
    return (
      <div className="container">
        <Row>
          <Col xs={12} style={{ textAlign: 'center' }}>
            <h4>{I18n.t('messages.oops')}</h4>
            <p style={{ maxWidth: 'none' }}>{I18n.t('messages.cantFind')}</p>
            <p style={{ maxWidth: 'none' }}>
              <p onClick={this._onGoToHomePage}>
                {' '}
                {I18n.t('buttons.backToHomePage')}{' '}
              </p>
            </p>
          </Col>
        </Row>
      </div>
    );
  }
}

NotFound.propTypes = {
  i18n: PropTypes.object
};

function mapStateToProps({ i18n }) {
  return { i18n };
}

export default connect(
  mapStateToProps,
  null
)(NotFound);
