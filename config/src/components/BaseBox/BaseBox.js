import React from 'react';
import PropTypes from 'prop-types';

class BaseBox extends React.Component {
  render() {
    const { id = '', className = '' } = this.props;
    return (
      <div className={`panel panel-default ${className}`} id={id}>
        {this.props.children}
      </div>
    );
  }
}

BaseBox.propTypes = {
	id: PropTypes.string,
	className: PropTypes.string,
	children: PropTypes.oneOfType([ PropTypes.array, PropTypes.object ])
};

export default BaseBox;
