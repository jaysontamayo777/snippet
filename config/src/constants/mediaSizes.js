import { css } from 'styled-components';

const sizes = {
  largeDesktop: 1200,
  desktop: 992,
  tablet: 768,
  landscapedPhone: 576
};

export const media = Object.keys(sizes).reduce((acc, label) => {
  acc[label] = (...args) => css`
    @media (min-width: ${sizes[label]}px) {
      ${css(...args)};
    }
  `;

  return acc;
}, {});
