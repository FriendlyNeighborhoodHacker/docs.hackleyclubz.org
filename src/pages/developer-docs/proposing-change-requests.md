---
layout: ../../layouts/DocsLayout.astro
title: Proposing Change Requests
description: How to suggest and ship changes to Hackley Clubz.
order: 73
section: developer-docs
---

# Proposing Change Requests

This page explains how to propose, review, and ship changes — both to the product
and to this documentation.

## Editing documentation

The fastest path for small content edits:

1. Run the site in dev mode (`npm run dev`).
2. Click the **Edit** button on the page you want to change.
3. Update the front matter and/or Markdown body.
4. Enter the edit password and save.

For anything beyond a quick fix, use the change-request process below.

## Change-request process

1. **Open an issue** describing the problem or feature, and the motivation.
2. **Create a branch** named for the change, e.g. `feature/club-categories`.
3. **Make the change** with clear, focused commits.
4. **Open a pull request** that links the issue and summarizes the change.
5. **Request review** from a maintainer.
6. **Address feedback**, then merge once approved.

## Guidelines

- Keep PRs small and focused.
- Update docs in the same PR when behavior changes.
- Follow the [Design Guidelines](/developer-docs/design-guidelines).
- Write a clear PR description: what changed, why, and how to test it.

> When in doubt, open an issue first to align on the approach before writing code.
