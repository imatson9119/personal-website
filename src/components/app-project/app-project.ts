import { LitElement, html } from 'lit';
import { customElement, queryAll } from 'lit/decorators.js';
import { ComponentStyles } from './app-project.styles.js';
import { MainStyles } from '../../styles.js';
import { getAssetPath } from '../../utils.js';

const MOBILE_BREAKPOINT = 1024;

interface Project {
  title: string;
  description: string;
  date: string;
  image: string;
  link?: string;
  github?: string;
}

@customElement('app-project')
export class ProjectComponent extends LitElement {
  static styles = [MainStyles, ComponentStyles];

  projects: Project[] = [
    {
      title: 'Cosmonaut',
      description:
        'An AI-powered interactive fiction platform where branching narratives are generated via a multi-agent LLM architecture with real-time streaming text generation. Utilizes lineage-aware RAG using Pinecone vector search to maintain narrative consistency across branching story paths.',
      date: 'Jan 2026',
      link: 'https://cosmonaut-ai.com/',
      image: 'assets/projects/img4.webp',
    },
    {
      title: 'The Brain',
      description:
        'A full-stack, AI powered apartment search assistant with user authentication, real-time data updates, and AI-powered search capabilities.',
      date: 'Oct 2025',
      link: 'https://theapartmentbrain.com/',
      image: 'assets/projects/img3.webp',
    },
    {
      title: 'Olive & Salt',
      description:
        'Landing website for a personal chef / meal prep business, simple frontend with minor backend integrations supporting contact flows.',
      date: 'Oct 2025',
      link: 'https://www.olive-and-salt.com',
      github: 'https://github.com/imatson9119/OliveAndSalt',
      image: 'assets/projects/img2.webp',
    },
    {
      title: 'Pericopy',
      description:
        'A web application for diff-driven Bible memorization supporting 9+ translations. Designed with the memorization of larger passages in mind, Pericopy features automatic passage detection, heatmap mistake visualization, and speech-to-text functionality.',
      date: 'Sept 2024',
      link: 'https://www.pericopy.net',
      github: 'https://github.com/imatson9119/Pericopy',
      image: 'assets/projects/img0.webp',
    },
    {
      title: 'Dinner Club',
      description:
        'An interactive puzzle-based website to prevent my friends from RSVPing to a fancy dinner I hosted. The site features a series of custom-built puzzles that users must solve to RSVP.',
      date: 'Sept 2024',
      link: 'https://dinner-club.org/',
      github: 'https://github.com/imatson9119/dinner-club',
      image: 'assets/projects/img1.webp',
    },
  ];

  private activeSceneIndex = -1;

  @queryAll('.scene') private scenes!: NodeListOf<HTMLElement>;

  private outerWrapper!: HTMLElement;
  private horizontalTrack!: HTMLElement;
  private stickyViewport!: HTMLElement;
  private scrollProgress = 0;
  private mousePos = [0, 0];
  private lerpedMouse = [0, 0];
  private animFrameId = 0;
  private scrollHandler?: () => void;
  private keydownHandler?: (e: KeyboardEvent) => void;
  private mousemoveHandler?: (e: MouseEvent) => void;
  private resizeHandler?: () => void;
  private mobileObserver?: IntersectionObserver;
  private currentMode: 'desktop' | 'mobile' | null = null;

  connectedCallback() {
    super.connectedCallback();

    this.updateComplete.then(() => {
      this.outerWrapper = this.shadowRoot!.querySelector(
        '.outer-wrapper',
      ) as HTMLElement;
      this.horizontalTrack = this.shadowRoot!.querySelector(
        '.horizontal-track',
      ) as HTMLElement;
      this.stickyViewport = this.shadowRoot!.querySelector(
        '.sticky-viewport',
      ) as HTMLElement;

      this.applyLayout();

      this.resizeHandler = () => this.onResize();
      window.addEventListener('resize', this.resizeHandler);
    });
  }

  disconnectedCallback() {
    super.disconnectedCallback();
    this.teardownDesktop();
    this.teardownMobile();
    if (this.resizeHandler)
      window.removeEventListener('resize', this.resizeHandler);
  }

  private onResize() {
    const shouldBeMobile = this.isMobileLayout();
    const modeNeeded = shouldBeMobile ? 'mobile' : 'desktop';

    if (modeNeeded !== this.currentMode) {
      this.applyLayout();
    } else if (this.currentMode === 'desktop') {
      this.setOuterHeight();
    }
  }

  private applyLayout() {
    this.teardownDesktop();
    this.teardownMobile();

    if (this.isMobileLayout()) {
      this.currentMode = 'mobile';
      this.initMobile();
    } else {
      this.currentMode = 'desktop';
      this.initDesktop();
    }
  }

  private teardownDesktop() {
    if (this.scrollHandler) {
      window.removeEventListener('scroll', this.scrollHandler);
      this.scrollHandler = undefined;
    }
    if (this.keydownHandler) {
      window.removeEventListener('keydown', this.keydownHandler);
      this.keydownHandler = undefined;
    }
    if (this.mousemoveHandler) {
      window.removeEventListener('mousemove', this.mousemoveHandler);
      this.mousemoveHandler = undefined;
    }
    if (this.animFrameId) {
      cancelAnimationFrame(this.animFrameId);
      this.animFrameId = 0;
    }

    if (this.outerWrapper) this.outerWrapper.style.height = '';
    if (this.horizontalTrack) this.horizontalTrack.style.transform = '';
    if (this.stickyViewport) this.stickyViewport.style.backgroundPosition = '';
    this.clearInlineTransforms();
  }

  private teardownMobile() {
    if (this.mobileObserver) {
      this.mobileObserver.disconnect();
      this.mobileObserver = undefined;
    }
  }

  private clearInlineTransforms() {
    if (!this.scenes) return;
    this.scenes.forEach(scene => {
      scene.classList.remove('active');
      const bgNumber = scene.querySelector('.bg-number') as HTMLElement;
      const image = scene.querySelector('.scene-image') as HTMLElement;
      const content = scene.querySelector('.scene-content') as HTMLElement;
      if (bgNumber) bgNumber.style.transform = '';
      if (image) image.style.transform = '';
      if (content) content.style.transform = '';
    });
    this.activeSceneIndex = -1;
  }

  private isMobileLayout(): boolean {
    return window.innerWidth <= MOBILE_BREAKPOINT;
  }

  /* ========== DESKTOP INITIALIZATION ========== */

  private initDesktop() {
    this.setOuterHeight();

    this.scrollHandler = () => this.onScroll();
    window.addEventListener('scroll', this.scrollHandler, { passive: true });

    this.keydownHandler = (e: KeyboardEvent) => this.onKeydown(e);
    window.addEventListener('keydown', this.keydownHandler);

    this.mousemoveHandler = (e: MouseEvent) => {
      this.mousePos = [e.clientX, e.clientY];
    };
    window.addEventListener('mousemove', this.mousemoveHandler);

    this.onScroll();
    this.startParallaxLoop();
  }

  private setOuterHeight() {
    if (!this.outerWrapper || this.isMobileLayout()) return;
    this.outerWrapper.style.height = `${this.projects.length * 100}vh`;
  }

  /* ========== SCROLL HANDLING ========== */

  private onScroll() {
    if (!this.outerWrapper || this.isMobileLayout()) return;

    const rect = this.outerWrapper.getBoundingClientRect();
    const totalScrollDistance = rect.height - window.innerHeight;

    if (totalScrollDistance <= 0) return;

    if (rect.top > 0) {
      this.scrollProgress = 0;
    } else if (-rect.top >= totalScrollDistance) {
      this.scrollProgress = 1;
    } else {
      this.scrollProgress = -rect.top / totalScrollDistance;
    }

    this.applyHorizontalTransform();
    this.updateActiveScene();
    this.updateProgressBar();
  }

  private applyHorizontalTransform() {
    if (!this.horizontalTrack || this.isMobileLayout()) return;
    const n = this.projects.length;
    const translateX = this.scrollProgress * (n - 1) * window.innerWidth;
    this.horizontalTrack.style.transform = `translateX(-${translateX}px)`;
  }

  private updateActiveScene() {
    const n = this.projects.length;
    const newActiveIndex = Math.round(this.scrollProgress * (n - 1));
    const clamped = Math.max(0, Math.min(n - 1, newActiveIndex));

    if (clamped !== this.activeSceneIndex) {
      if (this.scenes) {
        this.scenes.forEach((scene, i) => {
          scene.classList.toggle('active', i === clamped);
        });
      }
      this.activeSceneIndex = clamped;
      this.updateSceneCounter();
    }
  }

  private updateSceneCounter() {
    const counter = this.shadowRoot?.querySelector(
      '.scene-counter',
    ) as HTMLElement;
    if (counter) {
      const n = this.projects.length;
      counter.textContent = `${String(this.activeSceneIndex + 1).padStart(2, '0')} / ${String(n).padStart(2, '0')}`;
    }
  }

  /* ========== PROGRESS BAR ========== */

  private updateProgressBar() {
    if (this.isMobileLayout()) return;

    const n = this.projects.length;
    const segments = this.shadowRoot!.querySelectorAll('.progress-segment');
    const dots = this.shadowRoot!.querySelectorAll('.dot');

    segments.forEach((seg, i) => {
      const segEl = seg as HTMLElement;
      const fillEl = segEl.querySelector('.fill') as HTMLElement;
      if (!fillEl) return;

      const segStart = i / (n - 1);
      const segEnd = (i + 1) / (n - 1);
      const segProgress =
        (this.scrollProgress - segStart) / (segEnd - segStart);
      const clampedSegProgress = Math.max(0, Math.min(1, segProgress));

      fillEl.style.width = `${clampedSegProgress * 100}%`;

      segEl.classList.toggle('filled', clampedSegProgress >= 1);
      segEl.classList.toggle(
        'filling',
        clampedSegProgress > 0 && clampedSegProgress < 1,
      );
    });

    dots.forEach((dot, i) => {
      dot.classList.toggle('active', i === this.activeSceneIndex);
    });
  }

  /* ========== PARALLAX LOOP ========== */

  private startParallaxLoop() {
    const update = () => {
      this.lerpedMouse[0] +=
        (this.mousePos[0] - this.lerpedMouse[0]) * 0.03;
      this.lerpedMouse[1] +=
        (this.mousePos[1] - this.lerpedMouse[1]) * 0.03;

      this.syncBackgroundPosition();
      this.applySceneParallax();
      this.animFrameId = requestAnimationFrame(update);
    };
    this.animFrameId = requestAnimationFrame(update);
  }

  private syncBackgroundPosition() {
    if (!this.stickyViewport) return;
    const bx = this.lerpedMouse[0] / window.innerWidth;
    const by = this.lerpedMouse[1] / window.innerHeight;
    const borderOffset = 3;
    this.stickyViewport.style.backgroundPosition =
      `${-bx * 50 + borderOffset}px ${-by * 50 + borderOffset}px`;
  }

  private applySceneParallax() {
    if (!this.scenes || this.isMobileLayout()) return;

    const n = this.projects.length;
    const mx =
      (this.lerpedMouse[0] - window.innerWidth / 2) / window.innerWidth;
    const my =
      (this.lerpedMouse[1] - window.innerHeight / 2) / window.innerHeight;

    this.scenes.forEach((scene, i) => {
      const sceneDelta = this.scrollProgress * (n - 1) - i;

      const bgNumber = scene.querySelector('.bg-number') as HTMLElement;
      const image = scene.querySelector('.scene-image') as HTMLElement;
      const content = scene.querySelector('.scene-content') as HTMLElement;

      if (bgNumber) {
        const px = sceneDelta * -60 + mx * -15;
        const py = my * -10;
        bgNumber.style.transform = `translate(calc(-50% + ${px}px), calc(-50% + ${py}px))`;
      }
      if (image) {
        const px = sceneDelta * -30 + mx * -25;
        const py = my * -15;
        if (scene.classList.contains('active')) {
          image.style.transform = `translate(${px}px, ${py}px) scale(1)`;
        } else {
          image.style.transform = `translate(${px}px, ${py}px)`;
        }
      }
      if (content) {
        const px = sceneDelta * 20 + mx * -18;
        const py = my * -10;
        content.style.transform = `translate(${px}px, ${py}px)`;
      }
    });
  }

  /* ========== KEYBOARD NAVIGATION ========== */

  private onKeydown(e: KeyboardEvent) {
    if (!this.outerWrapper) return;

    const rect = this.outerWrapper.getBoundingClientRect();
    const isInScrollZone = rect.top <= 0 && rect.bottom >= window.innerHeight;
    if (!isInScrollZone) return;

    if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
      e.preventDefault();
      this.navigateToScene(this.activeSceneIndex + 1);
    } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
      e.preventDefault();
      this.navigateToScene(this.activeSceneIndex - 1);
    }
  }

  private navigateToScene(index: number) {
    const n = this.projects.length;
    const clamped = Math.max(0, Math.min(n - 1, index));
    if (!this.outerWrapper) return;

    const rect = this.outerWrapper.getBoundingClientRect();
    const totalScrollDistance = rect.height - window.innerHeight;
    const targetProgress = clamped / (n - 1);
    const targetScrollTop =
      window.scrollY + rect.top + targetProgress * totalScrollDistance;

    window.scrollTo({ top: targetScrollTop, behavior: 'smooth' });
  }

  private onDotClick(index: number) {
    this.navigateToScene(index);
  }

  /* ========== BUTTON HOVER ========== */

  private buttonHoverAnimation(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    const deltaX = event.clientX - buttonCenterX;
    const deltaY = event.clientY - buttonCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    const maxPull = 40;
    const pullStrength = Math.min(maxPull, distance) / distance;
    const moveX = deltaX * pullStrength * 0.2;
    const moveY = deltaY * pullStrength * 0.2;

    button.style.transform = `translate(${moveX}px, ${moveY}px)`;
    button.onmouseleave = () => {
      button.style.transform = 'translate(0, 0)';
    };
  }

  /* ========== MOBILE ========== */

  private initMobile() {
    this.mobileObserver = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          const scene = entry.target as HTMLElement;
          if (entry.isIntersecting) {
            scene.classList.add('active');
          } else {
            scene.classList.remove('active');
          }
        });
      },
      { threshold: 0.3 },
    );

    this.scenes.forEach(scene => {
      this.mobileObserver!.observe(scene);
    });
  }

  /* ========== RENDER ========== */

  render() {
    const n = this.projects.length;

    return html`
      <div class="outer-wrapper">
        <div class="sticky-viewport">
          <div class="horizontal-track">
            ${this.projects.map(
              (project, i) => html`
                <div class="scene">
                  <span class="bg-number"
                    >${String(i + 1).padStart(2, '0')}</span
                  >
                  <div class="scene-image">
                    <img
                      src="${getAssetPath(project.image)}"
                      alt="${project.title}"
                      loading="${i === 0 ? 'eager' : 'lazy'}"
                    />
                  </div>
                  <div class="scene-content">
                    <h2>${project.title}</h2>
                    <span class="date">${project.date}</span>
                    <p>${project.description}</p>
                    <div class="links">
                      ${project.link
                        ? html`<a
                            @mousemove=${this.buttonHoverAnimation}
                            class="link"
                            href="${project.link}"
                            target="_blank"
                            rel="noopener noreferrer"
                            >View Project</a
                          >`
                        : ''}
                      ${project.github
                        ? html`<a
                            @mousemove=${this.buttonHoverAnimation}
                            class="github"
                            href="${project.github}"
                            target="_blank"
                            rel="noopener noreferrer"
                            >View Code</a
                          >`
                        : ''}
                    </div>
                  </div>
                </div>
              `,
            )}
          </div>

          <div class="scene-counter"></div>

          <div class="progress">
            ${this.projects.map(
              (_, i) => html`
                <button
                  class="dot"
                  @click=${() => this.onDotClick(i)}
                  aria-label="Go to project ${i + 1}"
                ></button>
                ${i < n - 1
                  ? html`<div class="progress-segment">
                      <div class="fill"></div>
                    </div>`
                  : ''}
              `,
            )}
          </div>

          <span class="keyboard-hint">Arrow keys to navigate</span>
        </div>
      </div>
    `;
  }
}
