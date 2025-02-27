import { css } from 'lit';

export const ComponentStyles = css`
  .splash-screen {
    display: flex;
    flex-direction: row;
    align-items: flex-start;
    justify-content: stretch;
    margin: 0 15%;
    position: relative;
    z-index: 1;
    position: relative;
  }

  .text {
    width: 50%;
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: flex-start;
    padding-bottom: 25vw;
    border-left: 3px solid;
    padding-left: 10px;
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
    max-width: 300px;
    border-radius: 12px;
  }

  @media (max-width: 1024px) {
    .splash-screen {
      flex-direction: row;
      flex-wrap: wrap-reverse;
    }

    .text {
      width: 100%;
      max-width: 500px;
      padding-bottom: 40vw;
    }

    .image {
      width: 100%;
      align-items: center;
      justify-content: center;
      margin-bottom: 4rem;
    }
  }
`;
