import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const docs = defineCollection({
  // Astro v6+ content collections use a loader. Glob all Markdown/MDX files
  // under src/content/docs and validate their front matter against the schema.
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/docs' }),
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    // Lower numbers sort first within their section.
    order: z.number().default(100),
    // Optional grouping key used for nested nav (e.g. "developer-docs").
    section: z.string().optional(),
  }),
});

export const collections = { docs };
