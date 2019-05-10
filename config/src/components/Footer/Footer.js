import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Container, Row, Col } from 'reactstrap';
import facebook from '../../images/facebook.svg';
import twitter from '../../images/twitter.svg';
import youtube from '../../images/youtube.svg';
import linkedin from '../../images/linkedin.svg';
import * as F from './style';


class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    const { i18n } = this.props;
    const content = i18n.translations.en.contento.footer;
    const icons = {
      facebook,
      twitter,
      youtube,
      linkedin
    };

    return (
      <F.Wrapper>
        <Container>
          <F.FooterLine />
          <Row style={{ display: 'block' }}>
            <F.ColBordered sm={6}>
              <F.SocialBlock>
                <p className="title">{content['social-network-title']}</p>
                <F.SocialIcons>
                  {
                    content.networks.map((social, idx) =>
                      <F.Icon key={idx} href={social.reference} target="_blank" rel="noopener noreferrer" >
                        <img src={icons[social.title]}/>
                      </F.Icon>
                    )
                  }
                 
                </F.SocialIcons>
              </F.SocialBlock>
            </F.ColBordered>
            <Col sm={6}>
              <F.AxawebsiteBlock>
                <p className="title">{content['axa-title']}</p>
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href="https://www.axa.com/"
                >
                  <img src={content['image-axa']} alt="AXA Worldwide"/>
                  
                </a>
              </F.AxawebsiteBlock>
            </Col>
          </Row>
        </Container>
        <F.Copyright>
          <Container>
            <F.CopyrightItem>
              <a href={`https://www.axa.com.ph${content['site-map']}`}>
                Site Map
              </a>
            </F.CopyrightItem>
            <F.CopyrightItem>
              <a href={`https://www.axa.com.ph${content['legal-disclaimer']}`}>
                Legal Disclaimer
              </a>
            </F.CopyrightItem>
            <F.CopyrightItem>
              <a href={`https://www.axa.com.ph${content['privacy_policy_link']}`}>Privacy Policy</a>
            </F.CopyrightItem>
            <F.CopyrightItem>{ content.copyright }</F.CopyrightItem>
          </Container>
        </F.Copyright>
      </F.Wrapper>
    );
  }
}

Footer.propTypes = {
  content: PropTypes.object,
  routing: PropTypes.object,
  i18n: PropTypes.object,
};

function mapStateToProps({ content, i18n, routing }) {
  return {
    content,
    i18n,
    routing,
  };
}

export default connect(mapStateToProps)(Footer);
