import type { AstroIntegration } from 'astro';
import { fileURLToPath } from 'node:url';

/**
 * Dev-only content editor integration.
 *
 * It injects two routes ONLY when running `astro dev`:
 *   - /edit/[...slug]  → the editor UI
 *   - /api/save        → the password-gated save endpoint
 *
 * Because these are injected exclusively in the dev command, the production
 * `astro build` stays fully static and never requires a server adapter.
 */
export default function devEditor(): AstroIntegration {
  return {
    name: 'hackley-dev-editor',
    hooks: {
      'astro:config:setup': ({ command, injectRoute }) => {
        if (command !== 'dev') return;

        injectRoute({
          pattern: '/edit/[...slug]',
          entrypoint: fileURLToPath(new URL('../edit-page/[...slug].astro', import.meta.url)),
          prerender: false,
        });

        injectRoute({
          pattern: '/api/save',
          entrypoint: fileURLToPath(new URL('./save-route.ts', import.meta.url)),
          prerender: false,
        });
      },
    },
  };
}
