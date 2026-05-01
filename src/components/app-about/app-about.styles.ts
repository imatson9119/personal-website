import { css } from 'lit';

export const ComponentStyles = css`
  :host {
    display: block;
    width: 100%;
    max-width: 100vw;
    overflow: hidden;
  }

  .about-container {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    background-color: var(--secondary-one);
    color: #3C3C3C;
    width: 100%;
  }

  #canvas {
    width: 50%;
    flex-shrink: 0;
  }

  .text {
    flex: 1;
    min-width: 0;
    padding: 2rem 4rem 2rem 2rem;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: flex-start;
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

  @media (max-width: 1024px) {
    .about-container {
      flex-direction: column;
    }

    #canvas {
      width: 100%;
    }

    .text {
      width: 100%;
      max-width: 500px;
      padding: 1rem;
    }
  }
`;
