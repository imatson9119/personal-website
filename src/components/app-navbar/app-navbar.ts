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
        <h1 class="logo">IM<span class='accent'>.</span></h1>
        <div class="links">
          <a href="#about">about</a>
          <a href="#portfolio">portfolio</a>
          <a href="#contact">contact</a>
        </div>
      </div>
    `;
  }
}
