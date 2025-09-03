import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentStyles } from './app-click-text.styles.js';
import { MainStyles, isMobileDevice } from '../../styles.js';

@customElement('app-click-text')
export class ClickTextComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];
  
  private streakCount = 0;

  private clickTimer: number | null = null;

  private specialThresholds = [10, 20, 50, 100];
  
  // Properties to track passive effects
  private passiveEffectsActive = false;

  private passiveEffectElements: HTMLElement[] = [];

  private cursorTrailInterval: number | null = null;

  private pulseInterval: number | null = null;

  private borderEffectElement: HTMLElement | null = null;

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.initEventHandlers();
    });
  }

  private initEventHandlers() {
    if (!isMobileDevice()) {
      window.addEventListener('mousedown', (event) => {
        // Use viewport coordinates (clientX/Y)
        const x = event.clientX;
        const y = event.clientY;
        this.handleInteraction(x, y, "click");
      });
    } else {
      window.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        
        // Use viewport coordinates (clientX/Y)
        const x = touch.clientX;
        const y = touch.clientY;
        
        this.handleInteraction(x, y, "tap");
      }, { passive: false }); // passive: false is needed to use preventDefault
    }
  }

  private handleInteraction(x: number, y: number, type: string) {
    // Get container
    const container = this.shadowRoot?.querySelector('.click-text-container') as HTMLElement;
    if (!container) return;
    
    // Clear existing timer if it exists
    if (this.clickTimer !== null) {
      window.clearTimeout(this.clickTimer);
    }
    
    // Increment streak counter on every click
    this.streakCount++;
    
    // Show streak counter for every click after the first one
    if (this.streakCount > 1) {
      this.showStreakIndicator(x, y, this.streakCount);
      
      // Check if we've hit any special thresholds
      if (this.specialThresholds.includes(this.streakCount)) {
        this.triggerSpecialEffect(x, y, this.streakCount);
      }
      
      // Start passive effects at 100 clicks if not already active
      if (this.streakCount >= 100 && !this.passiveEffectsActive) {
        this.startPassiveEffects();
      }
    }
    
    // Reset timer for streak counter
    this.clickTimer = window.setTimeout(() => {
      // If passive effects are active, stop them when streak ends
      if (this.passiveEffectsActive) {
        this.stopPassiveEffects();
      }
      
      this.streakCount = 0;
      this.clickTimer = null;
    }, 2000);
    
    // Create text element for displaying the click type
    const text = document.createElement('div');
    text.className = 'click-text';
    text.textContent = type;
    
    // Create three emphasis lines with staggered angles and delays
    const baseAngles = [0, 120, 240];
    // Create array of indices and shuffle it
    const shuffledIndices = [0, 1, 2].sort(() => Math.random() - 0.5);
    
    baseAngles.forEach((baseAngle, i) => {
      const line = document.createElement('div');
      line.className = 'emphasis-line';
      
      // Add more random variation to each angle (±30 degrees)
      const randomVariation = (Math.random() - 0.5) * 60;
      const finalAngle = baseAngle + randomVariation;
      
      // Generate random length between 10px and 20px
      const randomLength = 10 + Math.random() * 10;
      line.style.setProperty('--line-length', `${randomLength}px`);
      
      // Position line at click point
      line.style.left = `${x}px`;
      line.style.top = `${y}px`;
      line.style.setProperty('--rotation', `${finalAngle}deg`);
      
      // Use shuffled index for staggered delay
      setTimeout(() => {
        this.shadowRoot?.appendChild(line);
        
        // Remove line after animation completes
        setTimeout(() => {
          if (line.parentNode === this.shadowRoot) {
            this.shadowRoot?.removeChild(line);
          }
        }, 600);
      }, shuffledIndices[i] * 50);
    });
    
    // Random initial velocity
    const angle = (Math.random() * Math.PI / 2) + Math.PI/4; // 45° to 135°
    const speed = 2 + Math.random() * 3; // Initial speed between 2-5
    const velocity = {
      x: Math.cos(angle) * speed * (Math.random() < 0.5 ? 1 : -1), // Random direction
      y: -Math.sin(angle) * speed // Always up initially
    };
    
    // Position and physics variables
    const position = {
      x,
      y
    };
    const gravity = 0.1;
    
    // Add to shadow DOM
    this.shadowRoot?.appendChild(text);
    
    const animate = () => {
      // Update position with physics
      position.x += velocity.x;
      position.y += velocity.y;
      velocity.y += gravity;
      
      // Calculate rotation based on velocity vector
      let rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
      
      // Flip the rotation by 180 degrees when moving left to keep text upright
      if (velocity.x < 0) {
        rotation += 180;
      }
      
      // Update element position and rotation
      text.style.left = `${position.x}px`;
      text.style.top = `${position.y}px`;
      text.style.setProperty('--rotation', `${rotation}deg`);
      
      // Continue animation until element is off screen
      if (position.y < window.innerHeight + 100) {
        requestAnimationFrame(animate);
      } else if (text.parentNode === this.shadowRoot) {
          this.shadowRoot?.removeChild(text);
        }
    };
    
    requestAnimationFrame(animate);
  }

  private showStreakIndicator(x: number, y: number, streakValue: number) {
    // Remove any existing streak indicators to prevent overlapping
    this.shadowRoot?.querySelectorAll('.streak-indicator').forEach(element => {
      this.shadowRoot?.removeChild(element);
    });
    
    const streakElement = document.createElement('div');
    
    // Apply different classes based on streak value
    let streakClass = 'streak-indicator';
    if (streakValue >= 100) {
      streakClass += ' legendary';
    } else if (streakValue >= 50) {
      streakClass += ' epic';
    } else if (streakValue >= 20) {
      streakClass += ' rare';
    } else if (streakValue >= 10) {
      streakClass += ' uncommon';
    }
    
    streakElement.className = streakClass;
    streakElement.textContent = `${streakValue}x`;
    
    // Position the streak indicator
    streakElement.style.left = `${x}px`;
    streakElement.style.top = `${y - 30}px`; // Position it slightly above the click
    
    // Add to shadow DOM
    this.shadowRoot?.appendChild(streakElement);
    
    // Determine duration based on streak value
    let duration = 800; // Base duration
    
    if (streakValue >= 100) {
      duration = 1500; // Longer duration for legendary
    } else if (streakValue >= 50) {
      duration = 1200; // Longer for epic
    } else if (streakValue >= 20) {
      duration = 1000; // Longer for rare
    }
    
    // Remove after animation completes
    setTimeout(() => {
      if (streakElement.parentNode === this.shadowRoot) {
        this.shadowRoot?.removeChild(streakElement);
      }
    }, duration);
  }
  
  private triggerSpecialEffect(x: number, y: number, streakValue: number) {
    // Get container
    const container = this.shadowRoot?.querySelector('.click-text-container') as HTMLElement;
    if (!container) return;
    
    // Create container for the special effect
    const effectContainer = document.createElement('div');
    effectContainer.className = 'special-effect-container';
    effectContainer.style.left = `${x}px`;
    effectContainer.style.top = `${y}px`;
    
    // Different effects based on threshold
    if (streakValue >= 100) {
      // Level 4 effect (100+) - Legendary explosion with lasers
      effectContainer.classList.add('level-4');
      this.createParticleExplosion(effectContainer, 60, 'legendary-particle');
      this.createShockwave(effectContainer, 2.0);
      this.createFireRing(effectContainer);
      this.createLaserBeams(effectContainer);
      this.flashScreen();
      
    } else if (streakValue >= 50) {
      // Level 3 effect (50+) - Epic explosion
      effectContainer.classList.add('level-3');
      this.createParticleExplosion(effectContainer, 45, 'epic-particle');
      this.createShockwave(effectContainer, 1.5);
      this.flashScreen();
      
    } else if (streakValue >= 20) {
      // Level 2 effect (20+) - Rare explosion
      effectContainer.classList.add('level-2');
      this.createParticleExplosion(effectContainer, 30, 'rare-particle');
      
    } else if (streakValue >= 10) {
      // Level 1 effect (10+) - Small explosion
      effectContainer.classList.add('level-1'); 
      this.createParticleExplosion(effectContainer, 15, 'uncommon-particle');
    }
    
    // Add the container to our main container
    container.appendChild(effectContainer);
    
    // Determine effect duration based on streak value
    let effectDuration = 2000;
    if (streakValue >= 100) {
      effectDuration = 3000; // Longer for legendary effects
    }
    
    // Remove after animation completes
    setTimeout(() => {
      if (effectContainer.parentNode === container) {
        container.removeChild(effectContainer);
      }
    }, effectDuration);
  }
  
  private createParticleExplosion(container: HTMLElement, count: number, particleClass: string) {
    for (let i = 0; i < count; i++) {
      const particle = document.createElement('div');
      particle.className = `particle ${particleClass}`;
      
      // Random angle and distance
      const angle = Math.random() * Math.PI * 2;
      const distance = 30 + Math.random() * 100;
      
      // Calculate end position
      const endX = Math.cos(angle) * distance;
      const endY = Math.sin(angle) * distance;
      
      // Set random size
      const size = 3 + Math.random() * 7;
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      
      // Set animation variables
      particle.style.setProperty('--end-x', `${endX}px`);
      particle.style.setProperty('--end-y', `${endY}px`);
      
      // Randomize animation duration slightly
      const duration = 0.5 + Math.random() * 1;
      particle.style.setProperty('--duration', `${duration}s`);
      
      // Add to container
      container.appendChild(particle);
    }
  }
  
  private createShockwave(container: HTMLElement, scale: number = 1.0) {
    const shockwave = document.createElement('div');
    shockwave.className = 'shockwave';
    if (scale !== 1.0) {
      shockwave.style.setProperty('--scale', scale.toString());
    }
    container.appendChild(shockwave);
  }
  
  private createFireRing(container: HTMLElement) {
    const fireRing = document.createElement('div');
    fireRing.className = 'fire-ring';
    container.appendChild(fireRing);
  }
  
  private createLaserBeams(container: HTMLElement) {
    // Create 8 laser beams in different directions
    for (let i = 0; i < 8; i++) {
      const angle = (i * 45) * (Math.PI / 180); // Convert to radians
      const beam = document.createElement('div');
      beam.className = 'laser-beam';
      beam.style.setProperty('--angle', `${i * 45}deg`);
      beam.style.setProperty('--delay', `${i * 0.05}s`);
      container.appendChild(beam);
    }
  }
  
  private flashScreen() {
    const container = this.shadowRoot?.querySelector('.click-text-container') as HTMLElement;
    if (!container) return;
    
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    container.appendChild(flash);
    
    // Create another delayed flash for effect
    setTimeout(() => {
      const secondFlash = document.createElement('div');
      secondFlash.className = 'screen-flash red-flash';
      container.appendChild(secondFlash);
      
      // Remove after animation completes
      setTimeout(() => {
        if (secondFlash.parentNode === container) {
          container.removeChild(secondFlash);
        }
      }, 500);
    }, 200);
    
    // Remove after animation completes
    setTimeout(() => {
      if (flash.parentNode === container) {
        container.removeChild(flash);
      }
    }, 700);
  }
  
  // New methods for passive effects
  
  private startPassiveEffects() {
    if (this.passiveEffectsActive) return;
    
    this.passiveEffectsActive = true;
    const container = this.shadowRoot?.querySelector('.click-text-container') as HTMLElement;
    if (!container) return;
    
    // Create background glow effect
    const backgroundGlow = document.createElement('div');
    backgroundGlow.className = 'passive-background-glow';
    container.appendChild(backgroundGlow);
    this.passiveEffectElements.push(backgroundGlow);
    
    // Create screen border effect
    const borderEffect = document.createElement('div');
    borderEffect.className = 'passive-border-effect';
    container.appendChild(borderEffect);
    this.borderEffectElement = borderEffect;
    this.passiveEffectElements.push(borderEffect);
    
    // Start pulsing effect
    this.startPulsingEffect();
  }
  
  private stopPassiveEffects() {
    if (!this.passiveEffectsActive) return;
    
    this.passiveEffectsActive = false;
    
    // Clear intervals
    if (this.cursorTrailInterval !== null) {
      window.clearInterval(this.cursorTrailInterval);
      this.cursorTrailInterval = null;
    }
    
    if (this.pulseInterval !== null) {
      window.clearInterval(this.pulseInterval);
      this.pulseInterval = null;
    }
    
    // Remove all passive effect elements
    this.passiveEffectElements.forEach(element => {
      if (element.parentNode) {
        element.parentNode.removeChild(element);
      }
    });
    
    this.passiveEffectElements = [];
    this.borderEffectElement = null;
  }
  
  private startPulsingEffect() {
    if (this.pulseInterval !== null) {
      window.clearInterval(this.pulseInterval);
    }
    
    let pulseCount = 0;
    this.pulseInterval = window.setInterval(() => {
      if (!this.passiveEffectsActive) {
        window.clearInterval(this.pulseInterval as number);
        this.pulseInterval = null;
        return;
      }
      
      pulseCount++;
      
      // Create a pulse effect every 3 seconds
      if (pulseCount % 3 === 0 && this.borderEffectElement) {
        this.borderEffectElement.classList.add('pulse');
        setTimeout(() => {
          if (this.borderEffectElement) {
            this.borderEffectElement.classList.remove('pulse');
          }
        }, 1000);
      }
    }, 1000);
  }
  
  render() {
    return html`
      <div class="click-text-container"></div>
    `;
  }
} 