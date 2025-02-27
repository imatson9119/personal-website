import { css } from 'lit';

export const ComponentStyles = css`
  .click-text-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
  }

  .click-text {
    position: fixed;
    color: var(--secondary-one);
    font-size: .7rem;
    pointer-events: none;
    text-shadow: 0 0 5px rgba(0,0,0,0.3);
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg));
    transform-origin: center;
    white-space: nowrap;
    opacity: 0;
    animation: fadeInOut 1s ease-out forwards;
    mix-blend-mode: exclusion;
    z-index: 1000;
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .click-text {
      font-size: .5rem;
    }
  }
`; 