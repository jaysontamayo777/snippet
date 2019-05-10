import React, { Component } from 'react';
import { I18n } from 'react-redux-i18n';
import ReactHtmlParser from 'react-html-parser';
import { Container } from 'reactstrap';

import { getSafeContent } from '../../utils/contentoUtil';

import * as Q from './style';

class Faq extends Component {
  state = {
    collapse: false
  };

  toggleAnswer = index => {
    const { collapse } = this.state;

    collapse === index
      ? this.setState({ collapse: '' })
      : this.setState({ collapse: index });
  };

  render() {
    let questionList = getSafeContent(I18n.t('contento.faq.0.items'));

    return (
      <Container>
        <Q.Title>{I18n.t('contento.faq.0.title')}</Q.Title>
        <Q.Content>
          {questionList &&
            questionList.map((questionItem, index) => (
              <Q.Item key={index}>
                <Q.Container>
                  <Q.Image src={questionItem.image} />
                  <Q.Question>{questionItem.question}</Q.Question>
                  <Q.ShowMore onClick={() => this.toggleAnswer(index)}>
                    {questionItem.show_answer}
                  </Q.ShowMore>
                  <Q.Answer isOpen={this.state.collapse === index}>
                    {ReactHtmlParser(questionItem.answer)}
                  </Q.Answer>
                </Q.Container>
              </Q.Item>
            ))}
        </Q.Content>
      </Container>
    );
  }
}

export default Faq;
