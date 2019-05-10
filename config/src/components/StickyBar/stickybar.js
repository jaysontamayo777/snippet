import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { I18n } from 'react-redux-i18n';

import { Container } from 'reactstrap';
import * as S from './style';

class StickyBar extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isSectionNavBarFixed: false,
      selectedItem: '',
      isMobile: window.innerWidth <= 991
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
    window.addEventListener('scroll', this.fixNavigationOnScroll, true);
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.fixNavigationOnScroll, true);
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 991 });
  };

  fixNavigationOnScroll = () => {
    const { menuList } = this.props;
    const { isMobile } = this.state;

    const sectionNavBar = document.getElementById('sticky-bar');
    const setFix = sectionNavBar.offsetTop;
    const windowY = window.pageYOffset;
    let selectedItem = '';

    let navBarHeight;
    if (isMobile) {
      navBarHeight = 50;
    } else {
      navBarHeight = 72;
    }

    for (let x = 0; x < menuList.length; x++) {
      const element = document.getElementById(menuList[x].divId);

      if (!element) {
        console.error(`No element found with id ${menuList[x].divId}`); // eslint-disable-line
      } else if (windowY >= element.offsetTop - navBarHeight) {
        selectedItem = menuList[x].divId;
      }
    }

    // Check for bottom, set selected to the last item
    // Sorry, quick fix. Added 10px to support zoomed browsers
    if (windowY + window.innerHeight + 10 >= document.body.clientHeight) {
      selectedItem = menuList[menuList.length - 1].divId;
    }

    return this.setState({
      isSectionNavBarFixed: windowY >= setFix,
      selectedItem
    });
  };

  scrollToSection = sectionId => {
    const { isMobile } = this.state;

    const element = document.getElementById(sectionId);

    let navBarHeight;
    if (isMobile) {
      navBarHeight = 50;
    } else {
      navBarHeight = 72;
    }

    try {
      window.scroll({
        top: element.offsetTop - navBarHeight,
        left: 0,
        behavior: 'smooth'
      });
    } catch (e) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  render() {
    const { isSectionNavBarFixed, selectedItem, isMobile } = this.state;

    return (
      <div id="sticky-bar" style={{ height: isMobile ? '50px' : '72px' }}>
        <S.Wrapper fixedOnTop={isSectionNavBarFixed}>
          <Container style={{ height: '100%' }}>
            <S.SectionList>
              {this.props.menuList.map((menu, index) => (
                <S.SectionListItem
                  key={index}
                  onClick={() => this.scrollToSection(menu.divId)}
                  selected={selectedItem === menu.divId}
                >
                  {I18n.t(`navbarlinks.${menu.labelId}`)}
                </S.SectionListItem>
              ))}
            </S.SectionList>
          </Container>
        </S.Wrapper>
      </div>
    );
  }
}

StickyBar.propTypes = {
  i18n: PropTypes.object,
  menuList: PropTypes.array
};

function mapStateToProps({ i18n = {} }) {
  const menu = [
    {
      label: 'Benefits',
      labelId: 'benefits',
      divId: 'benefits'
    },
    {
      label: "Let's Start",
      labelId: 'getAQuote',
      divId: 'getAQuote'
    },
    {
      label: 'Coverage',
      labelId: 'coverage',
      divId: 'coverage'
    },
    {
      label: 'Claims',
      labelId: 'claims',
      divId: 'claims'
    },
    {
      label: 'FAQ',
      labelId: 'faq',
      divId: 'faq'
    }
  ];

  return {
    i18n,
    menuList: menu
  };
}

export default connect(mapStateToProps)(StickyBar);
