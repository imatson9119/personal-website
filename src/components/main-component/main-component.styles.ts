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
    overflow: clip;
    color: var(--secondary-one);
    background-color: #393939;
    background-image: linear-gradient(#3f3f3f 2px, transparent 2px),
      linear-gradient(90deg, #3f3f3f 2px, transparent 2px),
      linear-gradient(#3f3f3f 1px, transparent 1px),
      linear-gradient(90deg, #3f3f3f 1px, #393939 1px);
    background-size:
      100px 100px,
      100px 100px,
      20px 20px,
      20px 20px;
    background-position:
      -2px -2px,
      -2px -2px,
      -1px -1px,
      -1px -1px;
    border: 3px solid var(--secondary-one);
  }

  .logo {
    position: absolute;
    top: 15px;
    left: 15px;
    color: var(--secondary-one);
    padding: 0.5rem;
    border-radius: 5px;
    display: inline-block;
    isolation: isolate;
    z-index: 1001; /* Higher than navbar z-index */
    margin: 0;
  }

  .initials {
    font-family: var(--header-font-stack);
    mix-blend-mode: exclusion;
    position: relative;
    z-index: 10;
    isolation: isolate;
  }

  .accent {
    color: var(--accent);
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
    margin-bottom: 30vw;
  }

  .wave-container {
    position: relative;
    width: 100%;
    z-index: 20;
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
    background: #eaf0ce1a;
    transform: translateY(100%);
  }

  .wave.bottom::after {
    content: '';
    position: absolute;
    height: calc(var(--offset));
    width: 100%;
    background: #eaf0ce1a;
  }

  .wave-text {
    position: absolute;
    width: 100%;
    height: auto;
    bottom: 0;
    left: 0;
    z-index: 1;
    transform: translateY(-10px);
    overflow: visible;
    shape-rendering: geometricPrecision;
    text-rendering: optimizeLegibility;
  }

  .wave-text.down {
    transform: translateY(50px);
    bottom: auto;
    top: 0;
  }

  .wave-text text {
    fill: var(--secondary-one);
    font-size: 20px;
    font-family: var(--font-stack);
    letter-spacing: 8px;
    opacity: 0.8;
    vector-effect: non-scaling-stroke;
  }

  #wave-curve1,
  #wave-curve2,
  #wave-curve3 {
    fill: none;
    stroke: none;
  }

  @media (max-width: 1024px) {
    .main-container {
      flex-direction: column;
    }

    .wave-text text {
      font-size: 40px;
    }

    .wave-text.down {
      transform: translateY(100px);
    }

    app-splash-screen {
      margin-top: 100px;
    }

    app-portfolio {
      margin-bottom: 50vw;
    }
  }

  /* Additional media queries for the logo on smaller screens */
  @media (max-width: 768px) {
    .logo {
      top: 20px;
      left: 20px;
      padding: 0.4rem;
    }
  }

  @media (max-width: 512px) {
    .logo {
      top: 15px;
      left: 15px;
      padding: 0.3rem;
      font-size: 0.9em;
    }
  }

  @media (max-width: 375px) {
    .logo {
      top: 12px;
      left: 12px;
      padding: 0.2rem;
      font-size: 0.85em;
    }
  }
`;
