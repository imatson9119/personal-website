<wizard-report>
# PostHog post-wizard report

The wizard has completed a deep integration of PostHog analytics into your portfolio website (ian-matson.com). The site is a client-side Lit web components application, so `posthog-js` (the browser SDK) was used. A PostHog singleton was created at `src/posthog.ts` and imported into four components. Environment variables are injected at build time via `@rollup/plugin-replace` (production) and via esbuild `define` (dev server). Exception autocapture is enabled globally.

| Event name | Description | File |
|---|---|---|
| `project link clicked` | User clicks "View Project" for a portfolio project | `src/components/app-project/app-project.ts` |
| `project github clicked` | User clicks "View Code" (GitHub) for a portfolio project | `src/components/app-project/app-project.ts` |
| `github profile clicked` | User clicks the GitHub link in the navbar | `src/components/app-navbar/app-navbar.ts` |
| `blog clicked` | User clicks the Blog link in the navbar | `src/components/app-navbar/app-navbar.ts` |
| `contact section opened` | User clicks Contact in the navbar to scroll to the contact section | `src/components/app-navbar/app-navbar.ts` |
| `contact email clicked` | User clicks the email link in the footer | `src/components/app-footer/app-footer.ts` |
| `contact linkedin clicked` | User clicks the LinkedIn link in the footer | `src/components/app-footer/app-footer.ts` |
| `mug spin boosted` | User clicks/taps the 3D mug to boost its spin | `src/components/app-about/app-about.ts` |

**Additional files changed:**
- `src/posthog.ts` — PostHog singleton (new file)
- `rollup.config.js` — added `@rollup/plugin-replace` + `dotenv` for build-time env injection
- `web-dev-server.config.js` — added esbuild `define` for dev-time env injection
- `.env` — created with `PUBLIC_POSTHOG_API_KEY` and `PUBLIC_POSTHOG_HOST`

**Before running the build**, install the new dependencies:
```bash
yarn add posthog-js
yarn add --dev @rollup/plugin-replace dotenv
```

## Next steps

We've built some insights and a dashboard for you to keep an eye on user behavior, based on the events we just instrumented:

- **Dashboard — Analytics basics:** https://us.posthog.com/project/405522/dashboard/1532774
- **Portfolio site engagement over time:** https://us.posthog.com/project/405522/insights/uyeysWmJ
- **Project clicks by project:** https://us.posthog.com/project/405522/insights/VcAavkVR
- **Contact conversion funnel:** https://us.posthog.com/project/405522/insights/v5VaqBnd
- **Navigation clicks breakdown:** https://us.posthog.com/project/405522/insights/GSr0iYWI
- **Project interest: View Project vs View Code:** https://us.posthog.com/project/405522/insights/FguzxIjZ

### Agent skill

We've left an agent skill folder in your project. You can use this context for further agent development when using Claude Code. This will help ensure the model provides the most up-to-date approaches for integrating PostHog.

</wizard-report>
