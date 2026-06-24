# Hackley Clubz — Documentation Site

The documentation site for **Hackley Clubz**, built with [Astro](https://astro.build).
It is written for two audiences:

- The **IT Director** of Hackley School — to understand the technical architecture.
- The **Dean** of Hackley School — to understand the product features.

## ✨ Features

- **Markdown-based content** — every page is a Markdown file in
  `src/content/docs/`, making it easy for anyone to edit.
- **Clean, modern design** — coral/orange + purple→deep-blue brand gradient,
  light interface, soft pastel accents. Colors live as CSS custom properties in
  `src/styles/global.css` so a **dark mode** can be added later by overriding a
  single block.
- **Sidebar navigation** with a search box ("Search Docs", powered by
  [Pagefind](https://pagefind.app/)).
- **Responsive** — under 900px the sidebar collapses into a top-right hamburger
  that opens a "Browse" overlay (with an ✕ to close; it also closes when a link
  is tapped).
- **Dev-only content editor** — in `npm run dev` a floating **Edit** button
  appears at the bottom-right of every page. It opens an editor where you can
  change the front matter (top) and the Markdown/MDX body (bottom), and save
  changes directly to disk. Saving requires a password stored **outside git**.

## 🧞 Commands

| Command          | Action                                                       |
| :--------------- | :----------------------------------------------------------- |
| `npm install`    | Install dependencies                                         |
| `npm run dev`    | Start the dev server at `localhost:4321` (editor enabled)    |
| `npm run build`  | Build the static site to `./dist/` and generate the search index |
| `npm run preview`| Preview the production build locally                         |

> Tip: per the project conventions you can also run the dev server in the
> background with `astro dev --background`, and manage it with
> `astro dev stop` / `astro dev status` / `astro dev logs`.

## ✍️ Editing content

### The easy way (dev editor)

1. Copy the example config and set a password:
   ```sh
   cp .dev-edit-config.example.json .dev-edit-config.json
   # then edit .dev-edit-config.json and set "editPassword"
   ```
   `.dev-edit-config.json` is git-ignored, so the password never gets committed.
2. Run `npm run dev`.
3. Visit any page, click the **Edit** button (bottom-right), make your changes,
   enter the password, and **Save**. The change is written straight to the
   source Markdown file.

The editor and its save endpoint are injected **only** under `astro dev` (see
`src/integrations/dev-editor.ts`), so the production build stays fully static
and ships none of the editing code.

### The manual way

Edit the Markdown files directly in `src/content/docs/`. Each file has YAML
front matter:

```yaml
---
title: Overview
description: A short summary used for meta + search.
order: 10            # lower numbers sort first in the sidebar section
---
```

## 🗂 Project structure

```text
src/
├── content/
│   ├── config → content.config.ts   # collection schema (loader-based)
│   └── docs/                         # all documentation Markdown lives here
│       ├── overview.md
│       ├── users.md
│       ├── key-user-flows.md
│       ├── key-admin-flows.md
│       ├── data-model.md
│       ├── reporting-flows.md
│       └── developer-docs/
│           ├── index.md
│           ├── technical-overview.md
│           ├── getting-started.md
│           ├── proposing-change-requests.md
│           └── design-guidelines.md
├── components/      # Sidebar, EditButton
├── layouts/         # DocsLayout (header, sidebar, mobile overlay, search)
├── lib/nav.ts       # sidebar navigation definition
├── pages/           # index (redirect → /overview) + [...slug] doc renderer
├── edit-page/       # dev-only editor UI (injected in dev)
├── integrations/    # dev-editor integration + save route (dev only)
└── styles/global.css# palette, fonts, base styles
```

## 🎨 Fonts

The design calls for **BD Megalona Extra Light** (titles / prompts) and
**BB Noname Pro Regular** (body). Drop the font files into
`public/fonts/` using these names and they will be picked up automatically:

```
public/fonts/BDMegalona-ExtraLight.woff2
public/fonts/BDMegalona-ExtraLight.woff
public/fonts/BBNonamePro-Regular.woff2
public/fonts/BBNonamePro-Regular.woff
```

Sensible system fallbacks are used until the files are present.
