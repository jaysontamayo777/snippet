import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Section, LogoContainer, ContentContainer } from './style';

class PartnerSection extends Component {
  render() {
    const { partner, i18n } = this.props;
    const partnerList = i18n.translations.en.contento.partners_list;
    const partnerContent = partnerList.filter(
      item => partner.code === item.code
    );

    return partnerContent.length > 0 ? (
      <Section styles={partner.styles}>
        <LogoContainer>
          <img
            className="img-responsive"
            alt="partner-logo"
            src={partnerContent[0].image}
          />
        </LogoContainer>
        <ContentContainer>{partnerContent[0].content}</ContentContainer>
      </Section>
    ) : null;
  }
}

PartnerSection.propTypes = {
  i18n: PropTypes.object,
  partner: PropTypes.object
};

function mapStateToProps({ i18n, partner }) {
  return {
    i18n,
    partner
  };
}

export default connect(mapStateToProps)(PartnerSection);
