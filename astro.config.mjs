// @ts-check
import { defineConfig } from 'astro/config';

import mdx from '@astrojs/mdx';
import devEditor from './src/integrations/dev-editor.ts';

// https://astro.build/config
export default defineConfig({
  site: 'https://docs.hackleyclubz.org',
  // Static output for the docs. The dev-only content editor injects its routes
  // only under `astro dev`, so the production build stays fully static and
  // never needs a server adapter.
  output: 'static',
  integrations: [mdx(), devEditor()],
});
