import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentStyles } from './app-navbar.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('app-navbar')
export class NavbarComponent extends LitElement {

  static styles = [MainStyles, ComponentStyles];

  constructor() {
    super();

    this.updateComplete.then(() => {
    })
  }

  render() {
    return html`
      <div class="navbar">
        <div class="links">
          <button @mousemove=${this.buttonHoverAnimation} @click=${()=>this.navigate('about')}>about</button>
          <button @mousemove=${this.buttonHoverAnimation} @click=${()=>this.navigate('portfolio')}>portfolio</button>
          <button @mousemove=${this.buttonHoverAnimation} @click=${()=>this.navigate('contact')}>contact</button>
        </div>
      </div>
    `;
  }

  navigate(id: string) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: id, bubbles: true, composed: true }));
  }

  buttonHoverAnimation(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;
    
    // Calculate distance between cursor and button center
    const deltaX = event.clientX - buttonCenterX;
    const deltaY = event.clientY - buttonCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    // Maximum pull distance and strength
    const maxPull = 40;
    const pullStrength = Math.min(maxPull, distance) / distance;
    
    // Calculate pull effect
    const moveX = deltaX * pullStrength * 0.2;
    const moveY = deltaY * pullStrength * 0.2;

    // Apply transform
    button.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Reset on mouse leave
    button.onmouseleave = () => {
      button.style.transform = 'translate(0, 0)';
    };
  }
}
