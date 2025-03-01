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

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.initEventHandlers();
    });
  }

  private initEventHandlers() {
    if (!isMobileDevice()) {
      window.addEventListener('mousedown', (event) => {
        this.handleInteraction(event.clientX, event.clientY, "click");
      });
    } else {
      window.addEventListener('touchstart', (event) => {
        const touch = event.touches[0];
        
        // Get the touch coordinates relative to the page
        // This accounts for zoom and scroll position
        const touchX = touch.pageX;
        const touchY = touch.pageY;
        
        // Convert page coordinates to viewport coordinates
        const viewportX = touchX - window.scrollX;
        const viewportY = touchY - window.scrollY;
        
        this.handleInteraction(viewportX, viewportY, "tap");
      }, { passive: false }); // passive: false is needed to use preventDefault
    }
  }

  private handleInteraction(x: number, y: number, type: string) {
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
    }
    
    // Set timeout to reset streak counter after 500ms of inactivity
    this.clickTimer = window.setTimeout(() => {
      this.streakCount = 0;
      this.clickTimer = null;
    }, 500);
    
    const text = document.createElement('div');
    text.textContent = type;
    text.className = 'click-text';
    
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
          this.shadowRoot?.removeChild(line);
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
      x: x,
      y: y
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
      } else {
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
    } else if (streakValue >= 10) {
      duration = 900; // Slightly longer for uncommon
    }
    
    // Remove after animation completes
    setTimeout(() => {
      if (streakElement.parentNode === this.shadowRoot) {
        this.shadowRoot?.removeChild(streakElement);
      }
    }, duration);
  }
  
  private triggerSpecialEffect(x: number, y: number, streakValue: number) {
    // Create container for the special effect
    const effectContainer = document.createElement('div');
    effectContainer.className = 'special-effect-container';
    effectContainer.style.left = `${x}px`;
    effectContainer.style.top = `${y}px`;
    
    // Different effects based on threshold
    if (streakValue >= 100) {
      // Level 4 effect (100+) - ULTRA EPIC explosion with multiple effects
      effectContainer.classList.add('level-4');
      
      // Create multiple shockwaves
      this.createShockwave(effectContainer, 1.0);
      setTimeout(() => this.createShockwave(effectContainer, 1.2), 200);
      setTimeout(() => this.createShockwave(effectContainer, 1.5), 400);
      
      // Create fire ring effect
      this.createFireRing(effectContainer);
      
      // Create laser beams
      this.createLaserBeams(effectContainer);
      
      // Create massive particle explosion
      this.createParticleExplosion(effectContainer, 150, 'legendary-particle');
      
      // Create floating fire particles
      setTimeout(() => {
        this.createParticleExplosion(effectContainer, 60, 'fire-particle');
      }, 300);
      
      // Intense screen effects
      this.flashScreen();
      this.shakeScreen(800, 15); // Longer, more intense shake
      
      // Play epic sound effects
      this.playSoundEffect('legendary');
      
    } else if (streakValue >= 50) {
      // Level 3 effect (50+) - Large explosion with many particles and screen shake
      effectContainer.classList.add('level-3');
      this.createShockwave(effectContainer);
      this.createParticleExplosion(effectContainer, 60, 'epic-particle');
      this.shakeScreen(300, 8);
      
      // Play epic sound effect
      this.playSoundEffect('epic');
      
    } else if (streakValue >= 20) {
      // Level 2 effect (20+) - Medium explosion with particles
      effectContainer.classList.add('level-2');
      this.createParticleExplosion(effectContainer, 30, 'rare-particle');
      this.shakeScreen(200, 4);
      
      // Play rare sound effect
      this.playSoundEffect('rare');
      
    } else if (streakValue >= 10) {
      // Level 1 effect (10+) - Small explosion
      effectContainer.classList.add('level-1'); 
      this.createParticleExplosion(effectContainer, 15, 'uncommon-particle');
      
      // Play uncommon sound effect
      this.playSoundEffect('uncommon');
    }
    
    // Add the container to the shadow DOM
    this.shadowRoot?.appendChild(effectContainer);
    
    // Determine effect duration based on streak value
    let effectDuration = 2000;
    if (streakValue >= 100) {
      effectDuration = 3000; // Longer for legendary effects
    }
    
    // Remove after animation completes
    setTimeout(() => {
      if (effectContainer.parentNode === this.shadowRoot) {
        this.shadowRoot?.removeChild(effectContainer);
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
    // Create multiple laser beams at different angles
    const angles = [0, 45, 90, 135, 180, 225, 270, 315];
    
    angles.forEach(angle => {
      const laser = document.createElement('div');
      laser.className = 'laser-beam';
      laser.style.setProperty('--angle', `${angle}deg`);
      
      // Add random delay
      const delay = Math.random() * 0.3;
      laser.style.setProperty('--delay', `${delay}s`);
      
      container.appendChild(laser);
    });
  }
  
  private shakeScreen(duration: number, intensity: number) {
    const mainContainer = document.querySelector('main-component')?.shadowRoot?.querySelector('.main-container');
    if (!mainContainer) return;
    
    let startTime = performance.now();
    const originalTransform = (mainContainer as HTMLElement).style.transform || '';
    
    const animate = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      
      if (elapsed < duration) {
        // Calculate decreasing intensity
        const progress = elapsed / duration;
        const currentIntensity = intensity * (1 - progress);
        
        // Random offset within intensity range
        const offsetX = (Math.random() - 0.5) * 2 * currentIntensity;
        const offsetY = (Math.random() - 0.5) * 2 * currentIntensity;
        
        // Apply transform
        (mainContainer as HTMLElement).style.transform = `translate(${offsetX}px, ${offsetY}px) ${originalTransform}`;
        
        requestAnimationFrame(animate);
      } else {
        // Reset to original position
        (mainContainer as HTMLElement).style.transform = originalTransform;
      }
    };
    
    requestAnimationFrame(animate);
  }
  
  private flashScreen() {
    const flash = document.createElement('div');
    flash.className = 'screen-flash';
    document.body.appendChild(flash);
    
    // Create another delayed flash for effect
    setTimeout(() => {
      const secondFlash = document.createElement('div');
      secondFlash.className = 'screen-flash red-flash';
      document.body.appendChild(secondFlash);
      
      // Remove after animation completes
      setTimeout(() => {
        document.body.removeChild(secondFlash);
      }, 500);
    }, 200);
    
    // Remove after animation completes
    setTimeout(() => {
      document.body.removeChild(flash);
    }, 500);
  }
  
  private playSoundEffect(type: string) {
    // This would be implemented with actual audio files
    // For now, we'll just console log the sound effect type
    console.log(`Playing ${type} sound effect`);
  }

  render() {
    return html`
      <div class="click-text-container"></div>
    `;
  }
} 