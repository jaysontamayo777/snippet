import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import { Container, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import Button from '@axa-asia/react-web-toolkit/lib/Button/Button';

export const Wrapper = styled.header`
  display: block;
`;

export const ContainerFluid = styled(Container)`
  && {
    padding: 0;
    height: 100%;

    ${media.desktop`
      padding: 0 80px;
      margin: 0;
    `};
    ${media.largeDesktop`
      padding: 0 100px;
      margin: 0 !important;
    `};

    .nav-stroke {
      bottom: 1px;
    }
  }
`;

export const Main = styled.div`
  display: block;
  zoom: 1;
  height: 72px;
  transition: border-bottom 225ms cubic-bezier(.4,0,.6,1);
  border-bottom: 2px solid #f5f5f5;
`;

export const Brand = styled.a`
  float: left
  margin-top: 15px;
  margin-left: 13px;

  svg {
    height: 44px;
  }

  ${media.desktop`
    margin-top: 0;
    margin-left: 0;
  `};
`;

export const Nav = styled.nav`
 && {
  display none;
  padding-left: 0;
  margin-bottom: 0;

  ${media.tablet`
    display: block;
  `};
 }
`;

export const NavList = styled.ul`
  display: flex;
  justify-content: flex-end;
  height: 100%;
  padding: 0;
  margin: 0;
`;

export const NavPanelContent = styled.div`
  display: block;
  background: #fff;
  padding: 15px 0;
  min-height: 420px;
  box-shadow: 0 5px 5px #777;
`;

export const NavPanel = styled.div`
  display: none;
  position: absolute;
  z-index: 10;
  left: 0;
  width: 100%;
  padding-top: 6px;
  margin-top: -6px;
  transition: height 225ms cubic-bezier(0, 0, 0.2, 1) 375ms,
    visibility 0s linear 0.6s;
`;

export const NavItem = styled.li`
  list-style-type: none;
  float: right;
  height: 72px;
  padding: 0;
  margin: 0;

  &.nav-item {
    margin-left: 0;
    margin-right: 0;
  }

  &:hover {
    ${NavPanel} {
      display: block;
    }
  }
`;

export const NavLink = styled.a`
  && {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 72px;
    padding-right: 1.1rem;
    padding-left: 1.1rem;
    transition: color 225ms cubic-bezier(0.4, 0, 0.6, 1);
    text-align: center;
    text-decoration: none;
    font-size: 10px;
    font-weight: bold;
    letter-spacing: 0.02em;
    text-transform: uppercase;
    color: #00008f;

    ${media.desktop`
      font-size: 10px;
      padding-right: 1.25rem;
      padding-left: 1.25rem;
      letter-spacing: 0.02em;
    `};

    ${media.largeDesktop`
      font-size: 13px;
      padding-right: 1.25rem;
      padding-left: 1.25rem;
      letter-spacing: 0.08em;
    `};

    :not([href]):not([tabindex]), [href] {
      color: #00008f;
      cursor: pointer;
    }

  }
`;

export const MenuDescContainer = styled.div`
  min-height: 400px;
  padding: 0 15px;
`;

export const MenuDescTitle = styled.h1`
  font-family: PublicoHeadlineWeb;
  font-size: 30px;
  line-height: 1.17;
  letter-spacing: 1px;
`;

export const MenuDesc = styled.div`
  && {
    display: block;

    p {
      font-size: 14px;
    }
  }
`;

export const MenuList = styled.ul`
  position: relative;
  padding: 0;
  margin-left: -15px;
  min-height: 436px;
`;

export const ProductMenuContainer = styled.div``;

export const ProductDescContainer = styled.div`
  display: ${props => (props.showFirstChild ? 'block' : 'none')};
  position: absolute;
  right: 0;
  top: 0;
  width: ${props => (props.large ? '75%' : '50%')};
  padding-left: 15px;
  min-height: 100%;
  background: #fff;
  border-left: 1px solid #ccc;
`;

export const ProductMenuList = styled.ul`
  && {
    display: ${props => (props.showFirstChild ? 'block' : 'none')};
    list-style: none;
    position: absolute;
    top: 0;
    left: 25%;
    width: 25%;
    height: 100%;
    border-left: 1px solid #ccc;
    min-height: 400px;
    background: #fff;
    list-style: none;
    padding-left: 0;
    padding-top: ${props => (props.toppadding ? '41px' : '0')}; ;
  }
`;

export const ProductMenuListItem = styled.li`
  list-style-type: none;
  color: #757575;
  font-size: 14px;
  display: block;
  font-weight: 700;
  text-decoration: underline;

  &:hover {
    background-color: #e6e6e6;
    cursor: pointer;
  }
  
  .icon {
    padding-left: 10px;
    color: #00005b; 
    width: 25px;
    transform: translateY(-2px);
  }
`;

export const MenuListItem = styled.li`
  list-style-type: none;
  color: #757575;
  font-size: 14px;
  display: block;

  &:hover {
    font-weight: 700;
    background-color: #e6e6e6;
    cursor: pointer;
  }

  &:hover ${ProductMenuList} {
    display: block;
  }

  &:hover ${ProductDescContainer} {
    display: block;
  }

  a[href], a:not([href]), a:not([tabindex]) {
    font-size: 14px;
    margin-left: ${props => (props.grouptitle  ? '0' : '10px')}; 
    text-decoration: underline;
    color: inherit;
    padding: 10px 16px
    display: block;
  }

`;

export const Aside = styled.aside``;

export const MetaMenuContainer = styled.div`
  && {
    margin-left: 0;
    margin-right: 0;
    padding-right: 115px;
    display: none;
    zoom: 1;
    height: 40px;
    transition: border-bottom 225ms cubic-bezier(0.4, 0, 0.6, 1);
    border-bottom: 1px solid #f5f5f5;
    margin-top: 1px;
    ${media.desktop`
      display: block;
    `};
  }
 
`;

export const MetaMenu = styled.ul`
  display: flex;
  margin-bottom: 0;
`;

export const MetaMenuItem = styled.li`
  && {
    list-style-type: none;
    border-right: 1px solid #ccc;
    justify-content: center;
    align-items: center;

    &:last-child {
      border-right: none;
    }
  }
`;

export const MetaMenuLink = styled.a`
  && {
    font-size: 13px;
    letter-spacing: 0.08em;
    height: 100%;
    padding-right: 20px;
    padding-left: 20px;
    color: #ccc;
    font-weight: bold;
    text-transform: uppercase;

    &:hover {
      text-decoration: none;
      color: #23527c;
    }
  }
`;

export const MetaMenuNav = styled.nav`
  float: right;
`;

export const MetaMenuNavButton = styled(Button)`
  font-size: 13px;
  padding: 5px 13px;
  font-weight: 400;
  font-size: 14px;
  letter-spacing: 0.02em;
  text-transform: uppercase;

`;

export const MobileNavMenu = styled.div`
  display: block;
  float: right;
  height: 100%;

  ${media.tablet`
    display: none;
  `};
`;

export const BurgerMenu = styled.a`
  float: right;
  display: inline-flex;
  align-items: center;
  height: 100%;
  margin-left: -15px;
  padding: 10px 15px;

  span {
    display: block;
    position: relative;
    width: 23px;
    height: 2px;
    transition: all 225ms cubic-bezier(.4,0,.6,1);
    background: #103184;

    &::before {
      display: block;
      position: absolute;
      left: 0;
      width: 23px;
      height: 2px;
      transition: all 225ms cubic-bezier(.4,0,.6,1);
      background: #103184;
      content: "";
      z-index: 0;
      top: -8px;
    }

    &::after {
      display: block;
      position: absolute;
      top: 8px;
      left: 0;
      width: 23px;
      height: 2px;
      transition: all 225ms cubic-bezier(.4,0,.6,1);
      background: #103184;
      content: "";
      z-index: 0;
    }
  }
`;

export const MetaMenuWrapper = styled.div`
  ${media.tablet`
    border-top: 2px solid #3032c1;
    border-bottom: 1px solid #f5f5f5;
  `};
`;

export const UserDropdown = styled(Dropdown)`
  float: right;
  display: inline-flex;
  align-items: center;
  height: 100%;
`;
export const UserDropdownToggle = styled(DropdownToggle)`
  && {
    background-color: transparent;
    border: none;
    height: 23px;
    padding: 0 10px;
    margin: 23px 10px;
    border-right: 1px solid #a8a8a8;

    img {
      height: 23px;
    }
  }
`;
export const UserDropdownMenu = styled(DropdownMenu)`
  &.dropdown-menu {
    border-top: 1px solid #0a539e;
    border-left: 1px solid #0a539e;
    border-right: 1px solid #0a539e;
    border-bottom: none;
    margin: 0;
    padding: 0;
    width: 200px;
    border-radius: 2px;
    top: 13px !important;
    left: 10px !important;

    &:after {
      content: '';
      display: block;
      position: absolute;
      left: 155px;
      bottom: 100%;
      width: 0;
      height: 0;
      border-bottom: 10px solid #0a539e;
      border-top: 10px solid transparent;
      border-left: 10px solid transparent;
      border-right: 10px solid transparent;
    }
  }
`;
export const UserDropdownItem = styled(DropdownItem)`
  &.dropdown-item {
    border-bottom: 1px solid #0a539e;
    padding: 10px 15px;
    font-size: 15px;
    letter-spacing: 0.02em;
    color: #656565;

    &:first-child {
      background-color: #0a539e;
      color: white;
    }
  }
`;
