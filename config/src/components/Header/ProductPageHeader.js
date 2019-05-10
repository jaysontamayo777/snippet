import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import PartnerSection from '../../components/PartnerSection';
import TopBar from './TopBar';
import { Row, Col } from 'reactstrap';
import userIcon from '../../images/user-myaxa.png';
import appStoreImg from '../../images/appstore.png';
import playStoreImg from '../../images/playstore.png';

import * as H from './style';

class ProductPageHeader extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dropdownOpen: false,
      menuDesc: []
    };

    this.toggle = this.toggle.bind(this);
  }

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  replaceSlashToQuoute(str) {
    return str.replace(/[\\']/g, "'").replace("''", "'", 'g');
  }

  _onCollapseItem(e) {
    const itemHeaderClasses = e.currentTarget.classList;
    const itemBodyClasses = e.currentTarget.nextSibling.classList;

    if ( itemHeaderClasses.contains('is-active') && itemBodyClasses.contains('is-open')) {
      itemHeaderClasses.remove('is-active');
      itemBodyClasses.remove('is-open');
    } else {
      itemHeaderClasses.add('is-active');
      itemBodyClasses.add('is-open');
    }
  }

  _onHoverMenuLink(desc) {
    this.setState({ menuDesc: desc });
  }

  renderThreePanel = (menu, idx, type) => {
    return (
      menu['sub-menu']['sub-items'].map((submenu, idx) => (
          submenu['type'] === type ? (
            <H.MenuListItem key={idx} onMouseEnter={()=>this._onHoverMenuLink(submenu.description)}> 
            <a href={submenu.reference}>{submenu.title}</a>
            <H.ProductMenuContainer >
              <H.ProductDescContainer showFirstChild={idx === 0} large={true}>
                <img src={submenu.media_image} />
              </H.ProductDescContainer>
            </H.ProductMenuContainer>
          </H.MenuListItem>
          ) : null
      ))
    )
  }

  renderFourPanel = (menu, idx, type) => {
    return  (
      menu['sub-menu']['type'] === type ? (
        <H.MenuListItem key={idx} onMouseEnter={()=>this._onHoverMenuLink(menu['sub-menu']['description'])}> 
          <H.ProductMenuContainer >
            <a href={menu['sub-menu'].reference}>{menu['sub-menu'].title}</a>
            <H.ProductMenuList toppadding showFirstChild={idx === 0} > 
              {
                menu['sub-menu']['sub-items'].map((submenu, idx) => 
                  submenu['buy_online_link'] ?  (
                    <H.ProductMenuListItem key={idx}>
                      <a href={submenu.reference}>
                        {submenu.title}
                        <span className="icon">
                          <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="shopping-cart"  role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><path fill="currentColor" d="M528.12 301.319l47.273-208C578.806 78.301 567.391 64 551.99 64H159.208l-9.166-44.81C147.758 8.021 137.93 0 126.529 0H24C10.745 0 0 10.745 0 24v16c0 13.255 10.745 24 24 24h69.883l70.248 343.435C147.325 417.1 136 435.222 136 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-15.674-6.447-29.835-16.824-40h209.647C430.447 426.165 424 440.326 424 456c0 30.928 25.072 56 56 56s56-25.072 56-56c0-22.172-12.888-41.332-31.579-50.405l5.517-24.276c3.413-15.018-8.002-29.319-23.403-29.319H218.117l-6.545-32h293.145c11.206 0 20.92-7.754 23.403-18.681z"></path></svg>
                        </span>
                      </a>
                    </H.ProductMenuListItem>
                  ) : (
                    <H.ProductMenuListItem key={idx}>
                      <a href={submenu.reference}>
                        {submenu.title}
                      </a>
                    </H.ProductMenuListItem>
                  )
                )
              }
            </H.ProductMenuList>
            <H.ProductDescContainer showFirstChild={idx === 0} large={false}>
              <img src={menu['sub-menu'].media_image} />
            </H.ProductDescContainer>
          </H.ProductMenuContainer>
        </H.MenuListItem>
      ) : null
    )
  }

  renderPanelMenuList = (menu, idx, type) => {
    return menu['sub-menu']['type'] === 'menu-sub-item' ?
      this.renderThreePanel(menu, idx, type) :
      this.renderFourPanel(menu, idx, type)
  }

  renderNavList = (item, idx) => {
    const { menuDesc } = this.state;
    

    if (idx < 3) {
      return (
        <H.NavItem key={idx} className="nav-item">
          <H.NavLink onMouseEnter={()=>this._onHoverMenuLink(item.description)}>
            {item.title}
          </H.NavLink>
          <H.NavPanel>
            <H.NavPanelContent>
              <Row style={{ display: 'block' }}>
                <Col sm={4} style={{ borderRight: '1px solid #ccc' }}>
                  {/* First column panel */}
                  <H.MenuDescContainer>
                    <H.MenuDescTitle>{item.title}</H.MenuDescTitle>
                    <H.MenuDesc>
                      {
                        typeof menuDesc === 'object' ?
                          menuDesc.map((desc, idx)=> (
                            <p key={idx}> { this.replaceSlashToQuoute(desc) }  </p>
                          )) :
                          <p> {menuDesc}</p>
                      }
                    </H.MenuDesc>
                  </H.MenuDescContainer>
                </Col>
                <Col sm={8}>
                  {/* Second Column Panel */}
                  <H.MenuList>
                    <H.MenuListItem grouptitle
                      onMouseEnter={()=>this._onHoverMenuLink(item.description)}
                      > 
                      <a><strong>AXA</strong></a>
                    </H.MenuListItem>
                      { 
                        item.inner_menu_link['group-menu'].map((menu, idx) => (
                          this.renderPanelMenuList(menu, idx, "AXA")
                        ))
                      }
                    <H.MenuListItem grouptitle><a><strong>Charter Ping An</strong></a></H.MenuListItem>
                      { 
                        item.inner_menu_link['group-menu'].map((menu, idx) => (
                          this.renderPanelMenuList(menu, idx, "Charterpingan")
                        ))
                      }
                  </H.MenuList>
                </Col>
              </Row>
            </H.NavPanelContent>
          </H.NavPanel>
        </H.NavItem>
      );
    } else if (idx === 3 || idx === 4) {
      return (
        <H.NavItem key={idx} className="nav-item">
          <H.NavLink>
            {item.title}
          </H.NavLink>
          <H.NavPanel>
            <H.NavPanelContent>
              <Row style={{ display: 'block' }}>
                <Col sm={4} style={{ borderRight: '1px solid #ccc' }}>
                  {/* First column panel */}
                  <H.MenuDescContainer>
                    <H.MenuDescTitle>{item.title}</H.MenuDescTitle>
                    <H.MenuDesc>
                      {
                        typeof menuDesc === 'object' ?
                          menuDesc.map((desc, idx)=> (
                            <p key={idx}> { this.replaceSlashToQuoute(desc) }  </p>
                          )) :
                          <p> {menuDesc}</p>
                      }
                    </H.MenuDesc>
                  </H.MenuDescContainer>
                </Col>
                <Col sm={8}>
                  {/* Second Column Panel */}
                  <H.MenuList>
                    <H.MenuListItem grouptitle onMouseEnter={()=>this._onHoverMenuLink(item.inner_menu_link['axa_description'])}>
                      <a><strong>AXA</strong></a>
                      <H.ProductMenuContainer >
                        <H.ProductMenuList showFirstChild={true} style={{ paddingTop: '0' }}> 
                          {
                            item.inner_menu_link['axa_links'].map((menu, idx) => (
                              <H.ProductMenuListItem key={idx}>
                                <a href={menu.reference}>
                                  {menu.title}
                                </a>
                              </H.ProductMenuListItem>
                            )) 
                          }
                        </H.ProductMenuList>
                        <H.ProductDescContainer showFirstChild={true} large={false}>
                          <img src={item.inner_menu_link['axa_image']} />
                        </H.ProductDescContainer>
                      </H.ProductMenuContainer>
                    </H.MenuListItem>

                    <H.MenuListItem grouptitle onMouseEnter={()=>this._onHoverMenuLink(item.inner_menu_link['charterpingan_description'])}>
                      <a><strong>Charter Ping An</strong></a>
                      <H.ProductMenuContainer >
                        <H.ProductMenuList showFirstChild={idx === 0} > 
                          {
                            item.inner_menu_link['charterpingan_link'].map((menu, idx) => (
                              <H.ProductMenuListItem key={idx}>
                                <a href={menu.reference}>
                                  {menu.title}
                                </a>
                              </H.ProductMenuListItem>
                            )) 
                          }
                        </H.ProductMenuList>
                        <H.ProductDescContainer showFirstChild={idx === 0} large={false}>
                          <img src={item.inner_menu_link['charterpingan_image']} />
                        </H.ProductDescContainer>
                      </H.ProductMenuContainer>
                    </H.MenuListItem>
                  </H.MenuList>
                </Col>
              </Row>
            </H.NavPanelContent>
          </H.NavPanel>
        </H.NavItem>
      );
    } else if (idx === 5) {
      return (
        <H.NavItem key={idx} className="nav-item">
          <H.NavLink>
            {item.title}
          </H.NavLink>
          <H.NavPanel>
            <H.NavPanelContent>
              <Row style={{ display: 'block' }}>
                <Col sm={4} style={{ borderRight: '1px solid #ccc' }}>
                  <H.MenuDescContainer>
                    <H.MenuDescTitle>{item.title}</H.MenuDescTitle>
                    <H.MenuDesc>
                      {
                        typeof item.description === 'object' ?
                          item.description.map((desc, idx)=> (
                            <p key={idx}> { this.replaceSlashToQuoute(desc) }  </p>
                          )) :
                          <p> {item.description}</p>
                      }
                    </H.MenuDesc>
                  </H.MenuDescContainer>
                </Col>
                <Col sm={2} style={{ paddingRight: '0' }}>
                  <H.MenuList>
                    <H.MenuListItem><a style={{ marginLeft: '0' }} href="/myaxa/login" >Login</a></H.MenuListItem>
                    <H.MenuListItem><a style={{ marginLeft: '0' }} href="/myaxa/login?isRegister=true">Register</a></H.MenuListItem>
                    <H.MenuListItem><a style={{ marginLeft: '0' }} href="/myaxa/forgot-password">Forgot Password</a></H.MenuListItem>
                    <H.MenuListItem><a style={{ marginLeft: '0' }} href="/myaxa/faq">MyAXA FAQ</a></H.MenuListItem>
                  </H.MenuList>
                </Col>
                <Col sm={6}>
                  <H.ProductDescContainer showFirstChild={true} large={true} style={{ width: '100%', minHeight: '435px' }}>
                    <div className="pull-left">
                      <img src={item.inner_menu_link['image']} style={{ marginRight: '20px' }}/>
                    </div>
                    <div>
                      <p><strong>{item.inner_menu_link['subtitle']}</strong></p>
                      <div>
                        <a href={item.inner_menu_link['playstore_link']}>
                          <img src={appStoreImg}  style={{ width: '200px', display: 'block', marginTop: '20px' }} />
                        </a>
                      </div>
                      <div>
                        <a href={item.inner_menu_link['googleplay_link']}>
                          <img src={playStoreImg} style={{ width: '200px', display: 'block', marginTop: '20px' }} />
                        </a>
                      </div>
                    </div>
                  </H.ProductDescContainer>
                </Col>
              </Row>
            </H.NavPanelContent>
          </H.NavPanel>
        </H.NavItem>
      );
    } else if (idx === 6) {
      return (
        <H.NavItem key={idx} className="nav-item">
          <H.NavLink>
            {item.title}
          </H.NavLink>
          <H.NavPanel>
            <H.NavPanelContent>
              <Row style={{ display: 'block' }}>
                <Col sm={4} style={{ borderRight: '1px solid #ccc' }}>
                  <H.MenuDescContainer>
                    <H.MenuDescTitle>{item.title}</H.MenuDescTitle>
                    <H.MenuDesc>
                      {
                        typeof item.description === 'object' ?
                          item.description.map((desc, idx)=> (
                            <p key={idx}> { this.replaceSlashToQuoute(desc) }  </p>
                          )) :
                          <p> {item.description}</p>
                      }
                    </H.MenuDesc>
                  </H.MenuDescContainer>
                </Col>
                <Col sm={2} style={{ paddingRight: '0' }}>
                  <H.MenuList>
                    {
                      item.inner_menu_link['menu'].map((menu, idx) => (
                        <H.MenuListItem key={idx}><a href={menu.reference} style={{ marginLeft: '0' }}>{menu.title}</a></H.MenuListItem>
                      ))
                    }
                  </H.MenuList>
                </Col>
                <Col sm={6}>
                  <H.ProductDescContainer showFirstChild={true} large={true} style={{ width: '100%', minHeight: '435px' }}>
                    <img src={item.inner_menu_link['image']}/>
                  </H.ProductDescContainer>
                </Col>
              </Row>
            </H.NavPanelContent>
          </H.NavPanel>
        </H.NavItem>
      );
    } else return;
  }

  render() {
    const { i18n, partner } = this.props;
    const partnerList = i18n.translations.en.contento.partners_list;
    const navlist = i18n.translations.en.contento.mega_menu['menu'];
    const head = i18n.translations.en.contento.head;

    const partnerContent = partnerList.filter(
      item => partner.code === item.code
    );

    return (

      <H.Wrapper className="header" id="header">
        { 
          partnerContent.length > 0 ? <PartnerSection /> : 
          (
            <div>
              <H.MetaMenuWrapper>
                <H.MetaMenuContainer>
                  <H.MetaMenuNav>
                    <H.MetaMenu>
                      {
                        head.top_menu.map((menu, idx) => (
                          <H.MetaMenuItem key={idx}>
                            <H.MetaMenuLink href={menu.top_menu_reference}>
                              {menu.top_menu}
                            </H.MetaMenuLink>
                          </H.MetaMenuItem>
                        ))
                      }
                      <H.MetaMenuItem>
                        <a href={head.button_reference}>
                          <H.MetaMenuNavButton >
                            {head.button}
                          </H.MetaMenuNavButton>
                        </a>
                      </H.MetaMenuItem>
                    </H.MetaMenu>
                  </H.MetaMenuNav>
                </H.MetaMenuContainer>
              </H.MetaMenuWrapper>

              <H.Main>
                <H.ContainerFluid fluid>
                  <H.Brand href="http://www.axa.com.ph">
                    <svg xmlns="http://www.w3.org/2000/svg" width="117.4" height="56.7" viewBox="0 0 117.4 56.7" id="Calque_1" className="header-brand-image">
                      <g id="Calque_2">
                        <g id="AXA_china">
                          <rect y="0" className="st0" width="56.7" height="56.7" />
                          <polygon
                            className="st1"
                            points="35.1,28 56.7,0 53.5,0 31.9,28"
                          />
                          <path
                            className="st2"
                            d="M43.3,40.5c1,2.8,3,10,3.8,10.5h-5.3c0-0.6-0.1-1.3-0.2-1.9c-0.2-0.8-2.2-7-2.2-7h-8.5L29.6,44c0,0,1.6,5,1.7,5.3c0.2,0.4,0.9,1.8,0.9,1.8h-5.1c0,0-0.1-0.8-0.2-1.1s-0.5-1.7-0.5-1.7c-0.5,0.6-1,1.2-1.5,1.9c-0.3,0.6-0.5,0.9-0.5,0.9h-4c0,0-0.1-0.8-0.2-1.1s-0.5-1.8-0.5-1.8c-0.5,0.6-1,1.3-1.4,2c-0.3,0.6-0.5,0.9-0.5,0.9h-4c0,0,1.1-1.1,1.5-1.6c0.7-0.8,3.1-4,3.1-4l-1-3.4H9.1c0,0-4.8,6.3-5,6.5C3.5,49.4,3,50.2,2.5,51H0v-1.6l0.1-0.1c0.1-0.1,3.6-4.5,6.9-8.8c3-3.8,5.7-7.5,6-7.9c0.5-0.9,1-1.8,1.4-2.7h4.4c0,0.7,0.1,1.4,0.2,2.1c0.1,0.4,2.8,9.1,2.8,9.2l1.5-1.9l-2.5-7.7c-0.2-0.6-0.5-1.1-0.8-1.7h5.1c0,0.5,0,0.9,0.2,1.4c0.2,0.6,1.3,4.6,1.3,4.6s3.5-4.3,3.7-4.7c0.2-0.4,0.4-0.8,0.4-1.3h4.2c-0.8,0.7-1.5,1.4-2.1,2.3l-4.9,6.3l0.6,2c0,0.2,0.1,0.3,0.1,0.3l0.3-0.3c1.2-1.5,6.4-8.3,6.7-8.9c0.3-0.5,0.6-1.1,0.9-1.6h4.1c0,0.5,0.1,1.1,0.2,1.6L43.3,40.5z M37,34c-1.3,2-2.7,3.9-4.2,5.7h5.7c0,0-1.1-3.4-1.3-4.1C37.1,35,37.1,34.5,37,34C37.1,33.9,37.1,33.8,37,34z M15.3,34c-1.3,2-2.7,3.9-4.2,5.7h5.7c0,0-1.1-3.4-1.3-4.1C15.4,35,15.3,34.5,15.3,34C15.4,33.9,15.3,33.8,15.3,34z M23.8,47.2l1.6-2.2c-0.1-0.2-1-2.8-1-2.8l-1.5,2L23.8,47.2z"
                          />
                        </g>
                      </g>
                    </svg>
                  </H.Brand>
                  <H.MobileNavMenu>
                    <H.BurgerMenu  
                      onClick={()=>this.props.onOpenSideMenu(true)}
                      data-fade="drawer"
                      data-target="#site"
                      data-in="is-open">
                      <span></span>
                    </H.BurgerMenu>
                    <H.UserDropdown isOpen={this.state.dropdownOpen} toggle={this.toggle} >
                      <H.UserDropdownToggle style={{ border: 'none', backgroundColor: 'transparent', outline: 'none', boxShadow: 'none', borderRight: '1px solid #a8a8a8' }}>
                        <img className="" src={userIcon} />
                      </H.UserDropdownToggle>
                      <H.UserDropdownMenu right>
                        <H.UserDropdownItem>Welcome to MyAXA</H.UserDropdownItem>
                        <H.UserDropdownItem>Login</H.UserDropdownItem>
                        <H.UserDropdownItem>Register</H.UserDropdownItem>
                        <H.UserDropdownItem>Forgot Password</H.UserDropdownItem>
                        <H.UserDropdownItem>MyAXA FAQ</H.UserDropdownItem>
                      </H.UserDropdownMenu>
                    </H.UserDropdown>
                  </H.MobileNavMenu>
                  <H.Nav id="overviewNav" className="nav float-xs-right">
                    <H.NavList>
                      {
                        navlist.map((item, idx) => this.renderNavList(item, idx))
                      }
                    </H.NavList>
                  </H.Nav>

                  <div className="nav-stroke" data-spy="stroke" data-target="#overviewNav" style={{ width: '107px', bottom: '1px', transform: 'translate3d(431.984px, 0px, 0px)' }} />     
                </H.ContainerFluid>
              </H.Main>
            </div> 
          ) 
        }
      </H.Wrapper>
    );
  }
}

ProductPageHeader.propTypes = {
  content: PropTypes.object,
  routing: PropTypes.object,
  i18n: PropTypes.object,
  onOpenSideMenu: PropTypes.func,
  partner: PropTypes.object
};

function mapStateToProps({ content, i18n, routing, partner }) {
  return {
    content,
    i18n,
    routing,
    partner
  };
}

export default connect(mapStateToProps)(ProductPageHeader);
