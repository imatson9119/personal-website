import { css } from 'lit';

export const ComponentStyles = css`

  .navbar {
    display: flex;
    justify-content: flex-end;
    align-items: center;
    padding: 1rem;
    background-color: transparent; /* Fully transparent background */
    position: fixed;
    top: 3px; /* Match the border width of the main container */
    left: 3px; /* Match the border width of the main container */
    width: calc(100% - 6px); /* Adjust width to account for left and right margins */
    z-index: 1000;
    border-radius: 3px 3px 0 0; /* Optional: round the top corners */
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
    transition: transform 0.2s ease-out, background-color 0.2s ease-out, color 0.2s ease-out, backdrop-filter 0.2s ease-out;
    border-radius: 5px;
    padding: .5rem;
    background-color: rgba(57, 57, 57, 0.35); /* Darker subtle background */
    backdrop-filter: blur(2px); /* Frosted glass effect */
  }

  .navbar button:hover {
    background-color: #bbbe6433; /* Original hover background */
    color: var(--accent);
    backdrop-filter: none; /* Remove blur on hover */
  }

  .accent {
    color: var(--accent);
  }

  /* Tablet */
  @media (max-width: 768px) {
    .navbar .links {
      gap: 1.3rem;
    }
    
    .navbar button {
      font-size: 1.1rem;
      padding: 0.4rem;
    }
  }

  /* Mobile large */
  @media (max-width: 512px) {
    .navbar {
      padding: 0.8rem;
    }
    
    .navbar .links {
      gap: 1.1rem;
    }

    .navbar button {
      font-size: 0.95rem;
      padding: 0.4rem 0.3rem;
      background-color: rgba(57, 57, 57, 0.5); /* Slightly darker background for better visibility */
    }
  }

  /* Mobile small */
  @media (max-width: 375px) {
    .navbar {
      padding: 0.6rem;
    }
    
    .navbar .links {
      gap: 0.8rem;
    }

    .navbar button {
      font-size: 0.85rem;
      padding: 0.3rem 0.2rem;
    }
  }
`;
