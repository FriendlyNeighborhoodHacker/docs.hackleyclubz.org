import type { APIRoute } from 'astro';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join } from 'node:path';

/**
 * Dev-only API route that writes an edited doc back to disk.
 *
 * Security:
 *  - Disabled entirely unless running in dev (import.meta.env.DEV).
 *  - Requires a password that is read from a git-ignored local config file
 *    (.dev-edit-config.json at the project root).
 *
 * This route is never part of a static production build (output: 'static'),
 * and the DEV guard ensures it cannot run server-side in production.
 */

// Endpoints are prerendered by default in static mode; opt out so this runs
// as an on-demand handler under the dev server.
export const prerender = false;

const CONTENT_ROOT = join(process.cwd(), 'src', 'pages');
const CONFIG_PATH = join(process.cwd(), '.dev-edit-config.json');

function getEditPassword(): string | null {
  try {
    if (!existsSync(CONFIG_PATH)) return null;
    const cfg = JSON.parse(readFileSync(CONFIG_PATH, 'utf-8'));
    return typeof cfg.editPassword === 'string' ? cfg.editPassword : null;
  } catch {
    return null;
  }
}

/** Resolve a slug to its source file, guarding against path traversal. */
function resolveSourceFile(slug: string): string | null {
  // Normalize and reject anything trying to escape the content root.
  const clean = slug.replace(/^\/+|\/+$/g, '');
  if (clean.includes('..')) return null;

  const candidates = [
    join(CONTENT_ROOT, `${clean}.md`),
    join(CONTENT_ROOT, `${clean}.mdx`),
    join(CONTENT_ROOT, clean, 'index.md'),
    join(CONTENT_ROOT, clean, 'index.mdx'),
  ];

  for (const file of candidates) {
    if (!file.startsWith(CONTENT_ROOT)) continue;
    if (existsSync(file)) return file;
  }
  return null;
}

export const POST: APIRoute = async ({ request }) => {
  if (!import.meta.env.DEV) {
    return new Response(JSON.stringify({ error: 'Editing is only available in dev mode.' }), {
      status: 403,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const expected = getEditPassword();
  if (!expected) {
    return new Response(
      JSON.stringify({
        error:
          'No edit password configured. Copy .dev-edit-config.example.json to .dev-edit-config.json and set editPassword.',
      }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  let body: { slug?: string; frontmatter?: string; content?: string; password?: string };
  try {
    body = await request.json();
  } catch {
    return new Response(JSON.stringify({ error: 'Invalid JSON body.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { slug, frontmatter = '', content = '', password } = body;

  if (password !== expected) {
    return new Response(JSON.stringify({ error: 'Incorrect password.' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  if (!slug) {
    return new Response(JSON.stringify({ error: 'Missing slug.' }), {
      status: 400,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const file = resolveSourceFile(slug);
  if (!file) {
    return new Response(JSON.stringify({ error: `Could not find a source file for "${slug}".` }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  // Reassemble the file: frontmatter block + body.
  const fm = frontmatter.trim();
  const fileContents = `---\n${fm}\n---\n\n${content.replace(/^\s+/, '')}\n`;

  try {
    writeFileSync(file, fileContents, 'utf-8');
  } catch (err) {
    return new Response(
      JSON.stringify({ error: `Failed to write file: ${(err as Error).message}` }),
      { status: 500, headers: { 'Content-Type': 'application/json' } }
    );
  }

  return new Response(JSON.stringify({ ok: true, file }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
};
