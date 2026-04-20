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
  // Custom middleware to serve blog files with clean URLs
  middleware: [
    function blogMiddleware(context, next) {
      const { request } = context;

      if (request.url.startsWith('/blog') && !request.url.includes('.')) {
        if (!request.url.endsWith('/')) {
          request.url = request.url + '/index.html';
        } else {
          request.url = request.url + 'index.html';
        }
      }
      return next();
    },
  ],
};
