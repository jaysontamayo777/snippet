import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { Textfield } from './style';

class TextField extends Component {
  constructor(props) {
    super(props);
    this.state = {
      initialValue: props.value
    };
  }

  onChange = e => {
    this.setState({
      initialValue: e.target.value.toUpperCase()
    });
  };

  onFocus = e => {
    this.props.onFocus && this.props.onFocus(e.target.value);
  }

  render() {
    const {
      placeholder,
      onBlur,
      hasError,
      bordered,
      hide,
      maxLength
    } = this.props;
    const { initialValue } = this.state;

    return (
      <Textfield
        hasError={hasError}
        maxLength={maxLength}
        bordered={bordered}
        hide={hide}
        type="text"
        value={initialValue}
        placeholder={placeholder}
        onBlur={onBlur}
        onChange={e => this.onChange(e)}
        onFocus={e => this.onFocus(e)}
        autoComplete="none"
      />
    );
  }
}

TextField.propTypes = {
  value: PropTypes.string,
  placeholder: PropTypes.string,
  maxLength: PropTypes.number,
  hasError: PropTypes.bool,
  bordered: PropTypes.bool,
  hide: PropTypes.bool,
  onBlur: PropTypes.func
};

TextField.defaultProps = {
  value: '',
  placeholder: '',
  onBlur: function onBlur() {}
};

export default TextField;
