import { css } from 'lit';

export const ComponentStyles = css`
  .click-text-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;
    z-index: 1000;
  }

  .click-text {
    position: fixed;
    color: var(--secondary-one);
    font-size: .7rem;
    pointer-events: none;
    text-shadow: 0 0 5px rgba(0,0,0,0.3);
    transform: translate(-50%, -50%) rotate(var(--rotation, 0deg));
    transform-origin: center;
    white-space: nowrap;
    opacity: 0;
    animation: fadeInOut 1s ease-out forwards;
    mix-blend-mode: exclusion;
    z-index: 1000;
  }

  .emphasis-line {
    position: fixed;
    height: 3px;
    background-color: var(--secondary-one);
    transform-origin: left center;
    opacity: 0;
    pointer-events: none;
    mix-blend-mode: exclusion;
    z-index: 1000;
    animation: expandAndFade 0.6s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    border-radius: 1.5px;
    box-shadow: 0 0 5px rgba(234, 240, 206, 0.3);
  }

  .streak-indicator {
    position: fixed;
    color: var(--accent);
    font-size: 1.1rem;
    font-weight: bold;
    text-shadow: 0 0 8px rgba(0,0,0,0.5), 0 0 3px rgba(0,0,0,0.8);
    pointer-events: none;
    transform: translate(-50%, -50%);
    white-space: nowrap;
    opacity: 0;
    animation: bounceAndFade 0.8s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
    mix-blend-mode: exclusion;
    z-index: 1001;
    letter-spacing: 0.5px;
  }
  
  /* Special streak indicator styles for different thresholds */
  .streak-indicator.uncommon {
    color: #4BC0C8;
    font-size: 1.3rem;
    text-shadow: 0 0 10px rgba(75, 192, 200, 0.7), 0 0 5px rgba(75, 192, 200, 0.4);
    animation: bounceAndGlow 0.9s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  
  .streak-indicator.rare {
    color: #9F6CFE;
    font-size: 1.5rem;
    text-shadow: 0 0 10px rgba(159, 108, 254, 0.7), 0 0 5px rgba(159, 108, 254, 0.4);
    animation: bounceAndGlow 1s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  
  .streak-indicator.epic {
    color: #FF9D00;
    font-size: 1.8rem;
    text-shadow: 0 0 15px rgba(255, 157, 0, 0.8), 0 0 8px rgba(255, 157, 0, 0.5);
    animation: epicBounceAndGlow 1.2s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  
  .streak-indicator.legendary {
    color: #FF0000;
    font-size: 2.2rem;
    text-shadow: 0 0 20px rgba(255, 0, 0, 0.9), 0 0 10px rgba(255, 0, 0, 0.6);
    animation: legendaryBounceAndGlow 1.5s cubic-bezier(0.2, 0.8, 0.2, 1) forwards;
  }
  
  /* Special effect container */
  .special-effect-container {
    position: fixed;
    pointer-events: none;
    transform: translate(-50%, -50%);
    z-index: 999;
  }
  
  /* Particles for explosions */
  .particle {
    position: absolute;
    top: 0;
    left: 0;
    border-radius: 50%;
    opacity: 0.9;
    transform: translate(-50%, -50%);
    animation: particleMove var(--duration, 0.8s) cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
  }
  
  .uncommon-particle {
    background-color: #4BC0C8;
    box-shadow: 0 0 5px #4BC0C8, 0 0 10px rgba(75, 192, 200, 0.5);
  }
  
  .rare-particle {
    background-color: #9F6CFE;
    box-shadow: 0 0 8px #9F6CFE, 0 0 15px rgba(159, 108, 254, 0.6);
  }
  
  .epic-particle {
    background-color: #FF9D00;
    box-shadow: 0 0 10px #FF9D00, 0 0 20px rgba(255, 157, 0, 0.7);
  }
  
  .legendary-particle {
    background-color: #FF0000;
    box-shadow: 0 0 15px #FF0000, 0 0 25px rgba(255, 0, 0, 0.8);
    animation: legendaryParticleMove var(--duration, 1.2s) cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
  }
  
  .fire-particle {
    background-color: #FF6B00;
    box-shadow: 0 0 15px #FF6B00, 0 0 25px rgba(255, 107, 0, 0.8);
    animation: fireParticleMove var(--duration, 1.5s) cubic-bezier(0.1, 0.8, 0.3, 1) forwards;
  }
  
  /* Shockwave effect */
  .shockwave {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    background: transparent;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.5);
    animation: shockwaveExpand calc(0.8s * var(--scale, 1)) cubic-bezier(0, 0.3, 0.3, 1) forwards;
  }
  
  /* Fire ring effect */
  .fire-ring {
    position: absolute;
    top: 50%;
    left: 50%;
    width: 10px;
    height: 10px;
    background: transparent;
    border-radius: 50%;
    transform: translate(-50%, -50%);
    opacity: 0;
    animation: fireRingExpand 1.5s ease-out forwards;
  }
  
  /* Laser beam effect */
  .laser-beam {
    position: absolute;
    top: 50%;
    left: 50%;
    height: 3px;
    background: linear-gradient(90deg, rgba(255, 0, 0, 0) 0%, rgba(255, 0, 0, 1) 50%, rgba(255, 255, 255, 1) 100%);
    transform-origin: left center;
    transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(0);
    opacity: 0;
    animation: laserBeamShoot 0.6s cubic-bezier(0.1, 0.9, 0.2, 1) var(--delay, 0s) forwards;
    border-radius: 1.5px;
    box-shadow: 0 0 8px rgba(255, 0, 0, 0.8), 0 0 4px rgba(255, 255, 255, 0.9);
    z-index: 998;
  }
  
  /* Screen flash effect */
  .screen-flash {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(255, 255, 255, 0.2);
    z-index: 9999;
    pointer-events: none;
    animation: screenFlash 0.5s ease-out forwards;
  }
  
  .red-flash {
    background-color: rgba(255, 0, 0, 0.15);
    animation: screenFlash 0.7s ease-out forwards;
  }

  @keyframes bounceAndFade {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    30% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.3);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.1);
    }
    80% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.2);
    }
  }
  
  @keyframes bounceAndGlow {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5);
    }
    30% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.5);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3);
    }
    70% {
      transform: translate(-50%, -50%) scale(1.4);
    }
    85% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.3);
    }
  }
  
  @keyframes epicBounceAndGlow {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) rotate(-5deg);
    }
    30% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.6) rotate(5deg);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.3) rotate(-3deg);
    }
    70% {
      transform: translate(-50%, -50%) scale(1.5) rotate(3deg);
    }
    85% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.5) rotate(0deg);
    }
  }
  
  @keyframes legendaryBounceAndGlow {
    0% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(0.5) rotate(-8deg);
    }
    20% {
      opacity: 1;
      transform: translate(-50%, -50%) scale(1.8) rotate(8deg);
    }
    35% {
      transform: translate(-50%, -50%) scale(1.4) rotate(-5deg);
    }
    50% {
      transform: translate(-50%, -50%) scale(1.7) rotate(5deg);
    }
    65% {
      transform: translate(-50%, -50%) scale(1.5) rotate(-3deg);
    }
    80% {
      transform: translate(-50%, -50%) scale(1.6) rotate(3deg);
    }
    90% {
      opacity: 1;
    }
    100% {
      opacity: 0;
      transform: translate(-50%, -50%) scale(1.7) rotate(0deg);
    }
  }

  @keyframes fadeInOut {
    0% {
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    70% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }

  @keyframes expandAndFade {
    0% {
      width: 0;
      opacity: 0.9;
      transform: rotate(var(--rotation)) translateX(6px) scaleX(0);
    }
    40% {
      width: var(--line-length, 16px);
      opacity: 0.9;
      transform: rotate(var(--rotation)) translateX(6px) scaleX(1.2);
    }
    100% {
      width: var(--line-length, 14px);
      opacity: 0;
      transform: rotate(var(--rotation)) translateX(6px) scaleX(1);
    }
  }
  
  @keyframes particleMove {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    100% {
      transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0.2);
      opacity: 0;
    }
  }
  
  @keyframes legendaryParticleMove {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    50% {
      opacity: 1;
    }
    100% {
      transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y))) scale(0);
      opacity: 0;
    }
  }
  
  @keyframes fireParticleMove {
    0% {
      transform: translate(-50%, -50%) scale(1);
      opacity: 1;
    }
    30% {
      opacity: 1;
      transform: translate(calc(-50% + var(--end-x) * 0.3), calc(-50% + var(--end-y) * 0.3 - 20px)) scale(1.2);
    }
    100% {
      transform: translate(calc(-50% + var(--end-x)), calc(-50% + var(--end-y) - 50px)) scale(0.2);
      opacity: 0;
    }
  }
  
  @keyframes shockwaveExpand {
    0% {
      box-shadow: 0 0 0 0px rgba(255, 255, 255, 0.8);
      opacity: 1;
    }
    70% {
      box-shadow: 0 0 0 100px rgba(255, 255, 255, 0);
      opacity: 0.5;
    }
    100% {
      box-shadow: 0 0 0 150px rgba(255, 255, 255, 0);
      opacity: 0;
    }
  }
  
  @keyframes fireRingExpand {
    0% {
      box-shadow: 0 0 0 0px rgba(255, 0, 0, 0), 0 0 0 0px rgba(255, 165, 0, 0);
      opacity: 0;
    }
    10% {
      opacity: 1;
    }
    50% {
      box-shadow: 0 0 0 50px rgba(255, 0, 0, 0.3), 0 0 0 100px rgba(255, 165, 0, 0.1);
      opacity: 0.8;
    }
    100% {
      box-shadow: 0 0 0 150px rgba(255, 0, 0, 0), 0 0 0 200px rgba(255, 165, 0, 0);
      opacity: 0;
    }
  }
  
  @keyframes laserBeamShoot {
    0% {
      width: 0;
      opacity: 0;
      transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(0);
    }
    10% {
      opacity: 1;
    }
    20% {
      width: 300px;
      transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(1);
    }
    40% {
      width: 300px;
      opacity: 1;
      transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(1);
    }
    100% {
      width: 300px;
      opacity: 0;
      transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(1);
    }
  }
  
  @keyframes screenFlash {
    0% {
      opacity: 0.8;
    }
    100% {
      opacity: 0;
    }
  }

  @media (max-width: 768px) {
    .click-text {
      font-size: .5rem;
    }
    
    .streak-indicator {
      font-size: 0.9rem;
    }
    
    .streak-indicator.uncommon {
      font-size: 1.1rem;
    }
    
    .streak-indicator.rare {
      font-size: 1.3rem;
    }
    
    .streak-indicator.epic {
      font-size: 1.5rem;
    }
    
    .streak-indicator.legendary {
      font-size: 1.8rem;
    }
    
    .laser-beam {
      width: 150px;
    }
    
    @keyframes laserBeamShoot {
      0% {
        width: 0;
        opacity: 0;
        transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(0);
      }
      10% {
        opacity: 1;
      }
      20% {
        width: 150px;
        transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(1);
      }
      40% {
        width: 150px;
        opacity: 1;
        transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(1);
      }
      100% {
        width: 150px;
        opacity: 0;
        transform: translate(0, -50%) rotate(var(--angle, 0deg)) scaleX(1);
      }
    }
  }
`; 