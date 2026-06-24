---
title: Technical Overview
description: The architecture of the Hackley Clubz platform.
order: 71
section: developer-docs
---

# Technical Overview

This page describes the technical architecture of Hackley Clubz at a high level.

## Stack

- **Frontend** — a web client that students, advisors, and admins use.
- **Backend API** — handles authentication, business logic, and data access.
- **Database** — stores Users, Clubs, Memberships, and Announcements (see the
  [Data Model](/data-model)).
- **This documentation site** — built with [Astro](https://astro.build), with
  content authored as Markdown.

## Documentation site architecture

This very site is intentionally simple and content-driven:

- Pages live as Markdown files in `src/content/docs/`.
- An Astro **content collection** validates each file's front matter.
- A dynamic route (`src/pages/[...slug].astro`) renders each doc.
- The navigation in the sidebar is generated from the content collection.
- **Pagefind** provides full-text search over the built site.

### Dev-only content editor

When running `astro dev`, an edit button appears on each page. It opens an editor
that can update a page's front matter and Markdown body, then save it back to disk
via a small dev-only API route. Saving requires a password stored in a
git-ignored local config file.

## Environments

| Environment | Command          | Search                       |
| ----------- | ---------------- | ---------------------------- |
| Development | `npm run dev`    | Editor enabled; build index for search |
| Preview     | `npm run preview`| Pagefind index served        |
| Production  | `npm run build`  | Static output + Pagefind index|
