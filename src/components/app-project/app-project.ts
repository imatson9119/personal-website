import { LitElement, html } from 'lit';
import { customElement, state } from 'lit/decorators.js';
import { ComponentStyles } from './app-project.styles.js';
import { MainStyles } from '../../styles.js';

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
      title: 'Pericopy',
      description: 'A web application for diff-driven Bible memorization supporting 9+ translations. Designed with the memorization of larger passages in mind, Pericopy features automatic passage detection, heatmap mistake visualization, and speech-to-text functionality.',
      date: 'Sept 2024',
      link: 'https://www.pericopy.net',
      github: 'https://github.com/imatson9119/Pericopy',
      image: 'assets/projects/img0.png'
    },
    {
      title: 'Dinner Club',
      description: 'An interactive puzzle-based website to prevent my friends from RSVPing to a fancy dinner I hosted. The site features a series of custom-built puzzles that users must solve to RSVP.',
      date: 'Sept 2024',
      link: 'https://dinner-club.org/',
      github: 'https://github.com/imatson9119/dinner-club',
      image: 'assets/projects/img1.png'
    }
  ]
  
  curProjectIndex = 0;

  @state() curProject: Project = this.projects[this.curProjectIndex];


  constructor() {
    super();

    this.updateComplete.then(() => {
    })
  }

  nextProject(reverse = false) {
    this.curProjectIndex = (this.curProjectIndex + (reverse ? -1 : 1) + this.projects.length) % this.projects.length;
    this.updateProject();
  }

  updateProject() {
    this.curProject = this.projects[this.curProjectIndex]; 
  }

  render() {
    return html`
      <div class="project-container">
        <div class="left">
          <img src="${this.curProject.image}" alt="${this.curProject.title}">
        </div>
        <div class="right">
          <div class="project-header">
            <button @click="${() => this.nextProject(true)}">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 -960 960 960" fill="#eaf0ce"><path d="M640-80 240-480l400-400 71 71-329 329 329 329-71 71Z"/></svg>
            </button>
            <h2>${this.curProject.title}</h2>
            <button @click="${this.nextProject}">
              <svg xmlns="http://www.w3.org/2000/svg"  viewBox="0 -960 960 960" fill="#eaf0ce"><path d="m321-80-71-71 329-329-329-329 71-71 400 400L321-80Z"/></svg>
            </button>
          </div>
          <p>${this.curProject.description}</p>
          <br>
          <div class = "links">
            ${this.curProject.link ? html`<a class='link' href="${this.curProject.link}" target="_blank" rel="noopener noreferrer">View Project</a>` : ''}
            ${this.curProject.github ? html`<a class='github' href="${this.curProject.github}" target="_blank" rel="noopener noreferrer">View Code</a>` : ''}
          </div>
        </div>
      </div>
    `;
  }
}
