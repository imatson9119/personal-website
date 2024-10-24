import { css } from 'lit';

export const ComponentStyles = css`

  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    position: relative;
    box-sizing: border-box;
    overflow: hidden;
    color: var(--secondary-one);
    background-color: #393939;
    background-image:  linear-gradient(#3F3F3F 2px, transparent 2px), linear-gradient(90deg, #3F3F3F 2px, transparent 2px), linear-gradient(#3F3F3F 1px, transparent 1px), linear-gradient(90deg, #3F3F3F 1px, #393939 1px);
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
    background-attachment: fixed;
    border: 3px solid var(--secondary-one);
  }

  .inner-container {
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: stretch;
    max-width: 1200px;
    width: 100%;
  }

  .light-bg {
    background-color: var(--secondary-one);
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;

  }

  app-navbar {
    width: 100%;
  }

  app-splash-screen {
    margin-top: 200px;
  }

  app-portfolio {
    margin-bottom: 20vw
  }

  .wave-container {
    position: relative;
    width: 100%;
  }

  .wave {
    position: absolute;
    width: 100%;
    z-index: 0;
  }

  .wave svg {
    display: block;
    width: 100%;
    height: auto;
    position: absolute;
    bottom: 0;
  }

  .wave.bottom svg {
    bottom: 0; 
  }

  .wave.top svg {
    top: 0;
  }

  .wave.top {
    top: calc(var(--offset) - 1px);
  }

  .wave.bottom {
    bottom: calc(var(--offset) - 1px);
  }

  .wave.top::after {
    content: '';
    position: absolute;
    height: calc(var(--offset));
    width: 100%;
    background: #EAF0CE1a;
    transform: translateY(100%);
  }

  .wave.bottom::after {
    content: '';
    position: absolute;
    height: calc(var(--offset));
    width: 100%;
    background: #EAF0CE1a;
  }

  @media (max-width: 1024px) {
    .main-container {
      flex-direction: column;
    }

    app-splash-screen {
      margin-top: 50px;
    }

    app-portfolio {
      margin-bottom: 50vw;
    }
  }
`;
