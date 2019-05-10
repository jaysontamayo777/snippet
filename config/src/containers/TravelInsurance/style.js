import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import { wildSand, mineShaft } from '@axa-asia/frontend/lib/styling/colors';

export const Wrapper = styled.div`
  background-color: ${wildSand};
`;

export const Section = styled.div`
  padding-top: 50px;
  padding-bottom: 50px;
  background: ${props => props.background};
  ${media.desktop`font-size: 34px;`};
`;

export const Title = styled.div`
  font-size: 28px;
  line-height: 1.3;
  letter-spacing: 1px;
  font-weight: bold;
  text-align: center;
  font-family: 'PublicoHeadlineWeb';
  color: ${mineShaft};
  margin-bottom: 30px;

  ${media.desktop`font-size: 34px;`};
  ${media.largeDesktop`font-size: 36px;`};
`;

export const Remarks = styled.div`
  font-size: 16px;
  text-align: center;
  margin-top: -25px;
  margin-bottom: 10px;
  font-weight: 600;
`;
