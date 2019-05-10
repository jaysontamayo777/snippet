import styled from 'styled-components';
import { Collapse as BSCollapse } from 'reactstrap';
import {
  silver,
  wildSand,
  axaRed
} from '@axa-asia/frontend/lib/styling/colors';
import { media } from '../../constants/mediaSizes';

import { Tooltip as BSToolip } from '../AXAToolkit';

export const Wrapper = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
  background: white;
  margin-bottom: 15px;

  ${media.desktop`margin-bottom: 30px;`};
`;

export const Header = styled.div`
  border-bottom: 1px solid ${silver};
  font-family: 'PublicoHeadlineWeb';
  font-size: 20px;
  padding: 20px;
`;

export const Body = styled.div`
  display: flex;
  flex-direction: column;
  padding: 20px;
  padding-bottom: 40px;
`;

export const FormGroup = styled.div`
  margin-bottom: 10px;
  display: flex;
  flex-direction: column;
  flex: 1;
  padding: 0 10px;
`;

export const Row = styled.div`
  display: flex;
`;

export const Label = styled.div`
  font-size: 12px;
  text-transform: capitalize;
`;

export const ErrorMessage = styled.div`
  font-size: 12px;
  color: ${axaRed};
  -webkit-font-smoothing: antialiased;
`;

export const InlineOptions = styled.div`
  display: flex;
`;

export const FormSubmit = styled.div`
  float: right;
  width: 100%;
  display: flex;
  justify-content: center;
  margin: 25px 0 15px 0;
`;

export const Remarks = styled.div`
  padding: 0 10px;
  margin-bottom: 10px;
  font-size: 10px;
  -webkit-font-smoothing: antialiased;
  line-height: 1.5;
`;

export const BeneficiaryWrapper = styled.div`
  border: 1px solid ${silver};
  margin: 30px 10px 0 10px;
`;

export const BeneficiaryHeader = styled.div`
  border-bottom: 1px solid ${silver};
  background: ${wildSand};
  font-family: 'PublicoHeadlineWeb';
  font-size: 14px;
  padding: 10px 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: -1px;
`;

export const CollapseArrow = styled.svg`
  -ms-transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  -webkit-transform: ${props =>
    props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const BeneficiaryBody = styled(BSCollapse)`
  padding: 15px;
`;


export const TextFieldWithIcon = styled.div`
  position: relative;

  input {
    padding: 0 34px 0 15px;
  }

  .icon {
    position: absolute;
    right: 6px;
    top: 10px;
    height: 24px;
    width: 20px;
  }
`;

export const Tooltip = styled(BSToolip)`
  .tooltip-inner {
    max-width: 400px;
  }
`;