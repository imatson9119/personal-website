import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { ComponentStyles } from './main-component.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('main-component')
export class MainA extends LitElement {
  @property({ type: String }) header = 'My app';

  @query('.main-container') mainContainer!: HTMLElement;

  static styles = [MainStyles, ComponentStyles];

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.backgroundAnimation();
    })
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
        <app-cursor-trail></app-cursor-trail>
        <app-navbar></app-navbar>
        <div class="spacer"></div>
        <app-splash-screen></app-splash-screen>
        <app-about></app-about>
        <app-portfolio></app-portfolio>
        <app-footer></app-footer>
      </div>
    `;
  }
}
