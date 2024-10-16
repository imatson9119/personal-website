import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { MainStyles } from '../../styles.js';
import { ComponentStyles } from './splash-screen.styles.js';


@customElement('splash-screen')
export class SplashScreenComponent extends LitElement {
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

  
  _emitScrollEvent(id: string) {
    const scrollEvent = new CustomEvent('scrollTo', {
      detail: id,
      bubbles: false,
      composed: true
    });
    this.dispatchEvent(scrollEvent);
  }

  render() {
    return html`
      <div class='main-container'>
        <div class='header'>
          <a href='#about' @click=${() => this._emitScrollEvent('about')}>about</a>
          <a href='#contact' @click=${() => this._emitScrollEvent('contacts')}>contact</a>
          <a href='#projects' @click=${() => this._emitScrollEvent('portfolio')}>portfolio</a>
        </div>
        <div class='main-body'>
          <div class='name-text'>
            <h1>IAN<br>MAT<br>SON<div class="accent"></div></h1>
          </div>
          <div class='portrait'></div>
        </div>
        <div class='footer'>
          <img @click=${() => this._emitScrollEvent('about')} src='assets/keyboard_arrow_down.svg' alt='scroll down'>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'splash-screen': SplashScreenComponent;
  }
}
