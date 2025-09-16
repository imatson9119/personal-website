import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  rootDir: '.',
  nodeResolve: true,
  plugins: [
    esbuildPlugin({
      ts: true,
      target: 'es2020',
      tsconfig: './tsconfig.json',
    }),
  ],
  appIndex: 'index.html',
  open: true,
  watch: true,
  // Watch for changes in the blog output directory
  watchIgnore: ['node_modules/**', 'dist/**', 'out-tsc/**', '!blog/**'],
  // Custom middleware to serve blog files
  middleware: [
    function blogMiddleware(context, next) {
      const { request } = context;

      // If the request is for /blog or /blog/*, serve from the blog directory
      if (request.url.startsWith('/blog')) {
        // Remove /blog prefix and serve from blog directory
        const blogPath = request.url.replace(/^\/blog/, '') || '/index.html';

        // Handle clean URLs - if path doesn't end with .html and isn't a file with extension
        let filePath = blogPath;
        if (!filePath.includes('.') && !filePath.endsWith('/')) {
          filePath = filePath + '/index.html';
        } else if (filePath.endsWith('/')) {
          filePath = filePath + 'index.html';
        }

        // Update the URL to point to the blog directory
        request.url = '/blog/blog' + filePath;
      }
      return next();
    },
  ],
};
