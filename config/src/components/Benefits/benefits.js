import React, { Component } from 'react';
import { Container } from 'reactstrap';
import { I18n } from 'react-redux-i18n';
import { getSafeContent } from '../../utils/contentoUtil';

import * as B from './style';

class Benefits extends Component {
  render() {
    const benefitList = getSafeContent(
      I18n.t('contento.benefits_covered.0.items')
    );

    return (
      <Container>
        <B.Title>{I18n.t('contento.benefits_covered.0.title')}</B.Title>
        <B.List>
          {benefitList &&
            benefitList.map((benefitItem, index) => (
              <B.Item key={index}>
                <B.Image src={benefitItem.image} />
                <B.Name>{benefitItem.name}</B.Name>
                <B.Description>{benefitItem.description}</B.Description>
              </B.Item>
            ))}
        </B.List>
      </Container>
    );
  }
}

export default Benefits;
