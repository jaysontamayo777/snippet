import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import { Collapse } from 'reactstrap';
import {
  mineShaft,
  silver,
  scorpion,
  axaBlue,
  wildSand
} from '@axa-asia/frontend/lib/styling/colors';

export const Profile = styled.div`
  border: 1px solid ${silver};
  border-radius: 5px;
  background: white;
  box-shadow: 0px 0px 10px 0px rgba(153, 153, 153, 0.3);
`;

export const ProfileSummary = styled.div`
  padding: 20px;
  display: flex;
  align-items: flex-start;
  justify-content: flex-start;
  -webkit-font-smoothing: antialiased;
  flex-direction: column;

  ${media.desktop`flex-direction: row`};

  p {
    color: ${scorpion};
    -webkit-font-smoothing: antialiased;
    font-size: 14px;
    margin-top: 5px;
    flex-grow: 2;

    ${media.desktop`margin: 0; font-size: 16px;`};
  }
`;

export const Title = styled.div`
  font-size: 26px;
  font-family: 'PublicoHeadlineWeb';
  text-transform: capitalize;
  margin-right: 10px;
  color: ${mineShaft};
`;

export const OpenWidget = styled.div`
  font-size: 16px;
  color: ${axaBlue};
  font-weight: 600;
  display: flex;
  align-items: center;
  cursor: pointer;
  width: 100%;
  display: flex;
  justify-content: flex-end;

  ${media.desktop`display: block; width: auto;`};
`;

export const ProfileAdjust = styled(Collapse)`
  padding: 30px 20px;
  background: ${wildSand};
  border-radius: 0 0 5px 5px;
`;

export const PurchaseContainer = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: column;

  ${media.desktop`flex-direction: row; margin-top: 30px;`};
`;

export const Col = styled.div`
  flex: 1;
  padding: 20px 10px;

  ${media.desktop`padding: 0 10px;`};
`;
