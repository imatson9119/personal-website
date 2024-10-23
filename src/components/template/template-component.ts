import { LitElement, html } from 'lit';
import { customElement } from 'lit/decorators.js';
import { ComponentStyles } from './template-component.styles.js';
import { MainStyles } from '../../styles.js';

@customElement('template-component')
export class TemplateComponent extends LitElement {

  static styles = [MainStyles, ComponentStyles];

  constructor() {
    super();

    this.updateComplete.then(() => {
    })
  }

  render() {
    return html`
    `;
  }
}
