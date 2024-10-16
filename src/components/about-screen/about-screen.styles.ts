import { css } from "lit";

export const ComponentStyles = css`
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: calc(100vh - 3px);
    position: relative;
    border: 3px solid var(--secondary-one);
    border-top: 0;
    box-sizing: border-box;
    overflow: hidden;
    background: #3C3C3C;


    background: repeating-linear-gradient(
      45deg, 
      #3C3C3C 0px,
      #3C3C3C 25px,
      #393939 25px,
      #393939 75px,
      #3C3C3C 75px,
      #3C3C3C 100px
    );
    background-attachment: fixed;
    background-position: 0 0;
    background-repeat: repeat;
    background-size: 100px 100px;
    color: var(--secondary-one);
    background-color: #393939;
    background-image:  linear-gradient(#29262e 2px, transparent 2px), linear-gradient(90deg, #29262e 2px, transparent 2px), linear-gradient(#29262e 1px, transparent 1px), linear-gradient(90deg, #29262e 1px, #25212a 1px);
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  }

`;