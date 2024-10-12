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
        <div class = 'name-text'>
          <h1>IAN<br>MAT<br>SON.</h1>
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
