import { css } from "lit";

export const ComponentStyles = css`
  .main-container {
    display: flex;
    flex-direction: column;
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
    margin-bottom: 0;
    border-radius: 30px;
    overflow: hidden;
    position: relative;
  }

  .primary-photo-container:after {
    box-shadow: inset 0 4px 4px 0px rgba(0, 0, 0, 0.25);
    content: '';
    display: block;
    height: 100%;
    position: absolute;
    top: 0;
    width: 100%;
    border-radius: 30px;
  }
  
  .primary-photo {
    width: 100%;
    height: 100%;
    object-fit: cover;
    object-position: right;
    transform: scale(1.04);
    z-index: 0;
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

  .banner:after {
    /* This value is the OPPOSITE color of our background */
    color: rgb(0, 255, 255); 
    mix-blend-mode: difference;
}

  .noise {
    position: absolute;
    inset: -200%;
    background-image: url('/assets/noise.png');
    opacity: 0.05;

    animation: shift .02s infinite linear both;
    zoom: 3;
  }

  .arrow-text-container {
    position: absolute;
    left: 20%;
    top: 20%;
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  .arrow {
    stroke: var(--accent);
    width: 300px;
    height: 300px;
  }

  .arrow-text {
    transform: translateX(-100px) rotate(-10deg);
    font-size: 1.5rem;
  }

  .lower-text {
    display: flex;
    justify-content: center;
    align-items: center;
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
      margin-bottom: 0;
    }

    .main-container {
      height: 400px;
    }
  }
`