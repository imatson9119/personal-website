import { html, LitElement } from 'lit';
import { customElement, query } from 'lit/decorators.js';
import anime, { AnimeInstance } from 'animejs/lib/anime.js';
import { MainStyles } from '../../styles.js';
import { ComponentStyles } from './splash-screen.styles.js';

@customElement('splash-screen')
export class SplashScreenComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  bannerText = 'Ian Matson • ';

  @query('.banner') banner!: HTMLDivElement;

  bannerAnimation: null | AnimeInstance = null;

  resizeTimeout: number | null = null;

  @query('.primary-photo') primaryPhoto!: HTMLDivElement;

  connectedCallback() {
    super.connectedCallback(); // eslint-disable-line

    this.animateBannerText();
    this.animatePrimaryPhoto();
  }

  animateBannerText() {
    this.updateComplete.then(() => {
      this.initializeBannerAnimation();

      window.onresize = () => {
        if (this.resizeTimeout) {
          clearTimeout(this.resizeTimeout);
        }
        this.resizeTimeout = window.setTimeout(() => {
          console.log('resize');
          this.initializeBannerAnimation();
        }, 100);
      };
    });
  }

  initializeBannerAnimation() {
    this.banner.innerText = this.bannerText;
    const initialWidth = this.banner.offsetWidth;
    while (this.banner.offsetWidth < window.innerWidth + initialWidth) {
      this.banner.innerText += this.bannerText;
    }
    if (this.bannerAnimation) {
      anime.remove(this.banner);
    }
    this.bannerAnimation = anime({
      targets: this.banner,
      translateX: [0, -initialWidth],
      duration: 7 * initialWidth,
      easing: 'linear',
      loop: true,
    });
  }

  animatePrimaryPhoto() {
    // Animates the background image to move in the reversed direction of the the user's cursor
    this.updateComplete.then(() => {
      window.addEventListener('mousemove', event => {
        const x = (event.clientX / window.innerWidth) * 2 - 1;
        const y = (event.clientY / window.innerHeight) * 2 - 1;
        console.log(x, y);

        anime.set(this.primaryPhoto, { scale: 1.04 });
        anime({
          targets: this.primaryPhoto,
          translateX: `${-x * 2}%`,
          translateY: `${-y * 2}%`,
          duration: 500,
          easing: 'easeOutQuad',
        });
      });
    });
  }

  render() {
    return html`
      <div class="main-container">
        <div class="banner">${this.bannerText}</div>
        <div class="primary-photo-container">
          <img
            class="primary-photo"
            src="/assets/main-portrait.png"
            alt="Ian Matson"
          />
          <div class="noise"></div>
        </div>
      </div>
    `;
  }
}

declare global {
  interface HTMLElementTagNameMap {
    'splash-screen': SplashScreenComponent;
  }
}
