import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentStyles } from './app-click-text.styles.js';
import { MainStyles, isMobileDevice } from '../../styles.js';

@customElement('app-click-text')
export class ClickTextComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

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
        this.handleInteraction(touch.clientX, touch.clientY, "tap");
      });
    }
  }

  private handleInteraction(x: number, y: number, type: string) {
    const text = document.createElement('div');
    text.textContent = type;
    text.className = 'click-text';
    
    // Create three emphasis lines with staggered angles and delays
    const baseAngles = [0, 120, 240];
    baseAngles.forEach((baseAngle, index) => {
      const line = document.createElement('div');
      line.className = 'emphasis-line';
      
      // Add more random variation to each angle (±30 degrees)
      const randomVariation = (Math.random() - 0.5) * 60;
      const finalAngle = baseAngle + randomVariation;
      
      // Position line at click point
      line.style.left = `${x}px`;
      line.style.top = `${y}px`;
      line.style.setProperty('--rotation', `${finalAngle}deg`);
      
      // Stagger the appearance
      setTimeout(() => {
        this.shadowRoot?.appendChild(line);
        
        // Remove line after animation completes
        setTimeout(() => {
          this.shadowRoot?.removeChild(line);
        }, 600);
      }, index * 50);
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
      const rotation = Math.atan2(velocity.y, velocity.x) * (180 / Math.PI);
      
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

  render() {
    return html`
      <div class="click-text-container"></div>
    `;
  }
} 