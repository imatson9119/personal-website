import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentStyles } from './app-footer.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('app-footer')
export class FooterComponent extends LitElement {

  static styles = [MainStyles, ComponentStyles];

  constructor() {
    super();

    this.updateComplete.then(() => {
    })
  }

  render() {
    return html`
      <div class="footer-container">
        <div class="footer-body">
          <div class='left'>
            <div class='title'>
              <h1>Let's get in touch.</h1>
            </div>
          </div>
          <div class="right">
            <span>howdy@ian-matson.com</span>
            <span>linkedin.com/in/ianmatson</span>
            <span>+1(832)-364-3437</span>
          </div>
        </div>
        <span class="footer-text">© 2024 Ian Matson. All rights reserved.</span>
      </div>
    `;
  }
}
