import React from 'react';
import PropTypes from 'prop-types';

class BaseContent extends React.Component {
  render() {
    const { opened, collapsing, className, id } = this.props;
    
    if(collapsing) { 
      return (
        <div id={id} className={`panel-collapse collapse ${opened ? 'in': ''}`}>
          <div className={`panel-body ${className}`}>
            {this.props.children}
          </div>
        </div>
      );
    } else {
      return (
        <div className={`panel-body ${className}`}>
          {this.props.children}
        </div>
      );
    }
  }
}

BaseContent.propTypes = {
  opened: PropTypes.bool,
  collapsing: PropTypes.bool,
  id: PropTypes.string,
	visible: PropTypes.bool,
  className: PropTypes.string,
  children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ])  
};

export default BaseContent;
