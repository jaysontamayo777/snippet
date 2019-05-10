import React, { Component } from 'react';
import PropTypes from 'prop-types';

import * as L from './style';
class Loader extends Component {
  render() {
    const { id, loadingMessage } = this.props;

    return (
      <L.Wrapper id={id}>
        <div className="loading-spinner-animation" />
        <L.Caption>{loadingMessage || 'Loading...'}</L.Caption>
      </L.Wrapper>
    );
  }
}

Loader.propTypes = {
  id: PropTypes.string,
  loadingMessage: PropTypes.string
};

export default Loader;
