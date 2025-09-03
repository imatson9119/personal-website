# Eleventy Blog

This directory contains the Eleventy-powered blog that integrates with the main portfolio site.

## Directory Structure

```
blog-src/
├── .eleventy.cjs          # Eleventy configuration
├── _includes/             # Nunjucks templates
│   ├── layout.njk         # Main layout with Lit components
│   └── post.njk           # Individual post layout
├── _data/                 # Global data files (if needed)
├── posts/                 # Blog posts in Markdown
│   ├── posts.json         # Default frontmatter for posts
│   ├── hello-world.md     # Sample post
│   └── building-with-lit.md
├── assets/                # Blog-specific assets
├── index.njk              # Blog homepage with pagination
├── tags.njk               # All tags page
├── tags-list.njk          # Individual tag pages
└── feed.njk               # RSS feed
```

Output goes to `../blog/` (relative to this directory).

## Writing Workflow

### Creating a New Post

1. Create a new `.md` file in the `posts/` directory
2. Add frontmatter with required fields:

```yaml
---
title: 'Your Post Title'
date: 2024-01-15
description: 'Brief description for SEO and post listings'
tags: ['tag1', 'tag2', 'web-development']
---
Your Markdown content here...
```

### Frontmatter Fields

- **title** (required): Post title, used in URLs and page titles
- **date** (required): Publication date, used for sorting and RSS
- **description** (optional): Brief description for SEO and post previews
- **tags** (optional): Array of tags for categorization
- **draft** (optional): Set to `true` to exclude from build

### Running Locally

```bash
# Build the blog once
npm run blog:build

# Watch for changes and rebuild
npm run blog:watch

# Serve with live reload
npm run blog:serve
```

The blog will be available at `http://localhost:8080/blog/`

### Drafts

To create a draft post that won't appear in production:

```yaml
---
title: 'Work in Progress'
date: 2024-01-15
draft: true
---
```

Drafts are excluded from the build by the Eleventy configuration.

## URL Structure

- Blog homepage: `/blog/`
- Individual posts: `/blog/post-title/`
- Pagination: `/blog/page/2/`, `/blog/page/3/`, etc.
- Tags overview: `/blog/tags/`
- Individual tag pages: `/blog/tags/tag-name/`
- RSS feed: `/blog/feed.xml`

## Integration with Main Site

The blog integrates seamlessly with your existing LitElement components:

- **Navbar**: Uses `<app-navbar>` component
- **Footer**: Uses `<app-footer>` component
- **Styles**: Inherits base fonts and colors from main site
- **Assets**: Can reference assets from main site's `/assets/` directory

## Deployment

The blog builds automatically as part of the main site build process:

```bash
# Full site build (includes blog)
npm run build

# Deploy to GitHub Pages
npm run deploy
```

The `npm run build` command:

1. Builds the main TypeScript/Lit site
2. Runs `npm run blog:build` to generate blog HTML
3. Copies everything to `dist/` for deployment

## Customization

### Adding New Collections

Edit `.eleventy.cjs` to add new collections:

```javascript
eleventyConfig.addCollection('featured', function (collectionApi) {
  return collectionApi
    .getFilteredByGlob('posts/*.md')
    .filter(post => post.data.featured);
});
```

### Modifying Templates

Templates are in `_includes/`:

- **layout.njk**: Main layout wrapper
- **post.njk**: Individual post template

### Adding Filters

Add custom Nunjucks filters in `.eleventy.cjs`:

```javascript
eleventyConfig.addFilter('myFilter', function (value) {
  return value.toUpperCase();
});
```

## Troubleshooting

### Build Fails

1. Check that all posts have valid frontmatter
2. Ensure date format is YYYY-MM-DD
3. Verify Nunjucks syntax in templates

### Missing Lit Components

If `<app-navbar>` or `<app-footer>` don't render:

1. Check that the main site's compiled JS is available
2. Verify the script tag path in `layout.njk`
3. Ensure components are registered before page load

### Broken Links

- Use relative paths starting with `/blog/`
- Test locally with `npm run blog:serve`
- Check that generated URLs match your expectations

## Reverting a Bad Build

If you need to quickly revert:

1. **Git**: `git checkout HEAD~1 blog/` to restore previous blog build
2. **Full revert**: `git revert <commit-hash>` for complete rollback
3. **Rebuild**: `npm run blog:build` to regenerate from current source

The `/blog/` directory is ignored by git, so only source changes in `blog-src/` are versioned.

---

Questions? Check the [Eleventy docs](https://www.11ty.dev/docs/) or [reach out](mailto:howdy@ian-matson.com)!

