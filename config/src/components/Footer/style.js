import styled from 'styled-components';
import { Col } from 'reactstrap';
import { media } from '../../constants/mediaSizes';

export const Wrapper = styled.div`
  width: 100%;
  background-color: white;
`;

export const FooterLine = styled.div`
  border-top: 3px solid #0060d6;
  vertical-align: center;
  margin-left: -15px;
  margin-right: -15px;
`;

export const ColBordered = styled(Col)`
  border-bottom: 1px solid #d7d7d7;

  ${media.tablet`
    border-bottom: none;
  `};
`;

export const SocialBlock = styled.div`
  display: block;
  padding-top: 30px;
  padding-bottom: 10px;

  .title {
    font-size: 16px;
    color: #0f2e86;
  }
`;

export const AxawebsiteBlock = styled.div`
  display: block;
  text-align: left;
  padding-top: 30px;
  padding-bottom: 10px;

  ${media.tablet`
    font-size: 34px;
    text-align: right;
  `};

  .title {
    font-size: 16px;
    color: #0f2e86;
  }

  img {
    width: 70px;
    height: 71px;

    ${media.tablet`
      width: 60px;
      height: 61px;
    `};
  }
`;

export const SocialIcons = styled.div`
  display: block;
`;

export const Icon = styled.a`
  color: axaBlue;
  margin-right: 5px;

  img {
    margin-right: 4px;
    margin-bottom: 5px;
  }
`;

export const Copyright = styled.div`
  width: 100%;
  background: #e5e5e5;
  padding-bottom: 10px;
  padding-top: 10px;
`;

export const CopyrightItem = styled.span`
  && {
    float: right;
    border-right: 1px solid #79838d;
    padding: 0 .7143em;
    font-size: 12px;
    line-height: 1.25em;
    margin-top: 2px;
    color: #79838d;
    letter-spacing: 0.02em;

    a[href] {
      color: #337ab7;
      font-size: 12px;
      line-height: 1.25em;
      letter-spacing: 0.02em;
    }
  }
`;
