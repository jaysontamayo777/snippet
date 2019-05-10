import styled from 'styled-components';
import { Collapse as BSCollapse, FormGroup as BSFormGroup } from 'reactstrap';

import { media } from '../../constants/mediaSizes';
import {
  wildSand,
  silver,
  mineShaft,
  axaBlue,
  axaRed,
  mercury,
  dustyGray,
  burntSienna,
  flamingo
} from '@axa-asia/frontend/lib/styling/colors';
import { BurntSiennaButton } from '../AXAToolkit';

export const Wrapper = styled.div`
  background: ${wildSand};
  position: relative;
`;

export const Row = styled.div`
  display: flex;
  flex-wrap: wrap;
`;

export const FormGroup = styled(BSFormGroup)`
  margin-left: 10px;
  margin-right: 10px;
  width: 100%;

  ${media.landscapedPhone`width: calc(50% - 20px);`};
  ${media.desktop`flex: 1;`};
`;

export const Label = styled.div`
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  color: ${mineShaft};
  font-weight: 600;
  line-height: 2;
`;

export const InfoIcon = styled.svg`
  margin-left: 4px;
  margin-top: -3px;
  cursor: pointer;
`;

export const Options = styled.div`
  display: flex;
  justify-content: center;
`;

export const CollapsiblePanel = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

export const CollapsiblePanelLabel = styled.div`
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  height: 40px;
  display: flex;
  align-items: center;
`;

export const InlineSelection = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  align-items: center;
  margin-bottom: 5px;
`;

export const TotalTravellers = styled.div`
  font-size: 16px;
  -webkit-font-smoothing: antialiased;

  span {
    margin-left: 15px;
    color: ${axaBlue};
  }
`;

export const Collapse = styled(BSCollapse)`
  border: 1px solid ${silver};
  border-top: 0;
  padding: 5px 0.857em;
  background: white;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  box-shadow: 0 5px 6px rgba(0, 0, 0, 0.2);
  min-width: 265px;
  padding: 10px 14px;
  z-index: 999;
`;

export const NumberPicker = styled.input`
  border: 1px solid ${silver};
  border-radius: 5px;
  font-size: 16px;
  -webkit-font-smoothing: antialiased;
  padding: 5px 0.857em;
  -moz-appearance: textfield;
  text-align: center;

  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;

export const NumberPickerDecrease = styled.div`
  border: 1px solid ${silver};
  border-radius: 50%;
  height: 24px;
  width: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;

  :before {
    content: '-';
  }
`;

export const NumberPickerIncrease = styled.div`
  border: 1px solid ${silver};
  border-radius: 50%;
  height: 24px;
  width: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  margin: 0 5px;
  cursor: pointer;

  :before {
    content: '+';
  }
`;

export const PromoCode = styled.div`
  display: ${props => (props.show ? 'block' : 'none')};
  height: ${props => (props.show ? '100%' : 'auto')};
  display: flex;
  align-items: center;

  p {
    margin: 0;
    color: #0f64d3;
    font-size: 16px;
    -webkit-font-smoothing: antialiased;
    cursor: pointer;
    display: ${props => (props.show ? 'block' : 'none')};
  }
`;

export const Remarks = styled.div`
  font-size: 14px;
  color: ${mineShaft};
  text-align: center;
  max-width: 350px;
  -webkit-font-smoothing: antialiased;
  font-weight: 600;

  span,
  a {
    color: #5174cb;
    cursor: pointer;
    font-weight: 600;
    font-size: 16px;

    :hover,
    :focus {
      text-decoration: none;
      color: #3050a0;
    }
  }

  ${media.desktop`max-width: none;`};
`;

export const CoveredDestinationsWrapper = styled.div`
  border-bottom: 1px solid ${silver};
`;

export const CoveredProvince = styled.div`
  font-family: 'PublicoHeadlineWeb';
  font-size: 15px;
  padding: 10px 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;

  ${media.landscapedPhone`padding: 25px 30px 15px 30px; font-size: 18px;`};
`;

export const CoveredDestinationsList = styled.div`
  padding: 10px 20px 10px 20px;

  ${media.landscapedPhone`padding: 5px 30px 20px 30px;`};
`;

export const CoveredDestinationsItem = styled.div`
  width: 50%;
  display: inline-flex;
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  padding: 0 5px;

  ${media.landscapedPhone`width: 33.33%; font-size: 15px;`};
  ${media.desktop`width: 20%;`};
`;

export const SubmitButton = styled(BurntSiennaButton)`
  && {
    @media (max-width: 575px) {
      width: 100%;
    }
  }
`;

export const CollapseArrow = styled.svg`
  -ms-transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  -webkit-transform: ${props =>
    props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  height: 20px;
  width: 20px;

  ${media.landscapedPhone`height: 24px; width: 24px;`};
`;

export const Center = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 15px;
  flex-direction: column;
  align-items: center;
`;

export const OptionButton = styled.div`
  background: ${props => (props.selected ? 'white' : mercury)};
  border-bottom: ${props =>
    props.selected ? `1px solid ${axaBlue}` : `1px solid ${dustyGray}`};
  color: ${props => (props.selected ? axaBlue : mineShaft)};
  height: 40px;
  font-size: 14px;
  text-transform: uppercase;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 25px;
  min-width: 160px;
  margin: 5px 10px 0 10px;
  cursor: pointer;
  font-weight: ${props => (props.selected ? '600' : 'normal')};
`;

export const ModalWrapper = styled.div`
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  overflow-x: hidden;
  overflow-y: scroll;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 1050;
  -webkit-overflow-scrolling: touch;
  outline: 0;
  transition: visibility 0s, opacity 0.5s linear;
  background: rgba(0, 0, 0, 0.2);
  font-size: 14px;
`;

export const ModalDialog = styled.div`
  margin: 30px auto;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: white;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
`;

export const ModalHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  padding-bottom: 10px;

  ${media.tablet`padding: 30px 30px 10px 30px;`};

  h1 {
    font-family: 'PublicoHeadlineWeb';
    font-size: 18px;
    margin: 0;

    ${media.landscapedPhone`font-size: 24px;`};
  }
`;

export const ModalClose = styled.div`
  display: flex;
  align-items: center;
  width: 20px;
  height: 20px;

  ${media.landscapedPhone`width: 24px; height: 24px;`};
`;

export const ModalBody = styled.div`
  padding: 0px;
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${axaRed};
  -webkit-font-smoothing: antialiased;
`;

export const SiennaButton = styled.button`
  background-color: ${props =>
    props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${burntSienna}`};
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
  color: white;
  border-color: ${props =>
    props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
  border-style: solid;
  border-width: 0 0 2px 0;
  cursor: ${props => (props.disabled ? 'not-allowed !important' : 'default')};

  &:active {
    border-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
    background-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo}`};
  }

  &:focus {
    border-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
    outline: none;
  }

  &:hover {
    border-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo} !important`};
    background-color: ${props =>
      props.disabled ? 'rgba(240, 118, 98, 0.7)' : `${flamingo}`};
  }
`;
