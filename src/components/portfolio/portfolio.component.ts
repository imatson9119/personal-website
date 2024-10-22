import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { MainStyles } from '../../styles.js';
import { ComponentStyles } from './portfolio.styles.js';
import * as THREE from 'three';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';

const imageFaceNames = ['Cube001_2', 'Cube001_3', 'Cube001_4'];

@customElement('app-portfolio')
export class PortfolioComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  @query('.main-container') mainContainer!: HTMLElement;

  constructor() {
    super();

    this.updateComplete.then(() => { 
      this.backgroundAnimation();
    });
  }

  backgroundAnimation() {
    let mousePos = [0, 0];
    let backgroundPos = [0, 0];

    window.addEventListener('mousemove', (event) => {
      mousePos = [event.clientX, event.clientY];
    });

    const updateBackground = () => {
      const x = mousePos[0] / window.innerWidth;
      const y = mousePos[1] / window.innerHeight;

      // lerp background position
      backgroundPos[0] += (x - backgroundPos[0]) * 0.03;
      backgroundPos[1] += (y - backgroundPos[1]) * 0.03;
      this.mainContainer.style.backgroundPosition = `${-backgroundPos[0] * 50}px ${-backgroundPos[1] * 50}px`;

      requestAnimationFrame(updateBackground);
    }
    updateBackground();
  }

  render() {
    return html`
      <div class='main-container'>
        <div class='header'>
          portfolio<span class='accent'>.</span>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'app-porfolio': PortfolioComponent;
  }
}
