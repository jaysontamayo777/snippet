import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Carousel, CarouselItem } from 'reactstrap';

import { tagClickPH } from '../../lib/tag';
import { scrollToId } from '../../utils/scrollUtils';
import { BANNER_GET_QUOTE } from '../../constants/tags';

import { BurntSiennaButton, WhiteOutlinedButton } from '../AXAToolkit';
import * as B from './style';

class HeroBanner extends Component {
  constructor(props) {
    super(props);
    this.state = {
      activeIndex: 0,
      isMobile: window.innerWidth <= 991
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 991 });
  };

  renderBanner = bannerItem => (
    <B.Wrapper>
      <B.ContentWrapper>
        <B.Container>
          <B.Content>
            <B.ProductName>{bannerItem.product_name}</B.ProductName>
            <B.Title>{bannerItem.title}</B.Title>
            <B.Lead>{bannerItem.description}</B.Lead>
            <B.ButtonRow>
              <div>
                {!bannerItem.main_button_url ? (
                  <BurntSiennaButton fullWidth onClick={()=>this.getQuote(bannerItem.main_button_tags)}>
                    {bannerItem.main_button}
                  </BurntSiennaButton>
                ) : (
                  <B.Link href={bannerItem.main_button_url} target="_blank">
                    <BurntSiennaButton fullWidth>
                      {bannerItem.main_button}
                    </BurntSiennaButton>
                  </B.Link>
                )}
              </div>
              {bannerItem.secondary_button && (
                <div>
                  {!bannerItem.secondary_button_url ? (
                    <WhiteOutlinedButton fullWidth onClick={()=>this.getQuote(bannerItem.secondary_button_tags)}>
                      {bannerItem.secondary_button}
                    </WhiteOutlinedButton>
                  ) : (
                    <B.Link
                      href={bannerItem.secondary_button_url}
                      target="_blank"
                    >
                      <WhiteOutlinedButton fullWidth>
                        {bannerItem.secondary_button}
                      </WhiteOutlinedButton>
                    </B.Link>
                  )}
                </div>
              )}
            </B.ButtonRow>
          </B.Content>
        </B.Container>
      </B.ContentWrapper>

      <B.Image src={bannerItem.image} />
    </B.Wrapper>
  );

  onExiting = () => {
    this.animating = true;
  };

  onExited = () => {
    this.animating = false;
  };

  next = itemsLength => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === itemsLength - 1
        ? 0
        : this.state.activeIndex + 1;
    this.setState({ activeIndex: nextIndex });
  };

  previous = itemsLength => {
    if (this.animating) return;
    const nextIndex =
      this.state.activeIndex === 0
        ? itemsLength - 1
        : this.state.activeIndex - 1;
    this.setState({ activeIndex: nextIndex });
  };

  goToIndex = newIndex => {
    if (this.animating) return;
    this.setState({ activeIndex: newIndex });
  };

  getQuote = (tag) => {
    const { isMobile } = this.state;
    let scrollGap;
    let bannerTag = BANNER_GET_QUOTE;

    isMobile ? (scrollGap = 50) : (scrollGap = 73);

    scrollToId('getAQuote', scrollGap);

    bannerTag.interaction_detail = tag || '';
    tagClickPH(bannerTag);
  };

  render() {
    const { i18n } = this.props;
    const { activeIndex } = this.state;
    const bannerItems = i18n.translations.en.contento.banner[0].items;

    return bannerItems.length === 1 ? (
      bannerItems.map(bannerItem => this.renderBanner(bannerItem))
    ) : (
      <Carousel
        activeIndex={activeIndex}
        next={() => this.next(bannerItems.length)}
        previous={() => this.previous(bannerItems.length)}
      >
        <B.CarouselIndicators
          items={bannerItems}
          activeIndex={activeIndex}
          onClickHandler={this.goToIndex}
        />

        {bannerItems.map((bannerItem, bannerItemIndex) => (
          <CarouselItem
            key={bannerItemIndex}
            onExiting={this.onExiting}
            onExited={this.onExited}
          >
            {this.renderBanner(bannerItem)}
          </CarouselItem>
        ))}

        <B.CarouselControl
          direction="prev"
          directionText="Previous"
          onClickHandler={() => this.previous(bannerItems.length)}
        />
        <B.CarouselControl
          direction="next"
          directionText="Next"
          onClickHandler={() => this.next(bannerItems.length)}
        />
      </Carousel>
    );
  }
}

HeroBanner.propTypes = {
  i18n: PropTypes.object
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(mapStateToProps)(HeroBanner);
