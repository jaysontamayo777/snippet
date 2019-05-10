import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import ReactHtmlParser from 'react-html-parser';
import { Glyphicon } from 'react-bootstrap';

import * as C from './style';

class ContactUs extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false,
      isMobile: window.innerWidth <= 991
    };
  }

  componentDidMount() {
    window.addEventListener('resize', this.resize);
  }

  resize = () => {
    this.setState({ isMobile: window.innerWidth <= 991 });
  };

  toggle = () => {
    this.setState(prevState => ({
      modal: !prevState.modal
    }));
  };

  render() {
    return (
      <div>
        <C.Wrapper>
          <C.Button onClick={this.toggle}>
            {this.state.isMobile ? <Glyphicon glyph="earphone" /> : 'Call Us'}
          </C.Button>
        </C.Wrapper>
        <C.ModalWrapper isOpen={this.state.modal}>
          <C.ModalDialog>
            <C.ModalContent>
              <button
                onClick={this.toggle}
                type="button"
                className="close"
                aria-label="Close"
              >
                <span aria-hidden="true">×</span>
              </button>

              <div style={{ textAlign: 'center' }}>
                <C.Logo
                  alt="contact-logo"
                  src={I18n.t('contento.contact_us.0.image')}
                />

                <C.Title>
                  {I18n.t('contento.contact_us.0.items.0.title')}
                </C.Title>

                <C.Text>
                  {ReactHtmlParser(
                    I18n.t('contento.contact_us.0.items.0.contact_info')
                  )}
                </C.Text>

                <C.Text>
                  {ReactHtmlParser(
                    I18n.t('contento.contact_us.0.items.0.business_schedule')
                  )}
                </C.Text>
              </div>
            </C.ModalContent>
          </C.ModalDialog>
        </C.ModalWrapper>
      </div>
    );
  }
}

export default ContactUs;
