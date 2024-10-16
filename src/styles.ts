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
  }

  body {
    color: var(--primary);
  }

  * {
    font-family: var(--font-stack);
  }

  .material-symbols-outlined {
    font-variation-settings:
    'FILL' 0,
    'wght' 400,
    'GRAD' 0,
    'opsz' 24
  }
`;
