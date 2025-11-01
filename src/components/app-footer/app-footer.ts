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
            <a target="_blank" rel="noopener noreferrer" href="mailto:howdy@ian-matson.com">howdy@ian-matson.com</a>
            <a target="_blank" rel="noopener noreferrer" href='https://linkedin.com/in/ianmatson'>linkedin.com/in/ianmatson</a>
            <a target="_blank" rel="noopener noreferrer" href="tel:+14697512467">(469)-751-2467</a>
          </div>
        </div>
        <span class="footer-text">© 2024 Ian Matson. All rights reserved.</span>
      </div>
    `;
  }
}
