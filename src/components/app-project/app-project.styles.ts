import { css } from 'lit';

export const ComponentStyles = css`
  :host {
    display: block;
    width: 100%;
  }

  /* ===== OUTER WRAPPER (scroll-distance spacer) ===== */
  .outer-wrapper {
    position: relative;
    width: 100%;
  }

  /* ===== STICKY VIEWPORT ===== */
  .sticky-viewport {
    position: sticky;
    top: 0;
    width: 100vw;
    height: 100vh;
    margin-left: calc(-50vw + 50%);
    overflow: hidden;
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
      1px 1px,
      1px 1px,
      2px 2px,
      2px 2px;
    z-index: 10;
  }

  /* ===== HORIZONTAL TRACK ===== */
  .horizontal-track {
    display: flex;
    flex-direction: row;
    height: 100%;
    will-change: transform;
  }

  /* ===== SCENE (per project) ===== */
  .scene {
    min-width: 100vw;
    height: 100vh;
    position: relative;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 4vw;
    overflow: hidden;
  }

  /* ===== BACKGROUND NUMBER ===== */
  .bg-number {
    position: absolute;
    font-family: var(--header-font-stack);
    font-size: clamp(15rem, 28vw, 30rem);
    font-weight: 700;
    color: var(--secondary-one);
    opacity: 0;
    line-height: 1;
    pointer-events: none;
    user-select: none;
    top: 50%;
    left: 50%;
    will-change: transform, opacity;
    z-index: 0;
    transform: translate(-50%, -50%);
    transition: opacity 0.7s cubic-bezier(0.16, 1, 0.3, 1);
  }

  .scene.active .bg-number {
    opacity: 0.04;
  }

  /* ===== SCENE IMAGE ===== */
  .scene-image {
    position: relative;
    z-index: 1;
    width: 42vw;
    max-width: 640px;
    flex-shrink: 0;
    will-change: transform, opacity;
    opacity: 0;
    transition: opacity 0.6s cubic-bezier(0.16, 1, 0.3, 1) 0.1s;
  }

  .scene.active .scene-image {
    opacity: 1;
  }

  .scene-image img {
    width: 100%;
    display: block;
    border-radius: 12px;
    box-shadow:
      0 20px 60px rgba(0, 0, 0, 0.4),
      0 8px 20px rgba(0, 0, 0, 0.3);
  }

  /* ===== SCENE CONTENT ===== */
  .scene-content {
    position: relative;
    z-index: 1;
    width: 34vw;
    max-width: 480px;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
    will-change: transform, opacity;
  }

  .scene-content h2 {
    font-family: var(--header-font-stack);
    font-size: clamp(1.2rem, 2vw, 1.8rem);
    color: var(--secondary-one);
    margin: 0;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.2s;
  }

  .scene.active .scene-content h2 {
    opacity: 1;
  }

  .scene-content .date {
    font-size: 0.85rem;
    color: var(--accent);
    letter-spacing: 2px;
    text-transform: uppercase;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.3s;
  }

  .scene.active .scene-content .date {
    opacity: 1;
  }

  .scene-content p {
    font-size: clamp(0.85rem, 1vw, 1rem);
    line-height: 1.6;
    color: var(--secondary-one);
    margin: 0;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.4s;
  }

  .scene.active .scene-content p {
    opacity: 0.85;
  }

  /* ===== LINKS ===== */
  .links {
    display: flex;
    gap: 1rem;
    margin-top: 0.5rem;
    opacity: 0;
    transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1) 0.5s;
  }

  .scene.active .links {
    opacity: 1;
  }

  a {
    color: var(--accent);
    text-decoration: none;
    background: rgba(187, 190, 100, 0.2);
    padding: 0.5rem 1rem;
    border-radius: 8px;
    font-size: 0.9rem;
    transition:
      transform 0.3s ease-out,
      background-color 0.2s ease-out,
      color 0.2s ease-out;
  }

  a:hover {
    background: var(--accent);
    color: white;
  }

  .github {
    background: rgba(175, 147, 204, 0.2);
    color: #af93cc;
  }

  .github:hover {
    background: #af93cc;
    color: white;
  }

  /* ===== PROGRESS INDICATOR ===== */
  .progress {
    position: absolute;
    bottom: 2.5rem;
    left: 50%;
    transform: translateX(-50%);
    display: flex;
    align-items: center;
    gap: 0;
    z-index: 2;
  }

  .dot {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: rgba(234, 240, 206, 0.2);
    cursor: pointer;
    transition:
      background 0.3s ease,
      transform 0.3s ease,
      box-shadow 0.3s ease;
    position: relative;
    z-index: 1;
  }

  .dot:hover {
    background: rgba(234, 240, 206, 0.5);
    transform: scale(1.3);
  }

  .dot.active {
    background: var(--accent);
    transform: scale(1.4);
    box-shadow: 0 0 12px rgba(187, 190, 100, 0.5);
  }

  .progress-segment {
    width: 40px;
    height: 2px;
    background: rgba(234, 240, 206, 0.1);
    position: relative;
    overflow: hidden;
  }

  .progress-segment .fill {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    width: 0%;
    background: var(--accent);
    transition: width 0.3s ease;
  }

  .progress-segment.filled .fill {
    width: 100%;
  }

  .progress-segment.filling .fill {
    transition: width 0.1s linear;
  }

  /* ===== SCENE COUNTER ===== */
  .scene-counter {
    position: absolute;
    top: 5rem;
    right: 3rem;
    font-family: var(--header-font-stack);
    font-size: 0.9rem;
    color: var(--secondary-one);
    opacity: 0.4;
    z-index: 2;
    letter-spacing: 2px;
  }

  /* ===== KEYBOARD HINT ===== */
  .keyboard-hint {
    position: absolute;
    bottom: 2.5rem;
    right: 3rem;
    font-size: 0.75rem;
    color: var(--secondary-one);
    opacity: 0;
    z-index: 2;
    transition: opacity 0.5s ease 1s;
    letter-spacing: 1px;
  }

  .sticky-viewport .keyboard-hint {
    opacity: 0.3;
  }

  /* ===== REDUCED MOTION ===== */
  @media (prefers-reduced-motion: reduce) {
    .bg-number,
    .scene-image,
    .scene-content h2,
    .scene-content .date,
    .scene-content p,
    .links {
      transition: none !important;
    }

    .scene .bg-number {
      opacity: 0.04;
    }

    .scene .scene-image {
      opacity: 1;
      transform: none;
    }

    .scene .scene-content h2,
    .scene .scene-content .date,
    .scene .links {
      opacity: 1;
      transform: none;
    }

    .scene .scene-content p {
      opacity: 0.85;
      transform: none;
    }
  }

  /* ===== MOBILE LAYOUT ===== */
  @media (max-width: 1024px) {
    .outer-wrapper {
      height: auto !important;
    }

    .sticky-viewport {
      position: relative;
      top: auto;
      width: 100%;
      height: auto;
      margin-left: 0;
      z-index: auto;
      overflow: visible;
    }

    .horizontal-track {
      flex-direction: column;
      transform: none !important;
    }

    .scene {
      min-width: 100%;
      height: auto;
      min-height: 80vh;
      flex-direction: column;
      padding: 4rem 6% 6rem;
      gap: 2rem;
    }

    .bg-number {
      font-size: clamp(6rem, 30vw, 12rem);
    }

    .scene-image {
      width: 85%;
      max-width: 400px;
    }

    .scene-content {
      width: 90%;
      max-width: 500px;
      text-align: center;
      align-items: center;
    }

    .links {
      flex-wrap: wrap;
      justify-content: center;
    }

    .progress {
      display: none;
    }

    .scene-counter {
      display: none;
    }

    .keyboard-hint {
      display: none;
    }
  }

  @media (max-width: 512px) {
    .scene {
      padding: 3rem 5% 4rem;
    }

    .scene-image {
      width: 90%;
    }

    .scene-content {
      width: 95%;
    }

    .scene-content h2 {
      font-size: 1.1rem;
    }
  }
`;
