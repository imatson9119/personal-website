import { css } from 'lit';

export const ComponentStyles = css`
  button {
    height: 24px;
    width: 24px;
    transition: all 0.3s ease;
    cursor: pointer;
  }

  button:hover {
    transform: scale(1.1);
  }

  h2 {
    font-family: var(--header-font-stack);
  }

  .project-container {
    margin: 0 10%;
    margin-top: 10rem;
    display: flex;
    flex-direction: row;
    align-items: stretch;
    justify-content: stretch;
    min-height: 400px;
    position: relative;
  }

  .left {
    display: flex;
    width: 50%;
    align-items: flex-start;
    justify-content: flex-start;
    overflow: hidden;
    box-sizing: border-box;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .left img {
    width: 80%;
    border-radius: 12px;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .right {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    transition: opacity 0.5s ease, transform 0.5s ease;
  }

  .project-header {
    width: 100%;
    display: flex;
    gap: 1rem;
    justify-content: space-between;
    align-items: center;
  }

  h2 {
    font-size: 1.3rem;
  }

  .links {
    display: flex;
    gap: 1rem;
  }

  a {
    color: #bbbe64;
    text-decoration: none;
    background: #bbbe6433;
    padding: 0.5rem;
    border-radius: 8px;
    transition: transform 0.3s ease-out, background-color 0.2s ease-out, color 0.2s ease-out;
  }

  a:hover {
    background: #bbbe64;
    color: white;
  }

  .github {
    background: #af93cc33;
    color: #af93cc;
  }

  .github:hover {
    background: #af93cc;
    color: white;
  }

  .slide-left {
    transform: translateX(-20px);
    opacity: 0;
  }

  .slide-right {
    transform: translateX(20px);
    opacity: 0;
  }

  button[disabled] {
    opacity: 0.5;
    cursor: not-allowed;
  }

  @media (max-width: 1024px) {
    .project-container {
      flex-direction: column;
      margin: 0 5%;
      margin-top: 5rem;
      align-items: center;
      justify-content: center;
    }

    .left {
      width: 100%;
      justify-content: center;
      align-items: center;
    }

    .left img {
      max-width: 500px;
    }

    .right {
      width: 100%;
      max-width: 500px;
    }
  }
`;
