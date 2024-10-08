import { LitElement, html } from 'lit';
import { property, customElement } from 'lit/decorators.js';
import { ComponentStyles } from './main-component.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('main-component')
export class MainA extends LitElement {
  @property({ type: String }) header = 'My app';

  static styles = [MainStyles, ComponentStyles];

  render() {
    return html` <splash-screen></splash-screen> `;
  }
}
