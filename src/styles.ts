import { css } from 'lit';

export const MainStyles = css`
  :host {
    --accent: #bbbe64;
    --accent-dark: #a0a35e;
    --accent-light: #d2d5a9;

    --primary: #443850;
    --primary-dark: #2d2537;
    --primary-light: #5f4b66;

    --secondary-one: #eaf0ce;
    --secondary-one-dark: #d5e0b9;
    --secondary-one-light: #f4f7e1;

    --secondary-two: #c0c5c1;
    --secondary-two-dark: #a6aba7;
    --secondary-two-light: #d6d9d7;

    --secondary-three: #7d8491;
    --secondary-three-dark: #646c7a;
    --secondary-three-light: #959ca8;

    --font-stack: 'Fira Mono', monospace;
    --header-font-stack: "Krona One", sans-serif;
  }

  body {
    color: var(--primary);
    font-size: 1rem;
  }

  .accent {
    color: var(--accent);
  }

  h1 {
    font-family: var(--header-font-stack);
    font-weight: 300;
    margin: 0;
    font-size: 2rem;
  }

  ::selection {
    background: var(--accent);
    color: var(--primary);
  }

  * {
    font-family: var(--font-stack);
    box-sizing: border-box;
  }

  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  }

  button {
    background: transparent;
    border: none;
    padding: 0;
    margin: 0;
  }

  @media (max-width: 512px) {
    h1 {
      font-size: 1.5rem;
    }

    * :not(.exclude-font-adjustments){
      font-size: 0.8rem;
    }
  }
`;

export function isMobileDevice() {
  return window.innerWidth < 1024 || ('ontouchstart' in window);
}
