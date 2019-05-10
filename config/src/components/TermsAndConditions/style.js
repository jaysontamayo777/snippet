import styled from 'styled-components';
import { silver, axaRed } from '@axa-asia/frontend/lib/styling/colors';

export const Wrapper = styled.div`
  border: 1px solid ${props => (props.hasError ? axaRed : silver)};
  margin-bottom: 30px;
`;

export const Header = styled.div`
  border-bottom: 1px solid ${silver};
  font-family: 'PublicoHeadlineWeb';
  font-size: 26px;
  padding: 25px 30px;
`;

export const Body = styled.div`
  padding: 25px 30px;
`;
