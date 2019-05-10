import styled from 'styled-components';
import { media } from '../../constants/mediaSizes';

export const Col = styled.div`
  flex: 1;
  padding: 20px 10px;

  ${media.desktop`padding: 0 10px;`};
`;
