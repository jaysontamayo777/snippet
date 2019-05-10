import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import ReactHtmlParser from 'react-html-parser';
import { Container } from 'reactstrap';

import * as C from './style';

class Claims extends Component {
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
    const { i18n } = this.props;
    let questionList = i18n.translations.en.contento.claims[0].items;

    return (
      <Container>
        <C.Title>
          {i18n.translations.en.contento.claims[0].claims_title}
        </C.Title>
        <C.Content>
          {questionList &&
            questionList.map((questionItem, index) => (
              <C.Item key={index}>
                <C.Container>
                  <C.Image src={questionItem.claims_image} />
                  <C.Question>{questionItem.title}</C.Question>
                  <C.ShowMore onClick={() => this.toggleAnswer(index)}>
                    {questionItem.show_text}
                  </C.ShowMore>
                  <C.Answer isOpen={this.state.collapse === index}>
                    {ReactHtmlParser(questionItem.description)}
                  </C.Answer>
                </C.Container>
              </C.Item>
            ))}
        </C.Content>
      </Container>
    );
  }
}

Claims.propTypes = {
  i18n: PropTypes.object
};

function mapStateToProps({ i18n }) {
  return {
    i18n
  };
}

export default connect(mapStateToProps)(Claims);
