import { LitElement, html } from 'lit';
import { customElement, query, state } from 'lit/decorators.js';
import { ComponentStyles } from './app-project.styles.js';
import { isMobileDevice, MainStyles } from '../../styles.js';
import { getAssetPath } from '../../utils.js';

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
      title: 'The Brain',
      description:
        'A full-stack,  AI powered apartment search assistant with user authentication, real-time data updates, and AI-powered search capabilities.',
      date: 'Oct 2025',
      link: 'https://theapartmentbrain.com/',
      image: 'assets/projects/img3.png',
    },
    {
      title: 'Olive & Salt',
      description:
        'Landing website for a personal chef / meal prep business, simple frontend with minor backend integrations supporting contact flows.',
      date: 'Oct 2025',
      link: 'https://www.olive-and-salt.com',
      github: 'https://github.com/imatson9119/OliveAndSalt',
      image: 'assets/projects/img2.png',
    },
    {
      title: 'Pericopy',
      description:
        'A web application for diff-driven Bible memorization supporting 9+ translations. Designed with the memorization of larger passages in mind, Pericopy features automatic passage detection, heatmap mistake visualization, and speech-to-text functionality.',
      date: 'Sept 2024',
      link: 'https://www.pericopy.net',
      github: 'https://github.com/imatson9119/Pericopy',
      image: 'assets/projects/img0.png',
    },
    {
      title: 'Dinner Club',
      description:
        'An interactive puzzle-based website to prevent my friends from RSVPing to a fancy dinner I hosted. The site features a series of custom-built puzzles that users must solve to RSVP.',
      date: 'Sept 2024',
      link: 'https://dinner-club.org/',
      github: 'https://github.com/imatson9119/dinner-club',
      image: 'assets/projects/img1.png',
    },
  ];

  curProjectIndex = 0;

  @state() curProject: Project = this.projects[this.curProjectIndex];

  @query('.left') image!: HTMLElement;

  @query('.right') right!: HTMLElement;

  @state() private isTransitioning = false;

  @state() private isImageLoading = false;

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.backgroundAnimation();
    });
  }

  private async animateTransition(reverse = false) {
    if (this.isTransitioning) return;
    this.isTransitioning = true;

    // Add slide classes based on direction
    this.image.classList.add(reverse ? 'slide-right' : 'slide-left');
    this.right.classList.add(reverse ? 'slide-right' : 'slide-left');

    // Wait for animation
    await new Promise<void>(resolve => setTimeout(resolve, 500));

    // Show loading placeholder immediately
    this.isImageLoading = true;

    // Update content
    this.curProjectIndex =
      (this.curProjectIndex + (reverse ? -1 : 1) + this.projects.length) %
      this.projects.length;
    this.curProject = this.projects[this.curProjectIndex];

    // Force a re-render
    await this.updateComplete;

    // Trigger reflow
    this.image.offsetWidth;
    this.right.offsetWidth;

    // Remove slide classes to animate back
    this.image.classList.remove(reverse ? 'slide-right' : 'slide-left');
    this.right.classList.remove(reverse ? 'slide-right' : 'slide-left');

    this.isTransitioning = false;
  }

  async nextProject(reverse = false) {
    await this.animateTransition(reverse);
  }

  buttonHoverAnimation(event: MouseEvent) {
    const button = event.currentTarget as HTMLElement;
    const buttonRect = button.getBoundingClientRect();
    const buttonCenterX = buttonRect.left + buttonRect.width / 2;
    const buttonCenterY = buttonRect.top + buttonRect.height / 2;

    // Calculate distance between cursor and button center
    const deltaX = event.clientX - buttonCenterX;
    const deltaY = event.clientY - buttonCenterY;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

    // Maximum pull distance and strength
    const maxPull = 40;
    const pullStrength = Math.min(maxPull, distance) / distance;

    // Calculate pull effect
    const moveX = deltaX * pullStrength * 0.2;
    const moveY = deltaY * pullStrength * 0.2;

    // Apply transform
    button.style.transform = `translate(${moveX}px, ${moveY}px)`;

    // Reset on mouse leave
    button.onmouseleave = () => {
      button.style.transform = 'translate(0, 0)';
    };
  }

  backgroundAnimation() {
    if (isMobileDevice()) return;
    let mousePos = [0, 0];
    const backgroundPos = [0, 0];
    const imageContainerMovementFactor = 0.08;
    const mainContainerMovementFactor = 0.05;
    const imageContainerVertMoveDist =
      window.innerHeight * imageContainerMovementFactor;
    const imageContainerHorizMoveDist =
      window.innerWidth * imageContainerMovementFactor;
    const mainContainerVertMoveDist =
      window.innerHeight * mainContainerMovementFactor;
    const mainContainerHorizMoveDistance =
      window.innerWidth * mainContainerMovementFactor;

    window.addEventListener('mousemove', event => {
      mousePos = [event.clientX, event.clientY];
    });

    const updateBackground = () => {
      const x = (mousePos[0] - window.innerWidth / 2) / window.innerWidth;
      const y = (mousePos[1] - window.innerHeight / 2) / window.innerHeight;

      // lerp background position
      backgroundPos[0] += (x - backgroundPos[0]) * 0.03;
      backgroundPos[1] += (y - backgroundPos[1]) * 0.03;
      this.image.style.translate = `${-backgroundPos[0] * imageContainerHorizMoveDist}px ${-backgroundPos[1] * imageContainerVertMoveDist}px`;
      this.right.style.translate = `${-backgroundPos[0] * mainContainerHorizMoveDistance}px ${-backgroundPos[1] * mainContainerVertMoveDist}px`;

      requestAnimationFrame(updateBackground);
    };
    updateBackground();
  }

  private onImageLoad() {
    this.isImageLoading = false;
  }

  private onImageError() {
    this.isImageLoading = false;
  }

  render() {
    return html`
      <div class="project-container">
        <div class="left">
          ${this.isImageLoading
            ? html`
                <div class="loading-placeholder">
                  <div class="loading-spinner"></div>
                </div>
              `
            : ''}
          <img
            src="${getAssetPath(this.curProject.image)}"
            alt="${this.curProject.title}"
            @load="${this.onImageLoad}"
            @error="${this.onImageError}"
            style="${this.isImageLoading ? 'opacity: 0;' : 'opacity: 1;'}"
          />
        </div>
        <div class="right">
          <div class="project-header">
            <button
              ?disabled=${this.isTransitioning}
              @click="${() => this.nextProject(true)}"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#eaf0ce"
              >
                <path
                  d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"
                />
              </svg>
            </button>
            <h2>${this.curProject.title}</h2>
            <button
              ?disabled=${this.isTransitioning}
              @click="${() => this.nextProject()}"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 -960 960 960"
                fill="#eaf0ce"
              >
                <path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z" />
              </svg>
            </button>
          </div>
          <p>${this.curProject.description}</p>
          <br />
          <div class="links">
            ${this.curProject.link
              ? html`<a
                  @mousemove=${this.buttonHoverAnimation}
                  class="link"
                  href="${this.curProject.link}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >View Project</a
                >`
              : ''}
            ${this.curProject.github
              ? html`<a
                  @mousemove=${this.buttonHoverAnimation}
                  class="github"
                  href="${this.curProject.github}"
                  target="_blank"
                  rel="noopener noreferrer"
                  >View Code</a
                >`
              : ''}
          </div>
        </div>
      </div>
    `;
  }
}
