import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';

class TopBar extends Component {
  render() {
    let notificationType = I18n.t('contento.contents_with_type.notification.type') === 'Commercial'
      ? 'content'
      : I18n.t('contento.contents_with_type.notification.type').toLowerCase();

    return (
      I18n.t('contento.contents_with_type.notification.content') !== 'content' ?
        <marquee className={`alert top-content-bar top-content-bar--${notificationType}`} role="alert">
          <div className="top-content-bar-message">
            {ReactHtmlParser(I18n.t('contento.contents_with_type.notification.content'))}
          </div>
        </marquee>
      : ''
    );
  }
}

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}


export default connect(
  mapStateToProps
)(TopBar);
