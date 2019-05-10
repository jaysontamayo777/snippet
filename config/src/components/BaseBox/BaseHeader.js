import React from 'react';
import PropTypes from 'prop-types';

class BaseHeader extends React.Component {
  render() {
    const { className = '', toggleCollapse, withAccordion, bodyTarget, hidePanelIcon = false } = this.props;
    if(toggleCollapse) { 
      return (
        <div className={`panel-heading collapsed ${withAccordion && 'accordion-toggle'} ${className}`}>
            {this.props.children}
         { !hidePanelIcon && 
            <a className={`panel-button collapsed ${withAccordion && 'accordion-toggle'} ${className}`} data-toggle="collapse" data-target={bodyTarget} href={bodyTarget}>&nbsp;</a>
         } 
        </div>
      );
    } else {
      return (
        <div className={`panel-heading ${className}`}>
          {this.props.children}
        </div>
      );
    }
  }
}

BaseHeader.propTypes = {
  className: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ]),
  toggleCollapse: PropTypes.bool,
  withAccordion: PropTypes.bool,
  bodyTarget: PropTypes.string,
  hidePanelIcon: PropTypes.bool
};

export default BaseHeader;
