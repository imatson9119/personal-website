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
          <button @click=${()=>this.navigate('about')}>about</button>
          <button @click=${()=>this.navigate('portfolio')}>portfolio</button>
          <button @click=${()=>this.navigate('contact')}>contact</button>
        </div>
      </div>
    `;
  }



  navigate(id: string) {
    this.dispatchEvent(new CustomEvent('navigate', { detail: id, bubbles: true, composed: true }));
  }

}
