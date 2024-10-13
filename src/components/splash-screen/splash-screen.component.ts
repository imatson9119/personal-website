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

  }
  

  render() {
    return html`
      <div class='main-container'>
        <div class='header'>
          <a href='#about'>about</a>
          <a href='#contact'>contact</a>
          <a href='#projects'>portfolio</a>
        </div>
        <div class='main-body'>
          <div class='name-text'>
            <h1>IAN<br>MAT<br>SON<span class='accent'>.</span></h1>
          </div>
          <div class='portrait'></div>
        </div>
        <div class='footer'>
          <img src='assets/keyboard_arrow_down.svg' alt='scroll down'>
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
