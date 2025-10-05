import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { ComponentStyles } from './app-splash-screen.styles.js';
import { MainStyles, isMobileDevice } from '../../styles.js';
import { getAssetPath } from '../../utils.js';

@customElement('app-splash-screen')
export class SplashScreenComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  @query('.splash-screen') mainContainer!: HTMLElement;

  @query('.image') imageContainer!: HTMLElement;

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.backgroundAnimation();
    });
  }

  backgroundAnimation() {
    if (isMobileDevice()) return; // Skip animation on mobile

    let mousePos = [0, 0];
    const backgroundPos = [0, 0];
    const mainContainerMovementFactor = 0.05;
    const imageContainerMovementFactor = 0.03;
    const mainContainerVertMoveDist =
      window.innerHeight * mainContainerMovementFactor;
    const imageContainerVertMoveDist =
      window.innerHeight * imageContainerMovementFactor;
    const mainContainerHorizMoveDist =
      window.innerWidth * mainContainerMovementFactor;
    const imageContainerHorizMoveDist =
      window.innerWidth * imageContainerMovementFactor;

    window.addEventListener('mousemove', event => {
      mousePos = [event.clientX, event.clientY];
    });

    const updateBackground = () => {
      const x = (mousePos[0] - window.innerWidth / 2) / window.innerWidth;
      const y = (mousePos[1] - window.innerHeight / 2) / window.innerHeight;

      // lerp background position
      backgroundPos[0] += (x - backgroundPos[0]) * 0.03;
      backgroundPos[1] += (y - backgroundPos[1]) * 0.03;
      this.mainContainer.style.translate = `${-backgroundPos[0] * mainContainerHorizMoveDist}px ${-backgroundPos[1] * mainContainerVertMoveDist}px`;
      this.imageContainer.style.translate = `${-backgroundPos[0] * imageContainerHorizMoveDist}px ${-backgroundPos[1] * imageContainerVertMoveDist}px`;

      requestAnimationFrame(updateBackground);
    };
    updateBackground();
  }

  render() {
    return html`
      <div class="splash-screen">
        <div class="text">
          <div class="title">
            <h1>👋 Howdy</h1>
          </div>
          <br />
          <p>I'm <span class="accent">Ian Matson</span>.</p>
          <p>
            If you're looking for a
            <span class="accent">software developer</span> who loves to create,
            you're in the right place. Let's
            <span class="accent">build something amazing</span> together!
          </p>
        </div>
        <div class="image">
          <img
            src="${getAssetPath('assets/portrait-min.png')}"
            alt="Self-portrait"
          />
        </div>
      </div>
    `;
  }
}
