import styled from 'styled-components';
import {
  silver,
  axaBlue,
  mineShaft,
  axaRed
} from '@axa-asia/frontend/lib/styling/colors';

export const RadioWrapper = styled.div`
  display: flex;
  align-items: center;
  margin-right: 30px;
  cursor: default;
`;

export const RadioButton = styled.div`
  border: 1px solid ${silver};
  border-radius: 50%;
  height: 20px;
  width: 20px;
  margin-right: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: white;

  div {
    border: ${props => props.checked && `1px solid rgb(13, 46, 134)`};
    border-radius: 50%;
    height: 10px;
    width: 10px;
    background: ${props =>
      props.checked ? 'rgb(13, 46, 134)' : 'transparent'};
  }

  ${RadioWrapper}:hover & {
    border: ${props =>
      props.checked ? `1px solid ${silver}` : `1px solid rgb(13, 46, 134)`};

    div {
      border: 1px solid rgb(13, 46, 134);
    }
  }
`;

export const RadioLabel = styled.div`
  font-size: 16px;

  ${RadioWrapper}:hover & {
    color: rgb(13, 46, 134);
  }
`;

export const Textfield = styled.input`
  font-size: 16px;
  height: 40px;
  border-radius: 0px;
  border: ${props => {
    let border = '1px solid white';
    if (props.hasError) {
      border = `1px solid ${axaRed}`;
    } else if (props.bordered) {
      border = `1px solid ${silver}`;
    }
    return border;
  }};

  padding: 0 15px;
  color: ${mineShaft};
  width: 100%;
  display: ${props => (props.hide ? 'none' : 'block')};

  &::placeholder {
    color: ${silver};
    -webkit-font-smoothing: antialiased;
  }

  &:hover,
  &:active,
  &:focus {
    border: ${props =>
      props.hasError ? `1px solid ${axaRed}` : `1px solid ${axaBlue}`};
  }

  &:focus {
    outline: none;
    color: ${axaBlue};
  }
`;
