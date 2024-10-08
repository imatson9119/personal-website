import { css } from 'lit';

export const ComponentStyles = css`
  .main-container {
    display: flex;
    justify-content: stretch;
    align-items: stretch;
    height: 100vh;
    width: 100vw;
    position: relative;
    overflow-x: hidden;
    background-color: var(--secondary-one);
  }

  .primary-photo-container {
    flex-grow: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 50px;
    border-radius: 30px;
    overflow: hidden;
    box-shadow: inset 0 4px 4px 0px rgba(0, 0, 0, 0.25);
    position: relative;
  }

  .primary-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right;
    transform: scale(1.04);
  }

  .banner {
    z-index: 1;
    position: absolute;
    top: 0;
    left: 0;
    color: var(--primary);
    font-size: 6em;
    font-family: var(--font-stack);
    white-space: pre;
  }

  .noise {
    position: absolute;
    inset: -200%;
    background-image: url('/assets/noise.png');
    opacity: 0.05;

    animation: shift 0.02s infinite linear both;
    zoom: 3;
  }

  @keyframes shift {
    0% {
      transform: translateX(10%) translateY(10%);
    }

    100% {
      transform: translateX(-10%) translateY(-10%);
    }
  }

  @media (max-width: 800px) {
    .banner {
      font-size: 4em;
    }
    .primary-photo-container {
      margin: 20px;
    }

    .main-container {
      height: 400px;
    }
  }
`;
