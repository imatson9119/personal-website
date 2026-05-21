const slugify = require('slugify');

// Match Eleventy's built-in `slugify` Nunjucks filter so existing post URLs
// stay byte-identical to what `posts.json` was previously producing.
const toSlug = str =>
  slugify('' + (str || ''), { replacement: '-', lower: true });

module.exports = {
  layout: 'post.njk',
  tags: ['posts'],
  eleventyComputed: {
    // Drafts must not produce output. Without this, a draft with an empty
    // title slugifies to "" and collides with /blog/index.html (index.njk).
    permalink: data => {
      if (data.draft) return false;
      return `/blog/${toSlug(data.title)}/`;
    },
    eleventyExcludeFromCollections: data => Boolean(data.draft),
  },
};
