import { css } from "lit";

export const ComponentStyles = css`
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    width: 100%;
    height: 100vh;
    position: relative;
    border: 3px solid var(--secondary-one);
    border-top: none;
    box-sizing: border-box;
    overflow: hidden;
    background-attachment: fixed;
    background-position: 0 0;
    background-repeat: repeat;
    background-size: 100px 100px;
    color: var(--secondary-one);
    background-color: #393939;
    background-image: linear-gradient(#29262e 2px, transparent 2px), linear-gradient(90deg, #29262e 2px, transparent 2px), linear-gradient(#29262e 1px, transparent 1px), linear-gradient(90deg, #29262e 1px, #25212a 1px);
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  }

  #canvas {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .header {
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 1rem;
    margin-top: 3rem;
    font-size: 2rem; 
  }

  .html-content {
    height: 100%;
    display: flex;
    flex-direction: column;
  }

  .accent {
    color: var(--accent);
  }


  .body {
    display: flex;
    flex-grow: 1;
    flex-direction: column;
    align-items: center;
    justify-content: flex-end;
    padding: 2rem;
    margin-bottom: 4rem;
    text-align: center;
    line-height: 2rem;
  }

  #texture1 {
    background-color: #393939;
    color: var(--secondary-one);
    padding: 1rem;
  }

  @media (max-width: 768px) {
    .header {
      font-size: 1.5rem;
      margin-top: 2rem;
    }

    .body {
      padding: .5rem;
      margin-bottom: 1rem;
      line-height: 1.5rem;  
    }
  }

`;