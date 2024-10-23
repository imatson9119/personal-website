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
          <p>I will put some more text here eventually but for the time being this is just filler to give a good idea of what the page will look like when there’s more content.</p>
        </div>
        <div class="image">
          <img src="assets/portrait-min.png" alt="Self-portrait">
        </div>
      </div>
      <div class='wave-container'>
        <svg class='wave three' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE" fill-opacity=".1" d="M0,256L48,250.7C96,245,192,235,288,202.7C384,171,480,117,576,106.7C672,96,768,128,864,122.7C960,117,1056,75,1152,53.3C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        <svg class='wave two' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE" fill-opacity=".1" d="M0,256L48,250.7C96,245,192,235,288,202.7C384,171,480,117,576,106.7C672,96,768,128,864,122.7C960,117,1056,75,1152,53.3C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        <svg class='wave one' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE" fill-opacity="1" d="M0,256L48,250.7C96,245,192,235,288,202.7C384,171,480,117,576,106.7C672,96,768,128,864,122.7C960,117,1056,75,1152,53.3C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
        <div class='rectangle one'></div>
        <div class='rectangle two'></div>
      </div>
    `;
  }
}
