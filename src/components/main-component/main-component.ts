import { LitElement, html } from 'lit';
import { property, customElement, query } from 'lit/decorators.js';
import { ComponentStyles } from './main-component.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('main-component')
export class MainA extends LitElement {
  @property({ type: String }) header = 'My app';

  @query('#cursor-trail') trail: SVGElement | undefined;
  @query('#cursor-path') path: SVGClipPathElement | undefined;

  static styles = [MainStyles, ComponentStyles];

  constructor() {
    super();

    this.updateComplete.then(() => {
      this.cursorTrail(); 
    })
  }

  cursorTrail() {
    let points: Array<Array<number>> = []
    let mousePos = [0,0];
    const nSegments = 100;

    const drawPath = () => {

      let pos = mousePos;
      let totalDistance = 0;

      for(let i = 0; i < nSegments; i++) {
        points[i] = pos;

        if (i !== points.length - 1) {
          pos = [
            pos[0] - (pos[0] - points[i + 1][0]) * 0.3,
            pos[1] - (pos[1] - points[i + 1][1]) * 0.3
          ]
        }
        totalDistance += Math.sqrt((points[i][0] - pos[0]) ** 2 + (points[i][1] - pos[1]) ** 2);
      }

      if (points.length !== 0) {
        this.path?.setAttribute('d', `M ${points.map(point => point.join(' ')).join(' L ')}`);
        // Set color based on totalDistance of path - the longer the path, the darker the color
        this.path?.setAttribute('stroke', `rgba(234, 240, 206, ${Math.min(1, totalDistance / 1000)})`);
      }

      requestAnimationFrame(drawPath);
    }
    
    
    window.addEventListener('mousemove', (event) => {
      mousePos = [event.clientX, event.clientY];

      if (points.length === 0) {
        for(let i = 0; i < nSegments; i++) {
          points.push(mousePos);
        }
        drawPath();
      }
    });

    const resize = () => {
      if (this.trail) {
        this.trail.style.width = `${window.innerWidth}px`
        this.trail.style.height = `${window.innerHeight}px`
        this.trail.setAttribute("viewBox", `0 0 ${window.innerWidth} ${window.innerHeight}`)
      }
    }

    window.addEventListener('resize', resize);
    
    resize();
  }

  render() {
    return html`
      <svg id="cursor-trail" viewBox='0 0 1 1'>
        <path stroke='#eaf0ce' id="cursor-path" d="" />
      </svg>
      <splash-screen></splash-screen>
    `;
  }
}
