---
title: 'Building Modern Web Components with LitElement'
date: 2024-01-10
description: 'Explore the power of LitElement for creating reusable, performant web components. Learn best practices, patterns, and real-world examples from building my portfolio site.'
tags: ['web-components', 'lit', 'javascript', 'frontend']
---

LitElement has become my go-to library for building web components. After using it extensively in my portfolio site, I want to share why it's such a powerful choice and some patterns I've discovered along the way.

## Why LitElement?

LitElement sits in a sweet spot between vanilla web components and heavy frameworks:

- **Standards-based**: Built on Web Components standards
- **Lightweight**: ~5KB gzipped for the core library
- **TypeScript-first**: Excellent TypeScript support out of the box
- **Reactive**: Efficient updates with declarative templates
- **Framework-agnostic**: Works anywhere HTML works

## Component Architecture

Here's how I structure a typical LitElement component:

```typescript
import { LitElement, html, css } from 'lit';
import { customElement, property, state } from 'lit/decorators.js';

@customElement('my-component')
export class MyComponent extends LitElement {
  static styles = css`
    :host {
      display: block;
      /* Component styles */
    }
  `;

  @property({ type: String })
  title = '';

  @state()
  private _isLoading = false;

  render() {
    return html`
      <h2>${this.title}</h2>
      ${this._isLoading ? html`<loading-spinner></loading-spinner>` : ''}
    `;
  }
}
```

## Key Patterns I Use

### 1. Reactive Properties

Use `@property()` for public API and `@state()` for internal state:

```typescript
@property({ type: Number })
count = 0;

@state()
private _internalCounter = 0;
```

### 2. Event Dispatching

Create strongly-typed custom events:

```typescript
private _handleClick() {
  this.dispatchEvent(new CustomEvent('item-selected', {
    detail: { id: this.itemId },
    bubbles: true,
    composed: true
  }));
}
```

### 3. Lifecycle Management

Use `connectedCallback` and `disconnectedCallback` for setup/cleanup:

```typescript
connectedCallback() {
  super.connectedCallback();
  window.addEventListener('resize', this._handleResize);
}

disconnectedCallback() {
  window.removeEventListener('resize', this._handleResize);
  super.disconnectedCallback();
}
```

## Performance Tips

### Efficient Rendering

LitElement only re-renders when reactive properties change:

```typescript
// This will trigger a re-render
this.title = 'New Title';

// This won't (no @property or @state decorator)
this.someOtherValue = 'Updated';
```

### CSS Optimization

Use static styles for better performance:

```typescript
static styles = css`
  /* These styles are shared across all instances */
  :host {
    display: block;
  }
`;
```

### Template Caching

Lit automatically caches template parts that don't change:

```typescript
render() {
  return html`
    <header>Static header content</header>
    <main>${this.dynamicContent}</main>
  `;
}
```

## Real-World Example

Here's a simplified version of my portfolio's navigation component:

```typescript
@customElement('app-navbar')
export class NavbarComponent extends LitElement {
  static styles = css`
    .navbar {
      display: flex;
      justify-content: center;
      gap: 2rem;
      padding: 1rem;
    }

    button {
      background: none;
      border: none;
      cursor: pointer;
      transition: transform 0.2s ease;
    }

    button:hover {
      transform: scale(1.05);
    }
  `;

  render() {
    return html`
      <nav class="navbar">
        <button @click=${() => this._navigate('about')}>About</button>
        <button @click=${() => this._navigate('portfolio')}>Portfolio</button>
        <button @click=${() => this._navigate('contact')}>Contact</button>
      </nav>
    `;
  }

  private _navigate(section: string) {
    this.dispatchEvent(
      new CustomEvent('navigate', {
        detail: section,
        bubbles: true,
        composed: true,
      }),
    );
  }
}
```

## Testing LitElement Components

Testing is straightforward with tools like `@web/test-runner`:

```typescript
import { fixture, expect } from '@open-wc/testing';
import { html } from 'lit';
import './my-component.js';

describe('MyComponent', () => {
  it('renders with default title', async () => {
    const el = await fixture(html`<my-component></my-component>`);
    expect(el.shadowRoot!.textContent).to.include('Default Title');
  });
});
```

## Integration with Build Tools

LitElement works great with modern build tools. In my setup with Rollup:

```javascript
// rollup.config.js
export default {
  input: 'src/index.ts',
  output: {
    dir: 'dist',
    format: 'es',
  },
  plugins: [
    resolve(),
    typescript(),
    // LitElement templates get optimized automatically
  ],
};
```

## Conclusion

LitElement has proven to be an excellent choice for component-based architecture. It provides the power of modern frameworks while staying close to web standards, resulting in components that are both performant and future-proof.

The components I built for my portfolio site seamlessly integrate with this blog (notice the shared navbar and footer), demonstrating the true portability of web components.

Want to see more LitElement patterns in action? Check out my [portfolio source code](https://github.com/imatson9119/personal-website) or [reach out](mailto:howdy@ian-matson.com) with questions!

