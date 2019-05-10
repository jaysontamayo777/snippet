import styled from 'styled-components';
import Button from '@axa-asia/react-web-toolkit/lib/Button/Button';
import { WhiteOutlinedButton } from '../../components/AXAToolkit';

export const Wrapper = styled.div`
  display: block;
  
  .mask {
    z-index: 1007;
  }
`;

export const Aside = styled.aside`
  &.drawer.togglable-xs-right {
    z-index: 1008;
  }
`;

export const Header = styled.div`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 83px;
  width: 100%;
`;

export const Nav = styled.nav`
  padding: 0;
  margin: 0;
  width: 100%;
  padding-bottom: 1px;
`;

export const NavList = styled.ul`
  padding: 0;
  margin: 0;
  visibility: visible;
  width: 100%;
  overflow: hidden;
  list-style-type: none;
`;


export const NavLink = styled.a`
  display: flex;
  padding: 0px 30px 0 15px;
  height: 53px;
  align-items: center;
  font-weight: bold;
  font-size: 15px;

  svg {
    height: 16px;
    width: 16px;
    min-width: 16px;
    display: inline-block;
  }
`;

export const NavLinkText = styled.span`
  overflow-wrap: break-word;
  word-wrap: break-word;
  flex-grow: 1;

  .icon {
    padding-left: 10px;
    color: #00005b; 
    width: 25px;
    transform: translateY(-2px);
  }
`;

export const NavItem = styled.li`
  && {
    list-style-type: none;
    font-weight: 600;
    border-bottom: 1px solid #efefef;
    border-top: 1px solid #efefef;
    background-color: ${props => props.headernav ? '#0060d6' : props.titlenav ? '#eee' : props.parent ? '#f9f9f9' : props.child ? '#fff' : '#fff'}
    padding-left: ${props => props.titlenav ? '15px': '0'}
  
    &:not(:first-child) {
      border-top: none;
    }

    &:not(:hover) {
      background-color: ${props => props.headernav ? 'white' : props.titlenav ? '#eee' : props.parent ? '#f9f9f9' : props.child ? '#fff' : '#fff'}
      ${NavLinkText} {
        color: ${props => props.headernav ? '#00005b' : props.titlenav ? '#333' : props.parent ? '#757575' : props.child ? '#757575': 'white'}
      }
    }

    ${NavLink} {
      margin-left: ${props => props.parent ? '25px' : props.child ? '40px' : '0'}
    }
  
    ${NavLinkText} {
      font-size: 15px;
      text-transform: ${props => props.titlenav ? 'unset' : props.parent ? 'unset' :  props.child ? 'unset' : 'uppercase'}
      font-weight: ${props => props.child ? 'normal': 'inherit'}
      color: ${props => props.headernav ? 'white' : props.titlenav ? '#333' : props.parent ? '#757575' : props.child ? '#757575': 'white'}
    }
  }
`;

export const NavSubMenu = styled.ul`
  list-style-type: none;
  padding-left: 0;
  transition: max-height 225ms cubic-bezier(.01,0,1,0),visibility 225ms;
  visibility: ${props => (props.isOpen ? 'visible' : 'hidden')};
  max-height: ${props => (props.isOpen ? '3999px' : '0px')};
  overflow: hidden;
  background: #eee;
`;

export const NavLinkIcon = styled.span`
  transition: transform 225ms ease,-webkit-transform 225ms ease;
  transform: ${props => (props.isOpen ? 'rotate(90deg)' : 'rotate(0)')};
`;

export const Special = styled.div`
  background: #00005d;
  padding: 15px;
  text-align: center;
  color: white;

  p {
    font-size: 15px;
  }
`;

export const MetaMenuBlock = styled.div`
  display: block;
  padding: 20px 0;
  background-color: #eee;
`;

export const MetaMenu = styled.ul`
  list-style-type: none;
  height: 100%;
  margin: 0;
  padding: 0;
  display: flex;
  align-items: flex-end;
`;

export const MetaMenuItem = styled.li`
  height: 100%;
  margin: 0;
  padding: 0;
`;

export const MetaMenuLink = styled.a`
  && {
    padding: 10px 13px;
    border-left: 1px solid #ddd;
    font-family: Source Sans Pro,Arial,sans-serif;
    font-size: 13px;
    letter-spacing: .08em;
    font-weight: 600;
    text-transform: uppercase;
    color: #ccc;
  }
`;

export const OutlineButton = styled(Button)`
  && {
    background-color: white;
    border: 2px solid #3032c1;
    color: #3032c1;
    font-weight: normal;
    padding: .73333rem 2rem;
  }
`;

export const WhiteButton = styled(WhiteOutlinedButton)`
  && {
    width: 100%;
    font-size: 16px;
    margin-top: 30px;
    letter-spacing: 0.02em;
    line-height: 0;
  }
`;
