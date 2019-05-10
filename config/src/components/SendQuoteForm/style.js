import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';
import { axaBlue, axaRed } from '@axa-asia/frontend/lib/styling/colors';

export const Paragraph = styled.p`
  font-size: 14px;
`;

export const BaseBox = styled.div`
  border-color: #ddd;
  background: transparent !important;
  margin-bottom: 24px;
  background-color: #fff;
  border: 1px solid transparent;
  border-radius: 0;
  box-shadow: 0 1px 1px rgba(0, 0, 0, 0.05);

  ${media.landscapedPhone`margin-top: 15px; border-color: #ddd;`};
`;

export const BaseHeader = styled.div`
  padding: 25px 30px;
  border-bottom: 1px solid transparent;
  border-top-right-radius: -1;
  border-top-left-radius: -1;
  border-color: #ddd;
`;

export const BaseContent = styled.div`
  background: transparent !important;
  padding: 20px;
`;

export const SendQuoteRow = styled.div`
  display: flex;
  margin-bottom: 15px;
  line-height: 1.5;
  letter-spacing: 0.2px;
`;

export const SendQuoteCol1 = styled(SendQuoteRow)`
  width: 25px;
`;

export const SendQuoteCol2 = styled(SendQuoteRow)`
  display: flex;
  flex: 1;
  font-size: 14px;
  letter-spacing: 0.2px;
  align-items: center;
  cursor: pointer;
  
    a {
      font-size: inherit;
      text-decoration: none;
    }
`;

export const SendQuoteLabel = styled.div`
  font-size: 15px;
  margin-bottom: 5px;
`;

export const SendQuoteGroup = styled.div`
  display: flex;
  height: 40px;
`;

export const SendQuoteGroupCol1 = styled(SendQuoteGroup)`
  display: inherit;
  flex: 1;

  .form-group {
    width: 100%;
  }

  input {
    height: inherit;
    padding-left: 10px !important;
    padding-right: 10px !important;
  }
`;

export const SendQuoteGroupCol2 = styled(SendQuoteGroup)`
  height: inherit;
  margin-left: 20px;

  button {
    height: inherit;
  }
`;

export const QuoteMessage = styled.div`
  background-color: ${props => (props.type === 'content' ? axaBlue : axaRed)};
  color: white;
  text-align: center;
  text-transform: inherit;
  font-size: 13px;
  letter-spacing: 0.08em;
  line-height: 24px;
  margin: 5px 0px;
  padding: 4px 5px;
`;
