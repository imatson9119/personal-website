---
title: 'Hello World: Building a Modern Blog with Eleventy'
date: 2024-01-15
description: 'Welcome to my new blog! Learn how I built this Markdown-driven blog using Eleventy that integrates seamlessly with my existing LitElement website.'
tags: ['web-development', 'eleventy', 'javascript', 'blog']
---

Welcome to my new blog! This is my first post in what I hope will be a series of insights, tutorials, and thoughts on software engineering, AI, and creative problem solving.

## Why I Chose Eleventy

After exploring various static site generators, I settled on [Eleventy](https://www.11ty.dev/) for several compelling reasons:

1. **Simplicity**: No complex configuration or steep learning curve
2. **Flexibility**: Works with multiple template languages (I chose Nunjucks)
3. **Integration**: Easily integrates with my existing LitElement components
4. **Performance**: Generates fast, static HTML that loads instantly

## The Tech Stack

This blog is built with:

- **Eleventy** for static site generation
- **Nunjucks** for templating
- **Markdown** for content authoring
- **LitElement** components for navbar and footer (shared with main site)
- **GitHub Pages** for hosting

## Key Features

### Clean URLs

Every post gets a clean URL structure like `/blog/hello-world/` instead of ugly `.html` extensions.

### Tag System

Posts can be tagged for easy categorization. You'll find tags at the top and bottom of each post, and there's a dedicated [tags page](/blog/tags/) to browse by topic.

### RSS Feed

Subscribe to the [RSS feed](/blog/feed.xml) to stay updated with new posts.

### Pagination

The blog index automatically paginates posts when there are more than 10, ensuring fast page loads.

### Navigation

Previous/next post navigation appears at the bottom of each post to encourage exploration.

## Writing Workflow

Creating new posts is as simple as:

1. Add a new `.md` file to `blog-src/posts/`
2. Include frontmatter with title, date, description, and tags
3. Write content in Markdown
4. Run `npm run blog:build` to generate the static files

## What's Next?

I'm planning to write about:

- Advanced LitElement patterns and best practices
- AI-assisted development workflows
- Full-stack architecture decisions
- Performance optimization techniques
- Open source project deep dives

Stay tuned, and feel free to [reach out](mailto:howdy@ian-matson.com) if there are specific topics you'd like me to cover!

---

_Thanks for reading! This blog is open source and you can find the code in my [personal website repository](https://github.com/imatson9119/personal-website)._

