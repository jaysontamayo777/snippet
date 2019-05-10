import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import { mineShaft } from '@axa-asia/frontend/lib/styling/colors';

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

export const List = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

export const Item = styled.div`
  text-align: center;
  flex-basis: 50%;
  margin-bottom: 40px;

  ${media.landscapedPhone`flex-basis: 33.33%;`};
  ${media.desktop`flex: 1; flex-basis: 0; margin-bottom: 0`};
`;

export const Image = styled.img`
  height: 65px;
  margin-bottom: 15px;

  ${media.landscapedPhone`height: 80px;`};
`;

export const Name = styled.div`
  font-weight: bold;
  text-transform: capitalize;
  padding: 0 5px;
  min-height: 75px;
  font-size: 16px;
`;

export const Description = styled.div`
  padding: 0 15px;
  font-size: 16px;
  line-height: 1.3;
`;
