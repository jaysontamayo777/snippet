import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';

export const Section = styled.div`
  && {
    display: flex;
    align-items: center;
    padding: 5% 10%;
    flex-direction: column;
    box-shadow: none !important;
  
    ${media.tablet`flex-direction: row; padding: 0 10%;`};
  
    ${props => props.styles};
  }
`;

export const LogoContainer = styled.div`
  flex: 1;
  width: 30%;
  min-width: 250px;
  padding: 0 0 15px 0;

  ${media.tablet`padding: 0 20px;`};
`;

export const ContentContainer = styled.div`
  flex-grow: 1;
  padding: 3% 0;
`;
