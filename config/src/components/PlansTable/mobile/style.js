import styled from 'styled-components';
import {
  silver,
  dustyGray,
  mineShaft,
  axaBlue,
  alabaster
} from '@axa-asia/frontend/lib/styling/colors';

export const Table = styled.div`
  margin-top: ${props => (props.withSelectedPlan ? '15px' : '0')};
  display: flex;
  overflow: hidden;
`;

export const Selection = styled.div`
  margin-top: 25px;
`;

export const Label = styled.div`
  text-align: center;
  font-weight: 700;
  -webkit-font-smoothing: antialiased;
  margin-bottom: 5px;
`;

export const TableColumn = styled.div`
  border: 1px solid ${silver};
  border-bottom: none;
  border-top: none;
  width: 100%;
  margin-left: ${props => (props.prev ? '-100%' : '0')};
  margin-right: ${props => (props.next ? '-100%' : '0')};
  -webkit-transition: all 0.8s;
  transition: all 0.8s;
`;

export const Head = styled.div`
  border-top: 1px solid ${silver};
  border-bottom: 2px solid ${dustyGray};
  padding: 15px 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  position: relative;
`;

export const PlanType = styled.p`
  font-size: 14px;
  text-transform: uppercase;
  -webkit-font-smoothing: antialiased;
  color: #727272;
  margin: 0;
  font-weight: 100;
`;

export const PlanFlag = styled.div`
  height: 35px;
  span {
    border: 1px solid #0f64d3;
    color: #0f64d3;
    font-size: 11px;
    text-transform: uppercase;
    border-radius: 15px;
    padding: 3px 5px;
  }
`;

export const PlanName = styled.h2`
  font-size: 26px;
  text-transform: capitalize;
  -webkit-font-smoothing: antialiased;
  color: ${mineShaft};
  font-family: 'PublicoHeadlineWeb';
  margin: 5px 0;
`;

export const PlanPrice = styled.h3`
  font-size: 30px;
  text-transform: capitalize;
  -webkit-font-smoothing: antialiased;
  color: ${mineShaft};
  font-weight: normal;
  margin: 5px 0;
`;

export const SelectedPlan = styled.div`
  height: 25px;
  border-left: 1px solid ${alabaster};
  border-right: 1px solid ${alabaster};
  margin: 0 -1px;
  display: flex;

  div {
    background: ${axaBlue};
    margin: 0 -1px;
    flex: 1;
    color: white;
    display: flex;
    align-items: center;
    padding: 2px 20px;
    font-size: 12px;
    text-transform: uppercase;
    display: flex;
    justify-content: center;

    span {
      width: 0;
      height: 0;
      border-style: solid;
      border-width: 7px 7px 0 7px;
      border-color: ${axaBlue} transparent transparent transparent;
      margin-top: 15px;
      position: absolute;
      z-index: 1;
    }
  }
`;

export const Body = styled.div``;

export const BodyItem = styled.div`
  cursor: default;
  border-bottom: 1px solid ${silver};
  padding: ${props => (props.heading ? '15px 10%' : '10px 10%')};
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  line-height: 1.3;
  text-transform: initial;
  flex-direction: ${props => (props.heading ? 'row' : 'column')};
  color: ${props =>
    props.heading ? axaBlue : props.subheading ? '#727272' : mineShaft};
  font-weight: ${props => (props.heading ? '700' : 'normal')};
  font-size: ${props =>
    props.heading ? '16px' : props.subheading ? '12px' : '14px'};

  i {
    font-size: 10px;
    margin-left: 5px;
  }
`;

export const Row = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-between;

  div {
    text-align: left;
  }
`;

export const Arrow = styled.svg`
  float: left;
  width: 30px;

  display: ${props => (props.hide ? 'none' : 'flex')};
  -ms-transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
  -webkit-transform: ${props =>
    props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)'};
  transform: ${props => (props.isOpen ? 'rotate(180deg)' : 'rotate(0deg)')};
`;

export const Navigation = styled.div`
  width: 100%;
  display: flex;
  height: 50px;
  z-index: 2;
  margin-top: -40px;
  justify-content: ${props => (props.pushRight ? 'flex-end' : 'space-between')};
`;

export const NavButton = styled.svg`
  border: 1px solid ${silver};
  border-radius: 50%;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.2);
  cursor: pointer;
`;
