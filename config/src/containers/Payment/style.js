import styled from 'styled-components';
import { silver, mineShaft } from '@axa-asia/frontend/lib/styling/colors';


import { media } from '../../constants/mediaSizes';

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;

  ${media.desktop`flex-direction: row;`};
`;

export const Forms = styled.div`
  flex: 1;
  order: 2;
  box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
  background: white;
  margin-bottom: 15px;

  ${media.desktop`order: 1; margin-right: 10px; width: 60%; margin-bottom: 30px;`};
`;

export const Basket = styled.div`
  flex: 1;
  order: 1;
  margin-bottom: 15px;

  ${media.desktop`order: 2; margin-left: 10px;`};
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
  padding: 70px 20px;
  align-items: center;
  justify-content: center;
`;

export const Message = styled.div`
  font-family: 'PublicoHeadlineWeb';
  font-size: 22px;
  padding: 45px 0px 30px 0px;
`;

export const Details = styled.div`
  font-size: 16px;
  padding: 5px 30px;
  color: ${mineShaft};
  -webkit-font-smoothing: antialiased;
`;