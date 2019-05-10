import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import { Collapse } from 'reactstrap';
import { mineShaft, darkIndigo } from '@axa-asia/frontend/lib/styling/colors';

export const Title = styled.div`
  font-size: 28px;
  line-height: 1.3;
  letter-spacing: 1px;
  font-weight: bold;
  text-align: center;
  font-family: 'PublicoHeadlineWeb';
  color: ${mineShaft};
  margin-bottom: 30px;
  text-transform: capitalize;

  ${media.desktop`font-size: 34px;`};
  ${media.largeDesktop`font-size: 36px;`};
`;

export const Content = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const Item = styled.div`
  flex: 1;
  min-width: calc(100% - 20px);
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 10px 30px 10px;

  ${media.landscapedPhone`min-width: calc(50% - 20px);`};
  ${media.tablet`min-width: calc(33.33% - 20px);`};
`;

export const Container = styled.div`
  width: 100%;

  ${media.landscapedPhone`width: 250px;`};
  ${media.tablet`width: 220px;`};
  ${media.desktop`width: 295px;`};
  ${media.largeDesktop`width: 357px;`};
`;

export const Image = styled.img`
  width: 100%;
`;

export const Question = styled.div`
  width: 100%;
  font-size: 16px;
  font-weight: 600;
  line-height: 1.3;
  margin: 15px 0 10px 0;

  ${media.landscapedPhone`min-height: 35px;`};
`;

export const ShowMore = styled.div`
  width: 100%;
  font-size: 12px;
  color: ${darkIndigo};
  cursor: pointer;
  line-height: 1.3;
`;

export const Answer = styled(Collapse)`
  margin-top: 15px;
  width: 100%;
  font-size: 16px;
  line-height: 1.3;
`;
