import { css } from 'lit';

export const ComponentStyles = css`
  .card-container {
    width: 100vw;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 0;
    margin: 0;
    background-color: #393939;
    background-image: linear-gradient(#3f3f3f 2px, transparent 2px),
      linear-gradient(90deg, #3f3f3f 2px, transparent 2px),
      linear-gradient(#3f3f3f 1px, transparent 1px),
      linear-gradient(90deg, #3f3f3f 1px, #393939 1px);
    background-size:
      100px 100px,
      100px 100px,
      20px 20px,
      20px 20px;
    background-position:
      -2px -2px,
      -2px -2px,
      -1px -1px,
      -1px -1px;
    box-sizing: border-box;
    position: relative;
    overflow: hidden;
  }

  #canvas {
    width: 100vw;
    height: 100vh;
    display: block;
  }

  @media (max-width: 768px) {
    .card-container {
      padding: 0;
    }
  }

  .card-overlay {
    position: absolute;
    pointer-events: none;
    opacity: 0;
    width: 0;
    height: 0;
    overflow: hidden;
  }

  .card-header {
    margin-bottom: 2rem;
    text-align: center;
  }

  .card-name {
    font-family: var(--header-font-stack);
    font-size: 2.5rem;
    color: var(--primary);
    margin: 0 0 0.5rem 0;
    font-weight: 300;
  }

  .card-title {
    font-size: 1.2rem;
    color: var(--accent);
    margin: 0 0 1.5rem 0;
    font-weight: 500;
  }

  .card-blurb {
    font-size: 1rem;
    color: var(--primary);
    line-height: 1.6;
    margin: 0 0 2.5rem 0;
    text-align: center;
  }

  .card-contact {
    display: flex;
    flex-direction: column;
    gap: 1rem;
    margin-bottom: 2rem;
  }

  .contact-item {
    display: flex;
    align-items: center;
    gap: 0.75rem;
    font-size: 1rem;
    color: var(--primary);
  }

  .contact-item a {
    color: var(--primary);
    text-decoration: none;
    transition: color 0.2s ease;
  }

  .contact-item a:hover {
    color: var(--accent);
  }

  .contact-icon {
    width: 20px;
    height: 20px;
    flex-shrink: 0;
  }

  .portfolio-link {
    display: block;
    text-align: center;
    margin-top: 2rem;
    padding-top: 2rem;
    border-top: 1px solid var(--secondary-two);
  }

  .portfolio-link a {
    color: var(--accent);
    text-decoration: none;
    font-weight: 500;
    transition: color 0.2s ease;
  }

  .portfolio-link a:hover {
    color: var(--accent-dark);
  }

  @media (max-width: 768px) {
    .card-container {
      padding: 1rem;
    }

    .business-card {
      padding: 2rem 2.5rem;
    }

    .card-name {
      font-size: 2rem;
    }

    .card-title {
      font-size: 1rem;
    }

    .card-blurb {
      font-size: 0.9rem;
    }

    .contact-item {
      font-size: 0.9rem;
    }
  }

  @media (max-width: 512px) {
    .business-card {
      padding: 1.5rem 2rem;
    }

    .card-name {
      font-size: 1.75rem;
    }

    .card-title {
      font-size: 0.9rem;
    }

    .card-blurb {
      font-size: 0.85rem;
    }

    .contact-item {
      font-size: 0.85rem;
    }
  }

  @media print {
    .card-container {
      min-height: auto;
      padding: 0;
      background-color: white;
    }

    .business-card {
      box-shadow: none;
      border: 1px solid var(--secondary-two);
      max-width: 3.5in;
      padding: 1.5rem 2rem;
    }
  }

  /* Toast Notification Styles - Sonner-inspired */
  .toast-container {
    position: fixed;
    top: 20px;
    right: 20px;
    z-index: 10000;
    display: flex;
    flex-direction: column;
    gap: 12px;
    pointer-events: none;
  }

  .toast {
    pointer-events: auto;
    background: #1a1a1a;
    color: #ffffff;
    padding: 14px 18px;
    border-radius: 8px;
    font-size: 0.9rem;
    font-family: var(--font-stack);
    box-shadow:
      0 10px 38px rgba(0, 0, 0, 0.35),
      0 10px 20px rgba(0, 0, 0, 0.2);
    border: 1px solid rgba(255, 255, 255, 0.1);
    opacity: 0;
    transform: translateX(400px);
    transition: all 0.3s cubic-bezier(0.16, 1, 0.3, 1);
    max-width: 350px;
    word-wrap: break-word;
    position: relative;
    overflow: hidden;
  }

  .toast::before {
    content: '';
    position: absolute;
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background: var(--accent);
  }

  .toast.toast-success::before {
    background: var(--accent);
  }

  .toast.toast-error::before {
    background: #ef4444;
  }

  .toast.toast-visible {
    opacity: 1;
    transform: translateX(0);
  }

  .toast.toast-success {
    border-left-color: var(--accent);
  }

  .toast.toast-error {
    border-left-color: #ef4444;
  }

  @media (max-width: 768px) {
    .toast-container {
      top: 16px;
      right: 16px;
      left: 16px;
    }

    .toast {
      max-width: 100%;
      transform: translateY(-100px);
    }

    .toast.toast-visible {
      transform: translateY(0);
    }
  }
`;
