import { posthog } from 'posthog-js';
import { PUBLIC_POSTHOG_API_KEY, PUBLIC_POSTHOG_HOST } from './env.js';

posthog.init(PUBLIC_POSTHOG_API_KEY, {
  api_host: PUBLIC_POSTHOG_HOST,
  capture_exceptions: true,
  capture_pageview: true,
  persistence: 'localStorage+cookie',
});

export default posthog;
