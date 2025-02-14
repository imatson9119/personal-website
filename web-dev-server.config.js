import { esbuildPlugin } from '@web/dev-server-esbuild';

export default {
  rootDir: '.',
  nodeResolve: true,
  plugins: [
    esbuildPlugin({ 
      ts: true,
      target: 'es2020',
      tsconfig: './tsconfig.json'
    })
  ],
  appIndex: 'index.html',
  open: true,
};
