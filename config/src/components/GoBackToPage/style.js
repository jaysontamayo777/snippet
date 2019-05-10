import styled from 'styled-components';
import { axaBlue } from '@axa-asia/frontend/lib/styling/colors';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;
  font-size: 16px;
  color: ${axaBlue};
  margin-bottom: 50px;
  font-weight: 600;
  cursor: pointer;
`;

export const Arrow = styled.svg`
  margin-right: 5px;
  margin-bottom: -1px;
  transform: rotate(180deg);
`;
