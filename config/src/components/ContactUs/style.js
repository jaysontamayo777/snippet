import styled from 'styled-components';
import { darkIndigo } from '@axa-asia/frontend/lib/styling/colors';
import { media } from '../../constants/mediaSizes';

export const Wrapper = styled.div`
  position: fixed;
  bottom: 0;
  width: 100%;
  display: flex;
  justify-content: flex-end;
  padding: 0 3%;
  padding-bottom: 10px;
  z-index: 10;

  ${media.tablet`padding: 0 3%; padding-bottom: 30px;`};
`;

export const Button = styled.div`
  background: ${darkIndigo};
  height: 50px;
  width: 50px;
  color: white;
  padding: 0;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  font-size: 18px;
  cursor: pointer;
  -webkit-box-shadow: 2px 2px 5px 0px rgba(168, 168, 168, 1);
  -moz-box-shadow: 2px 2px 5px 0px rgba(168, 168, 168, 1);
  box-shadow: 2px 2px 5px 0px rgba(168, 168, 168, 1);

  ${media.desktop`padding: 0 40px; width: auto; height: 40px; border-radius: 20px; font-size: 14px;`};
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
  display: flex;
  align-items: center;
`;

export const ModalDialog = styled.div`
  margin: 0 auto;
`;

export const ModalContent = styled.div`
  position: relative;
  background-color: white;
  box-shadow: 0 3px 9px rgba(0, 0, 0, 0.5);
  background-clip: padding-box;
  border-radius: 5px;
  width: 300px;
  padding: 15px 20px;
  padding-bottom: 25px;

  ${media.landscapedPhone`width: 400px; padding: 20px 30px; padding-bottom: 35px;`};
  ${media.desktop`width: 600px;`};
`;

export const Logo = styled.img`
  margin: 20px;
`;

export const Title = styled.div`
  font-family: 'PublicoHeadlineWeb';
  font-size: 20px;
  margin-bottom: 15px;
`;

export const Text = styled.div`
  font-size: 14px;
  line-height: 1.5;

  h3 {
    font-size: 20px;
    font-weight: 700;
    margin-top: 2px;
  }
`;
