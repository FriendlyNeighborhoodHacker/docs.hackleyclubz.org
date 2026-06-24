---
layout: ../../layouts/DocsLayout.astro
title: Getting Started
description: Set up a local environment for the docs site.
order: 72
section: developer-docs
---

# Getting Started

This guide gets the documentation site running locally.

## Prerequisites

- **Node.js** 22.12.0 or newer.
- **npm** (bundled with Node).

## Install

```bash
npm install
```

## Run the dev server

```bash
npm run dev
```

Open the URL printed in the terminal (typically `http://localhost:4321`). In dev
mode you'll see an **Edit** button on each page.

## Enable content editing

The editor saves files via a dev-only API route protected by a password.

1. Copy the example config:
   ```bash
   cp .dev-edit-config.example.json .dev-edit-config.json
   ```
2. Open `.dev-edit-config.json` and set your own `editPassword`.
3. This file is git-ignored, so your password is never committed.

## Build for production

```bash
npm run build
```

This produces a static site in `dist/` and runs Pagefind to generate the search
index.

## Preview the production build

```bash
npm run preview
```
