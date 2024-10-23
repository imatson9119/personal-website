import { css } from 'lit';

export const ComponentStyles = css`

  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    position: relative;
    border: 3px solid var(--secondary-one);
    box-sizing: border-box;
    overflow: hidden;
    color: var(--secondary-one);
    background-color: #393939;
    background-image:  linear-gradient(#3F3F3F 2px, transparent 2px), linear-gradient(90deg, #3F3F3F 2px, transparent 2px), linear-gradient(#3F3F3F 1px, transparent 1px), linear-gradient(90deg, #3F3F3F 1px, #393939 1px);
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
    background-attachment: fixed;
  }


  .spacer {
    height: 200px;
  }
`;
