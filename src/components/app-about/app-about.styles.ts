import { css } from 'lit';

export const ComponentStyles = css`
  .about-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    background-color: var(--secondary-one);
    color: #3C3C3C;
  }

  #canvas {
    width: 50%;
  }

  .text {
    width: 50%;
    padding: 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
    padding-right: 6rem;
  }

  .title {
    position: relative;
    z-index: 0;
  }

  .title::after {
    content: '';
    background: #3c3c3c29;
    position: absolute;
    top: 50%;
    z-index: -1;
    left: 1rem;
    width: 100%;
    height: 60%;
  }
`;