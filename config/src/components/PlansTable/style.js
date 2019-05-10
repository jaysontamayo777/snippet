import styled from 'styled-components';
import {
  axaBlue,
  mineShaft,
  silver,
  dustyGray
} from '@axa-asia/frontend/lib/styling/colors';
import { Collapse as BSCollapse } from 'reactstrap';
import { DropdownList } from 'react-widgets';

export const Table = styled.div`
  margin: 35px 0;
`;

export const Head = styled.div`
  border-top: 2px solid ${dustyGray};
  border-bottom: 2px solid ${dustyGray};
  display: flex;
`;

export const HeadItem = styled.div`
  flex: 1;
  padding: 20px;
  font-weight: 600;
  font-size: 16px;
  background: ${props => (props.selected ? '#EFEFEF' : 'transparent')};
  position: relative;
`;

export const SelectedPlan = styled.div`
  background: ${axaBlue};
  margin: 0 -20px;
  color: white;
  font-size: 12px;
  text-transform: uppercase;
  margin-top: -45px;
  margin-bottom: 21px;
  padding: 0 10px;
  font-weight: 100;
  -webkit-font-smoothing: antialiased;
`;

export const Dropdown = styled(DropdownList)`
  & {
    .rw-widget-input,
    .rw-list-option,
    .rw-multiselect-tag,
    .rw-list-optgroup {
      font-size: 14px;
      font-weight: 100;
    }
  }
`;

export const Body = styled.div`
  /* border-bottom: 1px solid ${silver}; */
`;

export const BodyRow = styled.div`
  border-bottom: 1px solid ${silver};
`;

export const BodyItem = styled.div`
  font-size: 14px;
  -webkit-font-smoothing: antialiased;
  line-height: 1.3;
  cursor: default;
  background: ${props => (props.selected ? '#EFEFEF' : 'transparent')};
  text-align: ${props => (props.center ? 'center' : 'left')};
  justify-content: ${props =>
    props.center ? 'center !important' : 'flex-start'};
  padding: ${props =>
    props.main
      ? '15px 40px 15px 0px'
      : props.sub
      ? '10px 0px 10px 40px'
      : '5px 23px 10px 17px'};

  i {
    font-size: 10px;
    line-height: 1.3;
    margin-top: 0;
  }
`;

export const PlanType = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  color: #727272;
  margin-bottom: 5px;
  font-weight: 100;
  display: flex;
  justify-content: space-between;
`;

export const PlanFlag = styled.div`
  height: 35px;

  span {
    border: 1px solid #0f64d3;
    color: #0f64d3;
    font-size: 10px;
    text-transform: uppercase;
    border-radius: 15px;
    padding: 3px 5px;
    text-align: center;
    flex-basis: 52%;
  }
`;

export const PlanName = styled.h2`
  font-size: 26px;
  text-transform: capitalize;
  -webkit-font-smoothing: antialiased;
  color: ${mineShaft};
  font-family: 'PublicoHeadlineWeb';
  margin: 10px 0 25px;
`;

export const PlanPrice = styled.h3`
  font-size: 30px;
  text-transform: capitalize;
  -webkit-font-smoothing: antialiased;
  color: ${mineShaft};
  font-weight: normal;
  margin: 5px 0;
`;

export const MainItem = styled.div`
  display: flex;
  width: 100%;

  div {
    flex: 1;
    border-bottom: red;
    display: flex;
    justify-content: flex-start;
    align-items: center;
  }
`;

export const MainHeading = styled.div`
  font-size: 14px;
  color: ${axaBlue};
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  margin-left: 5px;
`;

export const Arrow = styled.svg`
  float: left;
  width: 12px;

  display: ${props => (props.hide ? 'none' : 'flex')};
  -ms-transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  -webkit-transform: ${props =>
    props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const ArrowContainer = styled.div`
  width: 12px;
  flex: none !important;
`;

export const Collapse = styled(BSCollapse)``;

export const MinorItem = styled.div`
  display: flex;
  width: 100%;

  div {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
  }
`;
