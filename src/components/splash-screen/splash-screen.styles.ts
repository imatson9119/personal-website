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
    color: var(--secondary-one);
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
    color: #343434;
    font-size: 12rem;
    line-height: 8.31rem;
    -webkit-text-stroke: 1px var(--accent);
    transform: translateY(23px);
  }

  .name-text h1 .accent {
    color: var(--accent);
    -webkit-text-stroke: none;
    font-size: 4rem;
  }

  .footer {
    display: flex;
    justify-content: center;
  }

  .footer img {
    width: 2rem;
  }

  @media (max-width: 1000px) {
    .main-body {
      flex-direction: column;
    }

    .portrait {
      width: 100%;
      border-radius: 0px;
      border-left: none;
      margin-left: 0px;
    }

    .name-text {
      width: 100%;
    }

    .name-text h1 {
      font-size: 8rem;
        margin: 0px;
        margin-bottom: 1rem;
        line-height: 6.31rem;
        transform: none;
    }
  }
`;