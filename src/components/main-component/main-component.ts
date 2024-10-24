import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { ComponentStyles } from './main-component.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('main-component')
export class MainA extends LitElement {
  @property({ type: String }) header = 'My app';

  @query('.main-container') mainContainer!: HTMLElement;

  static styles = [MainStyles, ComponentStyles];

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.backgroundAnimation();
    })
  }

  backgroundAnimation() {
    let mousePos = [0, 0];
    let backgroundPos = [0, 0];

    window.addEventListener('mousemove', (event) => {
      mousePos = [event.clientX, event.clientY];
    });

    const updateBackground = () => {
      const x = mousePos[0] / window.innerWidth;
      const y = mousePos[1] / window.innerHeight;

      // lerp background position
      backgroundPos[0] += (x - backgroundPos[0]) * 0.03;
      backgroundPos[1] += (y - backgroundPos[1]) * 0.03;
      this.mainContainer.style.backgroundPosition = `${-backgroundPos[0] * 50}px ${-backgroundPos[1] * 50}px`;

      requestAnimationFrame(updateBackground);
    }
    updateBackground();
  }

  scrollToId(id: string) {
    const element = this.shadowRoot?.querySelector(`#${id}`);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  }

  
  render() {
    return html`
      <div class='main-container'>
        <app-cursor-trail></app-cursor-trail>
        <app-navbar @navigate=${(event:CustomEvent)=>this.scrollToId(event.detail)}></app-navbar>
        <div class='inner-container'>
          <app-splash-screen></app-splash-screen>
        </div>
        <div class='wave-container'>
          <div class='wave bottom' style="--offset:100px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE" fill-opacity=".1" d="M0,256L48,250.7C96,245,192,235,288,202.7C384,171,480,117,576,106.7C672,96,768,128,864,122.7C960,117,1056,75,1152,53.3C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          </div>
          <div class='wave bottom' style="--offset:80px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE" fill-opacity=".1" d="M0,256L48,250.7C96,245,192,235,288,202.7C384,171,480,117,576,106.7C672,96,768,128,864,122.7C960,117,1056,75,1152,53.3C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          </div>
          <div class='wave bottom' style="--offset:0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE" fill-opacity="1" d="M0,256L48,250.7C96,245,192,235,288,202.7C384,171,480,117,576,106.7C672,96,768,128,864,122.7C960,117,1056,75,1152,53.3C1248,32,1344,32,1392,32L1440,32L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          </div>
        </div>
        <div class='light-bg'>
          <div class='inner-container'>
            <app-about id='about'></app-about>
          </div>
        </div>
        <div class='wave-container'>
          <div class='wave top' style="--offset:0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE" fill-opacity="1" d="M0,128L48,154.7C96,181,192,235,288,229.3C384,224,480,160,576,160C672,160,768,224,864,218.7C960,213,1056,139,1152,96C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
          </div>
          <div class='wave top' style="--offset:0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE1A" fill-opacity="1" d="M0,224L48,208C96,192,192,160,288,170.7C384,181,480,235,576,240C672,245,768,203,864,181.3C960,160,1056,160,1152,138.7C1248,117,1344,75,1392,53.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
          </div>
          <div class='wave top' style="--offset:0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE1A" fill-opacity="1" d="M0,128L48,154.7C96,181,192,235,288,213.3C384,192,480,96,576,80C672,64,768,128,864,181.3C960,235,1056,277,1152,272C1248,267,1344,213,1392,186.7L1440,160L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"></path></svg>
          </div>
        </div>
        <div class='inner-container'>
          <app-portfolio id='portfolio'></app-portfolio>
        </div>
        <div class='wave-container'>
          <div class='wave bottom' style="--offset:100px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE1A" fill-opacity="1" d="M0,32L48,58.7C96,85,192,139,288,144C384,149,480,107,576,106.7C672,107,768,149,864,144C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          </div>
          <div class='wave bottom' style="--offset:80px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE1A" fill-opacity="1" d="M0,32L48,58.7C96,85,192,139,288,144C384,149,480,107,576,106.7C672,107,768,149,864,144C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          </div>
          <div class='wave bottom' style="--offset:0px;">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320"><path fill="#EAF0CE" fill-opacity="1" d="M0,32L48,58.7C96,85,192,139,288,144C384,149,480,107,576,106.7C672,107,768,149,864,144C960,139,1056,85,1152,74.7C1248,64,1344,96,1392,112L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"></path></svg>
          </div>
        </div>
        <div class='light-bg'>
          <div class='inner-container'>
            <app-footer id='contact'></app-footer>
          </div>
        </div> 
      </div>
    `;
  }
}
