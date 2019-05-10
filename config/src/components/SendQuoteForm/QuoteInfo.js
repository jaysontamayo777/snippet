import React, { Fragment } from 'react';
import PropTypes from 'prop-types';
import ReactHtmlParser from 'react-html-parser';

import { CheckBox } from '../AXAToolkit';
import { SendQuoteCol1, SendQuoteCol2, Paragraph } from './style';

const QuoteInfo = ({
  checked,
  onChange,
  textInfo
}) => (
    <Fragment>
      <SendQuoteCol1>
        <CheckBox checked={checked} onClick={onChange} />
      </SendQuoteCol1>
      <SendQuoteCol2 onClick={onChange}>
        <Paragraph>
          {ReactHtmlParser(textInfo)}
        </Paragraph>
      </SendQuoteCol2>
    </Fragment>
  );


QuoteInfo.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
  textInfo: PropTypes.string
};

export default QuoteInfo;
