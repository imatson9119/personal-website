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
    gap: 2rem;
  }

  .navbar button {
    text-decoration: none;
    color: var(--secondary-one);
    font-size: 1.2rem;
    cursor: pointer;
  }

  .accent {
    color: var(--accent);
  }
`;
