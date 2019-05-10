import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import {
  wildSand,
  axaBlue,
  burntSienna
} from '@axa-asia/frontend/lib/styling/colors';

export const Wrapper = styled.div`
  height: 60px;
  background: white;
  border-bottom: 2px solid ${wildSand};
  z-index: 1007;
  position: ${props => (props.fixedOnTop ? 'fixed;' : 'relative')};
  top: 0;
  left: 0;
  right: 0;

  ${media.desktop`height: 72px;`};
`;

export const SectionList = styled.ul`
  display: flex;
  padding: 0;
  height: 60px;
  margin-left: -15px;
  margin-right: -15px;

  ::-webkit-scrollbar {
    display: none;
  }

  ${media.desktop`height: 72px; margin-left: 0px;
  margin-right: 0px;`};
`;

export const SectionListItem = styled.li`
  list-style: none;
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  font-size: 12px;
  text-transform: uppercase;
  color: ${axaBlue};
  font-weight: 600;
  letter-spacing: 0.08em;
  cursor: pointer;
  border-bottom: ${props =>
    props.selected ? `2px solid ${burntSienna}` : `2px solid ${wildSand}`};

  ${media.tablet`
    font-size: 13px;
  `};
`;
