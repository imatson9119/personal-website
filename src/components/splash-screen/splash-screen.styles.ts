import { css } from "lit";

export const ComponentStyles = css`
  .main-container {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: stretch;
    width: 100vw;
    height: 100vh;
    position: relative;
    border: 3px solid var(--secondary-one);
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
    background-image:  linear-gradient(#3F3F3F 2px, transparent 2px), linear-gradient(90deg, #3F3F3F 2px, transparent 2px), linear-gradient(#3F3F3F 1px, transparent 1px), linear-gradient(90deg, #3F3F3F 1px, #393939 1px);
    background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
    background-position: -2px -2px, -2px -2px, -1px -1px, -1px -1px;
  }

  .header {
    display: flex;
    justify-content: flex-end;
    padding: 1rem;
    gap: 4rem;
  }

  .header a {
    text-decoration: none;
    color: var(--secondary-one);
    font-size: 1.2rem;
  }

  .main-body {
    display: flex;
    flex-direction: row;
    align-items: center;
  }

  .portrait {
    margin-left: 20%;
    width: 50%;
    height: 60vh;
    border-radius: 12px 0 0 12px;
    overflow: hidden;
    border: 3px solid var(--secondary-one);
    border-right: none;
    background-image: url(assets/portrait.png);
    background-size: cover;
    background-position: right;
  }

  .name-text {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .name-text h1 {
    position: relative;
    color: #00000031;
    font-size: 12rem;
    line-height: 8.31rem;
    -webkit-text-stroke: 1px var(--accent);
    transform: translateY(23px);
  }

  .name-text div.accent {
    background: var(--accent);
    position: absolute;
    bottom: 0;
    width: 20px;
    height: 20px;
    border-radius: 100%;
    right: -30px;
  }

  .footer {
    display: flex;
    justify-content: center;
  }

  .footer img {
    width: 2rem;
  }

  @media (max-width: 1000px) {
    .header {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: .5rem;
      justify-content: space-evenly;
    }

    .header a {
      font-size: .8rem;
    }

    .main-body {
      flex-wrap: wrap-reverse;
      height: 100%;
      align-items: flex-end;
    }

    .portrait {
      width: 100%;
      height: 200px;
      border-radius: 0px;
      border-left: none;
      margin-left: 0px;
    }

    .name-text {
      width: 100%;
      flex-grow: 1;
    }

    .name-text h1 {
      font-size: 8rem;
        margin: 0px;
        margin-bottom: 1rem;
        line-height: 5.5556rem;
        transform: none;
    }
  }
`;