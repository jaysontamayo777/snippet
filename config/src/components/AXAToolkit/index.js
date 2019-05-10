import styled from 'styled-components';

import Button from '@axa-asia/react-web-toolkit/lib/Button/Button';
import Checkbox from '@axa-asia/react-web-toolkit/lib/Checkbox/Checkbox';

import { DropdownList, Multiselect, DateTimePicker } from 'react-widgets';
import { Tooltip as BSTooltip } from 'reactstrap';

import {
  burntSienna,
  flamingo,
  axaBlue,
  silver,
  axaRed
} from '@axa-asia/frontend/lib/styling/colors';

import RadioButton from './radiobutton';
import TextField from './textfield';

export { RadioButton, TextField };

// existing from @axa-asia
export const BurntSiennaButton = styled(Button)`
  background-color: ${props =>
    props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${burntSienna} !important`};
  -webkit-font-smoothing: antialiased;
  font-weight: 600;
  display: ${props => (props.hide ? 'none' : 'flex')};
  align-items: center;
  justify-content: center;
  font-size: 12px;
  width: ${props => (props.fullWidth ? '100%' : 'auto')};
  text-transform: uppercase;
  margin-top: 15px;
  padding: 10px 30px;
  color: white !important;
  border-color: ${props =>
    props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
  border-style: solid;
  border-width: 0 0 2px 0;
  cursor: ${props => (props.disabled ? 'not-allowed !important' : 'default')};

  &:active {
    border-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
  }

  &::after {
    background-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
  }

  &:focus {
    border-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
    outline: none;
  }

  &:hover {
    border-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
  }
`;

export const BlueOutlinedButton = styled(Button)`
  && {
    background-color: transparent;
    border: 1px solid ${axaBlue};
    -webkit-font-smoothing: antialiased;
    font-weight: 600;
    display: ${props => (props.hide ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: ${axaBlue};
    width: ${props => (props.fullWidth ? '100%' : 'auto')};
    text-transform: uppercase;

    &:active {
      border-color: ${axaBlue};
      color: white;
    }

    &::after {
      background-color: ${axaBlue};
      color: white;
    }

    &:focus {
      border-color: ${axaBlue};
      outline: none;
      color: white;
    }

    &:hover {
      border-color: ${axaBlue};
      color: white;
    }
  }
`;

export const WhiteOutlinedButton = styled(Button)`
  && {
    background-color: transparent;
    border: 2px solid white;
    -webkit-font-smoothing: antialiased;
    font-weight: 600;
    display: ${props => (props.hide ? 'none' : 'flex')};
    align-items: center;
    justify-content: center;
    font-size: 12px;
    color: white;
    width: ${props => (props.fullWidth ? '100%' : 'auto')};
    text-transform: uppercase;
    margin-top: 15px;
    height: 40px;

    &:active {
      border-color: white;
      color: ${axaBlue};
    }

    &::after {
      background-color: white;
      color: ${axaBlue};
    }

    &:focus {
      border-color: white;
      outline: none;
      color: ${axaBlue};
    }

    &:hover {
      border-color: white;
      color: ${axaBlue};
    }
  }
`;

export const CheckBox = styled(Checkbox)`
  margin-bottom: 15px;
  && {
    span {
      font-size: 16px;
      padding-left: 25px;

      :hover {
        a {
          text-decoration: underline;
        }
      }
    }

    svg {
      top: 2px;
      height: 20px;
      width: 15px;
    }

    a {
      font-size: 16px;
    }
  }
`;

export const Dropdown = styled(DropdownList)`
  flex: 1;

  && {
    .rw-widget-input,
    .rw-list-option,
    .rw-multiselect-tag,
    .rw-list-optgroup,
    .rw-list {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
    }

    .rw-dropdown-list-input {
      padding-left: 0;
    }

    .rw-widget-container {
      height: 40px;
      padding-left: 10px;
    }

    .rw-widget-input {
      border-radius: 0;
      box-shadow: none !important;
      border-color: ${props => {
        let color = 'transparent !important';

        if (props.hasError) {
          color = `${axaRed} !important`;
        } else if (props.bordered) {
          color = `${silver} !important`;
        }
        return color;
      }};

      &:hover {
        border-color: ${props => {
          let color = `${axaBlue} !important`;

          if (props.hasError) {
            color = `${axaRed} !important`;
          } else if (props.disabled) {
            color = 'transparent !important';
          }
          return color;
        }};
      }
    }

    .rw-i {
      color: ${axaBlue};
      font-size: 16px;
    }

    input {
      font-size: 16px;
    }

    .rw-btn {
      width: 30px;
      opacity: 1;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export const MultiSelect = styled(Multiselect)`
  flex: 1;

  & {
    .rw-widget-input,
    .rw-list-option,
    .rw-multiselect-tag,
    .rw-list-optgroup,
    .rw-list {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;
    }
  }

  .rw-widget-container,
  .rw-input-reset {
    height: 38px !important;
    border-radius: 0;
    border-color: white !important;
    box-shadow: none !important;

    &:hover {
      border-color: ${axaBlue} !important;
    }
  }

  .rw-widget-input {
    border-radius: 0;
  }

  .rw-multiselect-tag {
    border: 1px solid #0f64d3;
    background: #0f64d3;
    color: white;
    border-radius: 10px;
  }
`;

export const DatePicker = styled(DateTimePicker)`
  flex: 1;

  && {
    font-size: 16px;
    -webkit-font-smoothing: antialiased;

    .rw-widget-input,
    .rw-btn,
    .rw-head-cell,
    .rw-cell {
      font-size: 16px;
      -webkit-font-smoothing: antialiased;

      ::placeholder {
        color: ${silver};
      }
    }

    .rw-widget-picker {
      border-radius: 0;
      box-shadow: none !important;
      border-color: ${props => {
        let color = 'transparent !important';
        if (props.hasError) {
          color = `${axaRed} !important`;
        } else if (props.bordered) {
          color = `${silver} !important`;
        }
        return color;
      }};
      height: 40px;

      &:hover {
        border-color: ${props => {
          let color = `${axaBlue} !important`;

          if (props.hasError) {
            color = axaRed;
          } else if (props.disabled) {
            color = 'transparent';
          }

          return color;
        }}
    }

    .rw-select-bordered {
      border: none;

      &:hover {
        background: ${props => (props.disabled ? 'inherit' : 'white')};
      }

      &:active {
        background: white;
        box-shadow: none;
      }
    }
    
    .rw-widget {
      border: 1px solid red;
    }
    
    .rw-calendar-popup {
      border: 1px solid red;
    }


    .rw-i {
      color: ${props => (props.hasError ? axaRed : axaBlue)};
      opacity: 1;
    }
  }
`;

export const Tooltip = styled(BSTooltip)`
  .tooltip-inner {
    background: #3a3fd8;
    -webkit-font-smoothing: antialiased;
    border-radius: 5px;

    ::before {
      content: ' ';
      height: 0;
      position: absolute;
      width: 0;
      left: -5px;
      top: calc(50% - 5px);
      border: 5px solid transparent;
      border-right-color: #3a3fd8;
    }
  }

  && {
    .arrow::before {
      border-bottom-color: #3a3fd8;
      border-top-color: #3a3fd8;
    }
  }
`;
