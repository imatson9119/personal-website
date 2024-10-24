import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentStyles } from './app-portfolio.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('app-portfolio')
export class PortfolioComponent extends LitElement {

  static styles = [MainStyles, ComponentStyles];

  constructor() {
    super();

    this.updateComplete.then(() => {
    })
  }

  render() {
    return html`
      <div class="about-screen">
        <div class="text">
          <div class='title'>
            <h1>👨‍💻 Projects</h1>
          </div>
          <br>
          <p>
            Few things excite me more than <span class='accent'>building new things</span>. Below are some of my recent projects - check them out!
          </p>
        </div>
      </div>
      <app-project></app-project>
      <div class='wave-container bottom'>
        <div class='rectangle bottom one'></div>
        <div class='rectangle bottom two'></div>
      </div>
    `;
  }
}
