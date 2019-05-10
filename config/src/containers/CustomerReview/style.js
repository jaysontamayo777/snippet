import styled from 'styled-components';
import {
  burntSienna,
  flamingo,
} from '@axa-asia/frontend/lib/styling/colors';

import { media } from '../../constants/mediaSizes';

// existing from @axa-asia
export const ReviewPageButton = styled.button`
  width: 100% !important;
  background-color: ${burntSienna} !important;
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
  border-color: ${flamingo} !important;
  border-style: solid;
  border-width: 0 0 2px 0;

  &:active {
    border-color: ${flamingo} !important;
  }

  &::after {
    background-color: ${flamingo} !important;
  }

  &:focus {
    border-color: ${flamingo} !important;
    outline: none;
  }

  &:hover {
    border-color: ${flamingo} !important;
  }
`;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${media.desktop`flex-direction: row;`};
`;

export const ReviewBlock = styled.div`
  && {
    flex: 1;
    order: 2;
  
    ${media.desktop`order: 1; margin-right: 10px;  width: 50%;`};
  }
`;

export const Basket = styled.div`
  flex: 1;
  order: 1;
  margin-bottom: 15px;

  ${media.desktop`order: 2; margin-left: 10px; width: 50%;`};
`;

export const HiddenOnMobile = styled.div`
  display: none;

  ${media.tablet`
    display: block;
  `};
`;

export const VisibleOnMobile = styled.div`
  display: block;

  ${media.tablet`
    display: none;
  `};
`;

export const ButtonBlockNext = styled.div`
  && {
    margin: 20px 0 40px

    ${media.tablet`margin: 40px 0 10px;`};

    button {
      font-size: 14px;
    }
  }
`;
