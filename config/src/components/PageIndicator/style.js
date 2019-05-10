import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import { silver, axaBlue } from '@axa-asia/frontend/lib/styling/colors';

export const Wrapper = styled.div`
  border-top: 1px solid ${silver};
  border-bottom: 1px solid ${silver};
  z-index: 1;
  margin-bottom: 15px;
  background: white;

  &::-webkit-scrollbar {
    display: none;
  }

  ${media.tablet`margin-bottom: 20px;`};
  ${media.desktop`margin-bottom: 30px;`};
`;

export const PageList = styled.div`
  display: flex;

  ${media.tablet`border-right: 1px solid ${silver};`};
`;

export const PageListItem = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  cursor: ${props =>
    props.active ? 'default' : props.completed ? 'pointer' : 'not-allowed'};

  ${media.tablet`padding: 15px; border-left: 1px solid ${silver};`};

  p {
    margin: 0;
    font-weight: ${props => (props.active ? '600' : 'normal')};
    color: ${props =>
      props.active ? axaBlue : props.completed ? axaBlue : silver};
    -webkit-font-smoothing: antialiased;
    display: none;

    ${media.tablet`display: block; font-size: 14px;`};
    ${media.desktop`font-size: 16px;`}
  }

  span {
    border: ${props =>
      props.active
        ? `1px solid ${axaBlue}`
        : props.completed
        ? `1px solid ${axaBlue}`
        : `1px solid ${silver}`};
    color: ${props =>
      props.active ? 'white' : props.completed ? axaBlue : silver};
    margin-right: 10px;
    border-radius: 50%;
    height: 30px;
    width: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 13px;
    background: ${props => (props.active ? axaBlue : 'white')};

    ${media.landscapedPhone`
      height: 35px;
      width: 35px;
    `}

    ${media.tablet`
      height: 25px;
      width: 25px;
    `};
  }
`;
