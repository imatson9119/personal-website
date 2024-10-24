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
    width: 50%;
    height: 60vh;
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

  .wave-container {
    position: relative;
  }

  .wave {
    position: absolute;
    z-index: 0;
  }

  .wave.top{
    top: 0px;
  }

  .wave.top.two {
    top: 20px;
  }

  .wave.top.three {
    top: 20px; 
  }

  .wave.bottom {
    bottom: -1px;
  }

  .wave.bottom.two {
    bottom: 80px;
  }

  .wave.bottom.three {
    bottom: 100px; 
  }

  .wave-container.bottom {
    margin-top: 300px;
  }


  .rectangle {
    position: absolute;
    width: 100%;
    z-index: 0;
    background: #EAF0CE1A;
  }

  .rectangle.top {
    top: 0;
  }

  .rectangle.bottom {
    bottom: 0;
  }

  .rectangle.top.one {
    height: 20px;
  }

  .rectangle.top.two {
    height: 20px;
  }

  .rectangle.bottom.one {
    height: 80px;
  }

  .rectangle.bottom.two {
    height: 100px;
  }
`;
