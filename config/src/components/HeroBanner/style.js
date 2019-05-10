import styled from 'styled-components';
import {
  Container as BSContainer,
  CarouselIndicators as BSCarouselIndicators,
  CarouselControl as BSCarouselControl
} from 'reactstrap';
import { media } from '../../constants/mediaSizes';

export const Wrapper = styled.div`
  height: 430px;
  position: relative;

  ${media.tablet`height: 450px`};
  ${media.desktop`height: 560px`};
  ${media.largeDesktop`height: 660px`};
`;

export const Image = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: 50% 50%;
`;

export const ContentWrapper = styled.div`
  height: 100%;
  position: absolute;
  width: 100%;
`;

export const Container = styled(BSContainer)`
  height: 100%;
`;

export const Content = styled.div`
  height: 100%;
  width: 100%;
  float: right;
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding: 0 30px;

  ${media.tablet`width: 60%; padding: 0px;`};
  ${media.desktop`width: 50%;`};
`;

export const ProductName = styled.p`
  font-size: 12px;
  text-transform: uppercase;
  letter-spacing: 0.1px;
  color: white;

  ${media.tablet`font-size: 12px;`};
  ${media.desktop`font-size: 14px;`};
`;

export const Title = styled.p`
  font-family: 'PublicoHeadlineWeb';
  font-size: 28px;
  line-height: 1.17;
  letter-spacing: 1px;
  color: white;
  margin-bottom: 20px;
  width: 90%;

  ${media.landscapedPhone``};
  ${media.tablet`font-size: 30px;`};
  ${media.desktop`font-size: 36px;`};
`;

export const Lead = styled.p`
  font-size: 15px;
  font-weight: normal;
  -webkit-font-smoothing: antialiased;
  margin-top: -17px;
  color: white;
  margin-bottom: 15px;

  ${media.tablet`font-size: 15px; margin-bottom: 10px;`};
  ${media.desktop`font-size: 16px; margin-bottom: 15px;`};
`;

export const ButtonRow = styled.div`
  display: flex;
  justify-content: space-between;

  div {
    width: calc(50% - 8px);
  }
`;

export const CarouselIndicators = styled(BSCarouselIndicators)`
  && {
    li {
      margin: 0 5px;
    }
  }
`;

export const CarouselControl = styled(BSCarouselControl)`
  width: 8% !important;

  && {
    ${media.desktop`width: 15% !important;`};
  }
`;

export const Link = styled.a`
  display: flex;
  text-decoration: none;

  :hover {
    text-decoration: none;
  }
`;
