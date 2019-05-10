import styled from 'styled-components';
import { Collapse } from 'reactstrap';
import { media } from '../../constants/mediaSizes';

import {
  axaBlue
} from '@axa-asia/frontend/lib/styling/colors';

export const Wrapper = styled.div`
  display: block;
`;

export const Panel = styled.div`
  border: 1px solid #ddd;
  border-bottom: none;
`;

export const PanelHeader = styled.div`
  display: block;
  background-color: white;
  padding: 15px 15px 15px 15px;

  ${media.desktop`
    padding: 20px 30px;
  `};
`;

export const PanelBody = styled(Collapse)`
  display: block;
  background-color: white;
  padding: 0 15px;

  ${media.desktop`
    padding: 0 30px 20px;
  `};
`;

export const PanelHeaderTitle = styled.div`
  margin-top: 0px;
  color: ${axaBlue};
  margin-bottom: 5px;
  font-weight: bold;

`;

export const Arrow = styled.svg`
  float: right;
  width: 20px;
  height: 20px;

  display: ${props => (props.hide ? 'none' : 'flex')};
  -ms-transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  -webkit-transform: ${props =>
    props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const PanelHeaderDesc = styled.div`
  display: block;
`;

export const TextCapitalize = styled.span`
  text-transform: capitalize;
`;

export const SectionContent = styled.div`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.2px;
  margin-bottom: 5px;
  max-width: 100%;
  word-break: break-word;
`;

export const SectionHeader = styled.span`
  font-size: 26px;
  line-height: 1;
  margin-bottom: 5px;
  max-width: 100%;
  font-family: "PublicoHeadlineWeb";
  color: #333333;
  letter-spacing: 1px;
  font-weight: bold;
`;

export const SectionDesc = styled.span`
  font-size: 16px;
  line-height: 1.5;
  letter-spacing: 0.2px;
  margin-bottom: 5px;
  max-width: 100%;
`;

