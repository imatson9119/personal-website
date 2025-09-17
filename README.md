# Ian Matson - Personal Website & Portfolio

A modern, interactive personal website and portfolio built with cutting-edge web technologies. Features a stunning animated interface, integrated blog system, and responsive design showcasing software engineering projects and professional experience.

🌐 **Live Site**: [ian-matson.com](https://ian-matson.com)

## ✨ Features

- **Interactive 3D Elements**: Dynamic cursor trails and animated wave text effects
- **Component-Based Architecture**: Built with Lit Element web components
- **Integrated Blog System**: Powered by Eleventy (11ty) static site generator
- **Progressive Web App**: Service worker implementation with Workbox
- **Responsive Design**: Optimized for all device sizes
- **SEO Optimized**: Complete meta tags, structured data, and Open Graph support
- **Performance Focused**: Code splitting, lazy loading, and optimized builds

## 🛠️ Tech Stack

### Frontend Framework & Libraries

- **[Lit](https://lit.dev/)** (v3.1.4) - Lightweight web components library
- **[Three.js](https://threejs.org/)** (v0.169.0) - 3D graphics and animations
- **TypeScript** (v5.5.3) - Type-safe JavaScript development
- **Web Components** - Native browser standards for reusable components

### Build System & Development

- **[Rollup](https://rollupjs.org/)** (v4.18.1) - Module bundler with tree-shaking
- **[esbuild](https://esbuild.github.io/)** - Ultra-fast TypeScript/JavaScript bundler
- **[@web/dev-server](https://modern-web.dev/docs/dev-server/overview/)** - Modern development server
- **[Workbox](https://developers.google.com/web/tools/workbox)** - Progressive Web App tooling

### Blog System

- **[Eleventy (11ty)](https://www.11ty.dev/)** (v2.0.1) - Static site generator
- **Nunjucks** - Templating engine for blog layouts
- **Markdown** - Content authoring format

### Code Quality & Tooling

- **[ESLint](https://eslint.org/)** - JavaScript/TypeScript linting
- **[Prettier](https://prettier.io/)** - Code formatting
- **[Husky](https://typicode.github.io/husky/)** - Git hooks for pre-commit checks
- **[lint-staged](https://github.com/okonet/lint-staged)** - Run linters on staged files

### Deployment & CI/CD

- **[gh-pages](https://github.com/tschaub/gh-pages)** - GitHub Pages deployment
- **GitHub Actions** - Automated builds and deployments
- **Custom Domain** - Deployed to ian-matson.com

## 🏗️ Project Structure

```
├── src/                          # Main application source
│   ├── components/               # Lit web components
│   │   ├── main-component/       # Main app container
│   │   ├── app-navbar/           # Navigation component
│   │   ├── app-splash-screen/    # Hero section
│   │   ├── app-about/            # About section
│   │   ├── app-portfolio/        # Projects showcase
│   │   ├── app-footer/           # Contact section
│   │   ├── app-cursor-trail/     # Interactive cursor effects
│   │   └── app-click-text/       # Click animations
│   ├── index.ts                  # Main entry point
│   └── styles.ts                 # Global styles
├── blog-src/                     # Blog source files (Eleventy)
│   ├── _includes/                # Blog templates
│   ├── posts/                    # Blog post markdown files
│   └── .eleventy.cjs            # Eleventy configuration
├── assets/                       # Static assets (images, 3D models)
├── dist/                         # Built application
├── blog/                         # Generated blog files
└── rollup.config.js             # Build configuration
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Yarn package manager

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/imatson9119/personal-website.git
   cd personal-website
   ```

2. **Install dependencies**

   ```bash
   yarn install
   ```

3. **Start development server**

   ```bash
   yarn dev
   ```

   This starts both the main app and blog development servers concurrently.

4. **View the application**
   - Main site: http://localhost:8000
   - Blog development: http://localhost:8081

## 📝 Available Scripts

### Development

- `yarn start` - Start main development server
- `yarn dev` - Start both main app and blog development servers
- `yarn blog:dev` - Start blog development server only
- `yarn blog:serve` - Serve blog with live reload

### Building

- `yarn build` - Build production version
- `yarn blog:build` - Build blog only
- `yarn start:build` - Preview production build locally

### Code Quality

- `yarn lint` - Run ESLint and Prettier checks
- `yarn format` - Auto-fix linting and formatting issues
- `yarn analyze` - Generate custom elements manifest

### Deployment

- `yarn deploy` - Build and deploy to GitHub Pages

## 🎨 Key Components

### Main Component (`main-component`)

The core application container featuring:

- Animated wave text overlays with SVG paths
- Dynamic background animations responding to mouse movement
- Smooth scrolling navigation between sections
- Font loading optimization for text animations

### Interactive Elements

- **Cursor Trail**: 3D particle system following mouse movement
- **Click Text**: Animated text effects on user interactions
- **Wave Animations**: Continuously flowing text along SVG wave paths

### Blog System

- Markdown-based content authoring
- Automatic RSS feed generation
- Tag-based organization
- SEO-optimized page generation
- Clean URL structure

## 🌐 Deployment

The site is automatically deployed to GitHub Pages via GitHub Actions on pushes to the main branch. The deployment process:

1. Builds the main application with Rollup
2. Generates the blog with Eleventy
3. Combines both into the `dist/` directory
4. Deploys to GitHub Pages with custom domain

## 📱 Browser Support

- Modern browsers supporting ES2021
- Web Components v1 specification
- CSS Custom Properties (CSS Variables)
- ES Modules

Target browsers:

- Chrome 64+
- Firefox 67+
- Safari 11.1+

## 🤝 Contributing

This is a personal portfolio project, but suggestions and feedback are welcome! Feel free to:

1. Open issues for bugs or suggestions
2. Submit pull requests for improvements
3. Share feedback on design or functionality

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📧 Contact

**Ian Matson**

- Website: [ian-matson.com](https://ian-matson.com)
- GitHub: [@imatson9119](https://github.com/imatson9119)
- LinkedIn: [ian-matson](https://www.linkedin.com/in/ian-matson/)

---

_Built with ❤️ using modern web technologies_
