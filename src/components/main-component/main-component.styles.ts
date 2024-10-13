import { css } from 'lit';

export const ComponentStyles = css`
  #cursor-trail {
    position: fixed;
    top: 0;
    left: 0;
    fill: none;
    pointer-events: none;

    z-index: 1000;
  }

  #cursor-path {
    stroke-width: 5px;
    stroke-linecap: round;
    stroke-linejoin: round;
    stroke-dasharray: 1;
    stroke-dashoffset: 0;
    fill: none
  }
`;
