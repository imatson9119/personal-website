module.exports = function (eleventyConfig) {
  // Copy static assets
  eleventyConfig.addPassthroughCopy('assets');

  // Date filters
  eleventyConfig.addFilter('dateDisplay', function (date) {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  });

  eleventyConfig.addFilter('dateISO', function (date) {
    return new Date(date).toISOString();
  });

  // URL filter for clean URLs
  eleventyConfig.addFilter('url', function (url) {
    // Ensure URLs start with / and don't have trailing slashes (except root)
    if (!url) return '/';
    if (!url.startsWith('/')) url = '/' + url;
    if (url.length > 1 && url.endsWith('/')) {
      url = url.slice(0, -1);
    }
    return url;
  });

  // Collections
  eleventyConfig.addCollection('posts', function (collectionApi) {
    return collectionApi
      .getFilteredByGlob('posts/*.md')
      .filter(post => !post.data.draft)
      .sort((a, b) => b.date - a.date);
  });

  eleventyConfig.addCollection('tagList', function (collectionApi) {
    const tagSet = new Set();
    collectionApi
      .getAll()
      .filter(item => !item.data.draft) // Exclude draft posts
      .forEach(item => {
        if (item.data.tags) {
          item.data.tags
            .filter(tag => !['posts', 'all'].includes(tag))
            .forEach(tag => tagSet.add(tag));
        }
      });
    return Array.from(tagSet).sort();
  });

  // Pagination helper
  eleventyConfig.addFilter('paginate', function (collection, size = 10) {
    const pages = [];
    for (let i = 0; i < collection.length; i += size) {
      pages.push(collection.slice(i, i + size));
    }
    return pages;
  });

  // Previous/Next post navigation
  eleventyConfig.addFilter('getPreviousPost', function (posts, currentPost) {
    const index = posts.findIndex(post => post.url === currentPost.url);
    return index > 0 ? posts[index - 1] : null;
  });

  eleventyConfig.addFilter('getNextPost', function (posts, currentPost) {
    const index = posts.findIndex(post => post.url === currentPost.url);
    return index < posts.length - 1 ? posts[index + 1] : null;
  });

  // Excerpt filter
  eleventyConfig.addFilter('excerpt', function (content, length = 150) {
    if (!content) return '';
    const text = content.replace(/<[^>]*>/g, '');
    return text.length > length ? text.substring(0, length) + '...' : text;
  });

  // Filter to exclude draft posts
  eleventyConfig.addFilter('filterDrafts', function (collection) {
    return collection.filter(item => !item.data.draft);
  });

  return {
    dir: {
      input: '.',
      includes: '_includes',
      data: '_data',
      output: '..',
    },
    htmlTemplateEngine: 'njk',
    markdownTemplateEngine: 'njk',
    templateFormats: ['md', 'njk', 'html'],

    // Clean URLs - no .html extension
    htmlOutputSuffix: '.html',

    // Development server configuration
    serverOptions: {
      port: 8081,
    },
  };
};
