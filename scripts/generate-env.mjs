import { readFileSync, writeFileSync } from 'fs';
import { resolve, dirname } from 'path';
import { fileURLToPath } from 'url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');

const env = Object.fromEntries(
  readFileSync(resolve(root, '.env'), 'utf8')
    .split('\n')
    .filter(line => line && !line.startsWith('#'))
    .map(line => line.split('=').map(s => s.trim()))
);

writeFileSync(
  resolve(root, 'src/env.ts'),
  `export const PUBLIC_POSTHOG_API_KEY = ${JSON.stringify(env.PUBLIC_POSTHOG_API_KEY ?? '')};\nexport const PUBLIC_POSTHOG_HOST = ${JSON.stringify(env.PUBLIC_POSTHOG_HOST ?? '')};\n`
);

console.log('Generated src/env.ts');
