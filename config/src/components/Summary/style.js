import styled from 'styled-components';
import {
  axaBlue,
  dustyGray,
  mineShaft
} from '@axa-asia/frontend/lib/styling/colors';
import { Collapse as BSCollapse } from 'reactstrap';

export const Wrapper = styled.div`
  box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
`;

export const Header = styled.div`
  display: flex;
  align-items: center;
  background: ${axaBlue};
  padding: 20px;
  justify-content: space-between;
`;


export const Bodyheader = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  background: #5376C8;
  margin: -10px -20px 10px;
  justify-content: space-between;
`;

export const BodyheaderTitle = styled.h2`
  font-family: inherit;
  font-size: 16px;
  color: white;
  margin: 0;
  font-weight: normal;
  letter-spacing: 0.02em;
`;

export const BodyheaderPrice = styled.h2`
  font-size: 16px;
  color: white;
  margin: 0;
  font-weight: normal;
  letter-spacing: 0.02em;
`;

export const Title = styled.h2`
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
  color: white;
  font-family: 'PublicoHeadlineWeb';
  margin: 0;
`;

export const TotalPrice = styled.h2`
  font-size: 22px;
  -webkit-font-smoothing: antialiased;
  color: white;
  margin: 0;
`;

export const Body = styled(BSCollapse)`
  background: white;
  padding: 10px 20px 30px 20px;
`;

export const ProductName = styled.div`
  font-size: 14px;
  color: ${dustyGray};
  -webkit-font-smoothing: antialiased;
`;

export const Row = styled.div`
  font-size: 14px;
  color: ${mineShaft};
  -webkit-font-smoothing: antialiased;
  display: flex;
  justify-content: space-between;
`;

export const Region = styled.span`
  font-size: 12px;
  margin-top: -5px;
`;
