import { css } from 'lit';

export const ComponentStyles = css`
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

  .footer-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--secondary-one);
    color: #3C3C3C;
    padding: 2rem;
    padding-top: 0;
  }

  .footer-body {
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }

  .footer-body .left {
    width: 50%;
    display: flex;
    align-items: flex-start;
    justify-content: center;
  }

  .footer-body .right {
    width: 50%;
    display: flex;
    align-items: center;
    flex-direction: column;
    gap: 1rem;
  }

  .footer-text {
    margin-top: 4rem;
    font-size: 0.8rem;
  }
`;
