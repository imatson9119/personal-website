import { css } from 'lit';

export const ComponentStyles = css`

  .navbar {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    background-color: var(--primary-one);
  }

  .navbar .links {
    display: flex;
    gap: 1.5rem;
  }

  .navbar button {
    text-decoration: none;
    color: var(--secondary-one);
    font-size: 1.2rem;
    cursor: pointer;
    transition: transform  0.2s ease-out, background-color 0.2s ease-out, color 0.2s ease-out;
    border-radius: 5px;
    padding: .5rem;
  }

  .navbar button:hover {
    background-color: #bbbe6433;
    color: var(--accent);
  }

  .accent {
    color: var(--accent);
  }

  @media (max-width: 512px) {
    .navbar .links {
      gap: 1rem;
    }

    .navbar button {
      font-size: 1rem;
    }
  }
`;
