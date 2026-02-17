import { css } from 'lit';

export const ComponentStyles = css`
  .about-screen {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: stretch;
    margin: 0 15%;
    position: relative;
    z-index: 1;
    border-left: 3px solid;
    padding-left: 10px;
    position: relative;
  }

  .text {
    padding-top: 30vw;
    padding-bottom: 6vw;
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
    align-items: flex-start;
  }

  .title {
    position: relative;
  }

  .title::after {
    content: '';
    background: rgba(234, 240, 206, 0.1);
    position: absolute;
    top: 50%;
    z-index: -1;
    left: 1rem;
    width: 100%;
    height: 60%;
  }

  .image {
    display: flex;
    width: 50%;
    align-items: center;
    justify-content: flex-end;
    overflow: hidden;
    box-sizing: border-box;
  }

  .image img {
    width: 80%;
    border-radius: 12px;
  }

  @media (max-width: 1024px) {
    .about-screen {
      flex-direction: column;
    }

    .text {
      width: 100%;
      max-width: 500px;
    }

    .image {
      width: 100%;
    }
  }
`;
