import styled from 'styled-components';
import { mineShaft, axaRed } from '@axa-asia/frontend/lib/styling/colors';
import { BlueOutlinedButton } from '../AXAToolkit';

export const Title = styled.h2`
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
  color: ${mineShaft};
  font-family: 'PublicoHeadlineWeb';
  margin: 0 0 10px 0;
`;

export const InlineForm = styled.div`
  display: flex;
`;

export const Button = styled(BlueOutlinedButton)`
  && {
    margin-left: 15px;
    min-width: 140px;
  }
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${axaRed};
  -webkit-font-smoothing: antialiased;
`;
