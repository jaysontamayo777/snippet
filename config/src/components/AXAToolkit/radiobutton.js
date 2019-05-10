import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { RadioWrapper, RadioButton, RadioLabel } from './style';

class Radio extends Component {
  render() {
    const { label, checked, onClick } = this.props;
    return (
      <RadioWrapper onClick={onClick}>
        <RadioButton checked={checked}>
          <div />
        </RadioButton>
        <RadioLabel>{label}</RadioLabel>
      </RadioWrapper>
    );
  }
}

Radio.propTypes = {
  label: PropTypes.string.isRequired,
  checked: PropTypes.bool,
  onClick: PropTypes.func
};

Radio.defaultProps = {
  label: '',
  checked: false,
  onClick: function onClick() {}
};

export default Radio;
