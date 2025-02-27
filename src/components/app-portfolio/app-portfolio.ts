import { LitElement, html } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import { ComponentStyles } from './app-portfolio.styles.js';
import { MainStyles, isMobileDevice } from '../../styles.js';

@customElement('app-portfolio')
export class PortfolioComponent extends LitElement {

  static styles = [MainStyles, ComponentStyles];

  @query('.about-screen') aboutScreen!: HTMLElement;

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.backgroundAnimation();
    })
  }

  backgroundAnimation() {
    if (isMobileDevice()) return;  // Skip animation on mobile

    let mousePos = [0, 0];
    let backgroundPos = [0, 0];
    const aboutContainerMovementFactor = .05;
    const aboutContainerVertMoveDist = window.innerHeight * aboutContainerMovementFactor;
    const aboutContainerHorizMoveDist = window.innerWidth * aboutContainerMovementFactor;
  
  
    window.addEventListener('mousemove', (event) => {
      mousePos = [event.clientX, event.clientY];
    });
  
    const updateBackground = () => {
      const x = (mousePos[0] - window.innerWidth / 2) / window.innerWidth;
      const y = (mousePos[1] - window.innerHeight / 2) / window.innerHeight;
  
      // lerp background position
      backgroundPos[0] += (x - backgroundPos[0]) * 0.03;
      backgroundPos[1] += (y - backgroundPos[1]) * 0.03;
      this.aboutScreen.style.translate = `${-backgroundPos[0] * aboutContainerHorizMoveDist}px ${-backgroundPos[1] * aboutContainerVertMoveDist}px`;
  
      requestAnimationFrame(updateBackground);
    }
    updateBackground();
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
