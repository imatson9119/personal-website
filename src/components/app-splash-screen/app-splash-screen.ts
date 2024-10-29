import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentStyles } from './app-splash-screen.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('app-splash-screen')
export class SplashScreenComponent extends LitElement {

  static styles = [MainStyles, ComponentStyles];

  constructor() {
    super();

    this.updateComplete.then(() => {
    })
  }

  render() {
    return html`
      <div class="splash-screen">
        <div class="text">
          <div class='title'>
            <h1>👋 Howdy</h1>
          </div>
          <br>
          <p>I'm <span class='accent'>Ian Matson</span>.</p>
          <p>
            If you're looking for a <span class='accent'>software developer</span> who loves to create, you're in the right place.
            Let's <span class='accent'>build something amazing</span> together!
          </p>
        </div>
        <div class="image">
          <img src="assets/portrait-min.png" alt="Self-portrait">
        </div>
      </div>
    `;
  }
}
