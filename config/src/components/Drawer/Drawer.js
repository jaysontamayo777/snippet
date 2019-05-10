import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import * as S from './style';

class Drawer extends Component {
  constructor(props) {
    super(props);

    this.state = {
      openDrawerPanel: this.setInitialDrawer()
    };
  }

  setInitialDrawer = () => {
    const { i18n } = this.props;
    const navlist = i18n.translations.en.contento.mega_menu['menu'];

    let list = [];
    navlist.map(() => list.push(false));

    return {
      drawers: list
    };
  }

  collapseDrawerPanel = (index) => {
    const { openDrawerPanel } = this.state;
    openDrawerPanel.drawers[index] = !openDrawerPanel.drawers[index];
    this.setState(openDrawerPanel);
  };
  
  renderSublist = (menu, idx, type) => {
    return (
      menu['sub-menu']['sub-items'].map((submenu, idx) => (
        submenu['type'] === type ? (
          <S.NavItem key={idx} parent>
            <S.NavLink href={submenu.reference}>
              <S.NavLinkText>
                {submenu.title}
              </S.NavLinkText>
            </S.NavLink>
          </S.NavItem>
          ) : null
      ))     
    );
  }

  renderSubTree = (menu, idx, type) => {
    return (
      menu['sub-menu']['type'] === type ? (
        <S.NavItem key={idx} parent>
          <S.NavLink href={menu.reference}>
            <S.NavLinkText>
              {menu['sub-menu'].title}
            </S.NavLinkText>
          </S.NavLink>

          <S.NavSubMenu isOpen={true}>
            {
              idx === 0 && type === 'AXA' ? (
                <S.NavItem child>
                  <S.NavLink href="/savings-investment/retire-smart">
                    <S.NavLinkText>
                      Retire Smart
                    </S.NavLinkText>
                  </S.NavLink>
                </S.NavItem>
              ) : null
            }
            {
              menu['sub-menu']['sub-items'].map((submenu, idx) =>
                  submenu['buy_online_link'] ?  (
                    <S.NavItem key={idx} child>
                      <S.NavLink href={submenu.reference}>
                        <S.NavLinkText >
                          {submenu.title}
                          <span className="icon">
                            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>
                          </span>
                        </S.NavLinkText>
                        
                      </S.NavLink>
                    </S.NavItem>
                  ) : null
              )
            }
          </S.NavSubMenu>
        </S.NavItem>
        ) : null
    );
  }

  renderSubMenulist = (item, idx) => {
    if (idx === 0) {
      return (
        item.inner_menu_link['group-menu'].map((menu, idx) => (
          menu['sub-menu']['type'] === 'menu-sub-item' ?
            this.renderSublist(menu, idx, 'AXA') :
            this.renderSublist(menu, idx, 'Charterpingan')
        ))
      );

    } else if (idx === 1 || idx === 2) {
      return (
        <div>
          <S.NavItem titlenav>
            <S.NavLink>AXA</S.NavLink>
          </S.NavItem>
            {
              item.inner_menu_link['group-menu'].map((menu, idx) => (
                menu['sub-menu']['type'] === 'menu-sub-item' ?
                this.renderSublist(menu, idx, 'AXA') :
                this.renderSubTree(menu, idx, 'AXA') 
              ))
            }
          <S.NavItem titlenav>
            <S.NavLink>Charterpingan</S.NavLink>
          </S.NavItem> 
            {
              item.inner_menu_link['group-menu'].map((menu, idx) => (
                menu['sub-menu']['type'] === 'menu-sub-item' ?
                this.renderSublist(menu, idx, 'Charterpingan') :
                this.renderSubTree(menu, idx, 'Charterpingan') 
              ))
            }
        </div>
      );
    } else if (idx === 3 || idx === 4) {
      return (
        item.inner_menu_link['axa_links'].map((menu, idx) => (
          <S.NavItem key={idx} parent>
            <S.NavLink  href={menu.reference}> 
              <S.NavLinkText>
                {menu.title}
              </S.NavLinkText>
            </S.NavLink>
          </S.NavItem>
        ))
      );
    } else if (idx === 5) {
      return (
        <div>
          <S.NavItem parent>
            <S.NavLink href="/myaxa/login" >
              <S.NavLinkText>
                Login
              </S.NavLinkText>
            </S.NavLink>
          </S.NavItem>
          <S.NavItem parent>
            <S.NavLink  href="/myaxa/login?isRegister=true">
              <S.NavLinkText>
                Register
              </S.NavLinkText>
            </S.NavLink>
          </S.NavItem>
          <S.NavItem parent>
            <S.NavLink href="/myaxa/forgot-password">
              <S.NavLinkText>
                Forgot Password
              </S.NavLinkText>
            </S.NavLink>
          </S.NavItem>
          <S.NavItem parent>
            <S.NavLink href="/myaxa/faq">
              <S.NavLinkText>
                MyAXA FAQ
              </S.NavLinkText>
            </S.NavLink>
          </S.NavItem>
        </div>
      );
    } else if (idx === 6) {
      return (
        item.inner_menu_link['menu'].map((menu, idx) => (
          <S.NavItem key={idx} parent>
            <S.NavLink  href={menu.reference}> 
              <S.NavLinkText>
                {menu.title}
              </S.NavLinkText>
            </S.NavLink>
          </S.NavItem>
        ))
      );
    } else {
      return null;
    }
  }

  renderNavList =(item, idx) => {
    const { openDrawerPanel } = this.state;
  
    return (
      <S.NavItem key={idx} headernav> 
        <S.NavLink onClick={() => this.collapseDrawerPanel(idx)}>
          <S.NavLinkText> {item.title} </S.NavLinkText>
          <S.NavLinkIcon isOpen={openDrawerPanel.drawers[idx]}>
            <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chevron-right" className="svg-inline--fa fa-chevron-right fa-w-10" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 320 512"><path fill="currentColor" d="M285.476 272.971L91.132 467.314c-9.373 9.373-24.569 9.373-33.941 0l-22.667-22.667c-9.357-9.357-9.375-24.522-.04-33.901L188.505 256 34.484 101.255c-9.335-9.379-9.317-24.544.04-33.901l22.667-22.667c9.373-9.373 24.569-9.373 33.941 0L285.475 239.03c9.373 9.372 9.373 24.568.001 33.941z"></path></svg>
          </S.NavLinkIcon>
        </S.NavLink>

        <S.NavSubMenu isOpen={openDrawerPanel.drawers[idx]} >
          {this.renderSubMenulist(item, idx)}
        </S.NavSubMenu>
      </S.NavItem>
    );
  }

  render() {
    const { i18n, isMenuOpen } = this.props;

    const navlist = i18n.translations.en.contento.mega_menu['menu'];
    const head = i18n.translations.en.contento.head;

    return (
      <S.Wrapper>
        <S.Aside
          className={`drawer hidden-md-up togglable-xs-right ${
            isMenuOpen ? 'in' : ''
          }`}
          data-fade="drawer"
          data-target="#site"
          data-in="in">

          <S.Header>
            <a href={head.button_reference}>
              <S.OutlineButton primary>
                CONSULT AN ADVISOR
              </S.OutlineButton>
            </a>
          </S.Header>
          
          <S.Nav>
            <S.NavList>
              {
                navlist.map((item, idx) => this.renderNavList(item, idx))
              }
            </S.NavList>
            
            <S.Special>
              <p>Live the life you choose</p>
              <a href="/Livethelifeyouchoose">
                <S.WhiteButton>FIND OUT HOW</S.WhiteButton>
              </a>
            </S.Special>

            <S.MetaMenuBlock>
              <S.MetaMenu>
                {
                  head.top_menu.map((menu, idx) => (
                    <S.MetaMenuItem key={idx}>
                      <S.MetaMenuLink href={menu.top_menu_reference}>
                        {menu.top_menu}
                      </S.MetaMenuLink>
                    </S.MetaMenuItem>
                  ))
                }
              </S.MetaMenu>
            </S.MetaMenuBlock>
          </S.Nav>
        </S.Aside>
        <a
          onClick={()=>this.props.onOpenSideMenu(false)}
          href="#"
          className={`mask hidden-lg-up ${
            isMenuOpen ? 'fade-in-md-down' : 'fade-out-delayed-md-down'
          }`}
          data-fade="drawer"
          data-target="#site"
          data-in="fade-in-md-down"
          data-out="fade-out-delayed-md-down"
        />
      </S.Wrapper>
    );
  }
}

Drawer.propTypes = {
  content: PropTypes.object,
  routing: PropTypes.object,
  i18n: PropTypes.object,
  partner: PropTypes.object,
  isMenuOpen: PropTypes.bool,
  onOpenSideMenu: PropTypes.func
};

function mapStateToProps({ content, i18n, routing, partner }) {
  return {
    content,
    i18n,
    routing,
    partner
  };
}


export default connect(
  mapStateToProps
)(Drawer);
