---
layout: ../../layouts/DocsLayout.astro
title: Design Guidelines
description: Visual and UX rules for Hackley Clubz.
order: 74
section: developer-docs
---

# Design Guidelines

These guidelines keep Hackley Clubz friendly, modern, and uncluttered.

## Color palette

The palette is defined as CSS custom properties in `src/styles/global.css` so a
future **dark mode** can be added by overriding the same tokens.

| Token                     | Value     | Use                              |
| ------------------------- | --------- | -------------------------------- |
| `--color-coral`           | `#ff6b4a` | Primary brand accent             |
| `--color-purple`          | `#6a3de8` | Gradient start                   |
| `--color-deep-blue`       | `#1e2a78` | Gradient end                     |
| `--brand-gradient`        | gradient  | Headers / hero areas             |
| `--next-btn`              | `#038bff` | "Next" / forward action buttons  |
| `--bg`                    | `#ffffff` | App background (Light Mode)      |
| `--text`                  | `#1c1e29` | Primary text                     |
| `--accent-pastel-coral`   | `#ffe7e0` | Soft accents, chat bubbles       |
| `--accent-pastel-purple`  | `#ece7fc` | Soft accents                     |
| `--accent-pastel-blue`    | `#e3f1ff` | Soft accents                     |

**Rule:** any button that takes the user to the **next** page must use
`--next-btn` (`#038bff`). Use the `.next-button` class.

## Typography

- **Titles and prompts** (anything asking the user to do something): use
  **BD Megalona Extra Light** via `var(--font-title)`.
- **Body text**: use **BB Noname Pro Regular** via `var(--font-body)`.

Drop the font files into `public/fonts/`; `@font-face` rules in `global.css`
pick them up automatically.

## Overall vibe

- White backgrounds, dark text, soft pastel accents.
- Friendly, modern, and uncluttered.
- Light mode now; built so dark mode is easy to add later.

## Layout

- Logo top-left, followed by a slash and the word "Docs."
- A left sidebar with a "Search Docs" box and the section navigation.
- Below 900px, the sidebar collapses into a hamburger menu that opens a
  full-screen **Browse** overlay with a close (✕) control.
