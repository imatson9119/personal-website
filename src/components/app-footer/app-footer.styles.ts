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
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: var(--secondary-one);
    color: #3C3C3C;
    padding: 2rem;
    padding-top: 0;
    box-sizing: border-box;
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

  a {
    text-decoration: none;
    color: #3C3C3C;
  }

  @media (max-width: 1024px) {
    .footer-body {
      flex-direction: column;
      align-items: center;
    }

    .footer-body .left,
    .footer-body .right {
      width: 100%;
      justify-content: center;
    }

    .footer-body .left {
      margin-bottom: 3rem;
    }
  }
`;
