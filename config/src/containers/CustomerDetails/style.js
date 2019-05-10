import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import { axaRed } from '@axa-asia/frontend/lib/styling/colors';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${media.desktop`flex-direction: row;`};
`;

export const Forms = styled.div`
  flex: 1;
  order: 2;

  ${media.desktop`order: 1; margin-right: 10px; width: 60%;`};
`;

export const Basket = styled.div`
  flex: 1;
  order: 1;
  margin-bottom: 15px;

  ${media.desktop`order: 2; margin-left: 10px;`};
`;

export const SubmitForDesktop = styled.div`
  display: none;

  ${media.desktop`display: block; padding-bottom: 5px`};
`;

export const SubmitForMobile = styled.div`
  display: block;
  margin-top: -10px;

  ${media.desktop`display: none`};
`;

export const ButtonBlockNext = styled.div`
  && {
    margin: 20px 0 40px ${media.tablet`margin: 40px 0 10px;`};

    button {
      font-size: 14px;
    }
  }
`;

export const Sticky = styled.div`
  display: block;
  width: ${props => props.stickyWidth};
  position: ${props => {
    let position = 'relative';

    if (props.startSticky) {
      position = 'fixed';
    } else if (props.stopSticky) {
      position = 'absolute';
    }
    return position;
  }};
  margin-top: ${props => props.stickyHeight};
  /* position: ${props => (props.startSticky ? 'fixed' : 'relative')};  */
  top: ${props => (props.startSticky ? '0' : 'auto')};
`;

export const ErrorList = styled.ul`
  padding-bottom: 20px;
  color: ${axaRed};
  -webkit-font-smoothing: antialiased;
  font-size: 13px;
  line-height: 1.5;
  padding: 0 15px;
  margin-top: 20px;

  ${media.desktop`margin-top: 0px;`};
`;
