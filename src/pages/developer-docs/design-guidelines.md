---
layout: ../../layouts/DocsLayout.astro
title: Design Guidelines
description: Visual and UX rules for Hackley Clubz.
order: 74
section: developer-docs
---

# Hackley Clubz — Design & Style Guidelines

> A reference for building consistent, friendly, modern interfaces across hackleyclubz.org.
> The source of truth for implementation is `public/css/app.css` (CSS custom properties / design tokens).

---

## 1. Brand Personality

Clubz should feel **friendly, modern, and uncluttered**. The interface centralizes how Hackley
students engage with clubs, so every screen should reduce friction and feel inviting.

- **Vibe:** clean, organized, community-oriented
- **Aesthetic:** light interface, white backgrounds, dark text, soft pastel accents
- **Signature colors:** vibrant coral/orange paired with a purple/dark-blue gradient

---

## 2. Color Palette

Colors are defined as CSS custom properties in `:root` so the app can be re-themed (and
eventually support a Dark Mode) by changing variables only.

### Brand
| Token | Hex | Usage |
|---|---|---|
| `--coral` | `#FF6B47` | Primary brand accent, CTAs, highlights |
| `--coral-light` | `#FF8E72` | Hover/lighter coral fills |
| `--purple-dark` | `#2D1B69` | Gradient partner, emphasis text |
| `--purple-mid` | `#4A2FA0` | Secondary purple |
| `--accent-blue` | `#038BFF` | **"Next" / primary action buttons (required)** |
| `--accent-blue-hover` | `#0275D8` | Primary button hover |

> **Rule:** Any button that advances the user to the next page must use `#038BFF` (`--accent-blue`).

### Brand Gradient
```css
--gradient-brand: linear-gradient(135deg, var(--coral) 0%, var(--purple-dark) 100%);
```
Use for splash screens, hero areas, and login.

### UI Neutrals
| Token | Hex | Usage |
|---|---|---|
| `--white` | `#FFFFFF` | Base |
| `--bg` | `#F8F8FA` | Page background |
| `--surface` | `#FFFFFF` | Cards, panels, inputs |
| `--border` | `#E2E2E8` | Standard borders |
| `--border-light` | `#F0F0F5` | Subtle dividers |

### Text
| Token | Hex | Usage |
|---|---|---|
| `--text-primary` | `#1A1A2E` | Body & headings |
| `--text-secondary` | `#6B6B80` | Labels, captions |
| `--text-muted` | `#9999AA` | Placeholders, hints |

### Feedback
| Token | Hex | Background token |
|---|---|---|
| `--success` | `#2ECC71` | `--success-bg` `#EAFAF1` |
| `--error` | `#E74C3C` | `--error-bg` `#FDEDEC` |
| `--info` | `#3498DB` | `--info-bg` `#EBF5FB` |

### Chat-Bubble Pastels
| Token | Hex | Usage |
|---|---|---|
| `--bubble-sent` | `#E8F4FD` | Outgoing messages |
| `--bubble-recv` | `#F5F0FF` | Incoming messages |

---

## 3. Typography

Two custom fonts, with graceful fallbacks defined via `@font-face` in `app.css`.

| Token | Font | Use for |
|---|---|---|
| `--font-title` | **BD Megalona Extra Light** → `Georgia, serif` | Titles, headings, prompts, bold/italic emphasis |
| `--font-body` | **BB Noname Pro Regular** → `system-ui, sans-serif` | Body copy, UI text, forms |

### Headings (always `--font-title`, weight 200)
| Element | Size |
|---|---|
| `h1` | `2rem` |
| `h2` | `1.5rem` |
| `h3` | `1.2rem` |
| `.prompt` | `1.75rem` |

### Body
- Base size `15px`, line-height `1.6`, color `--text-primary`.
- Small/secondary text `0.875rem` in `--text-secondary` (`.text-muted` helper).

### The "Prompt" Emphasis Pattern
When the app asks the user to do something (e.g., *"What's your **number**?"* or
*"Enter your **code**."*), wrap the most important part in `<strong>`/`<em>` so it renders in
**BD Megalona Extra Light, bold + italic**, colored `--purple-dark`.

```html
<p class="prompt">What's your <strong>number</strong>?</p>
```

---

## 4. Spacing, Radius & Elevation

| Token | Value | Usage |
|---|---|---|
| `--radius-sm` | `8px` | Inputs, buttons |
| `--radius` | `12px` | Cards, alerts |
| `--radius-lg` | `20px` | Large surfaces, modals |
| `--shadow` | `0 2px 12px rgba(0,0,0,.08)` | Resting cards |
| `--shadow-md` | `0 4px 24px rgba(0,0,0,.12)` | Hover / raised |
| `--shadow-lg` | `0 8px 40px rgba(0,0,0,.16)` | Modals, popovers |

Spacing follows a 4px rhythm (helpers like `.mt-4` = 16px). Default form-group gap is `18px`.

### Layout
| Token | Value | Usage |
|---|---|---|
| `--sidebar-width` | `68px` | Thin left icon rail |
| `--panel-width` | `280px` | Club / admin slide-out menu |

---

## 5. Buttons

Base class `.btn` (inline-flex, `12px 24px` padding, `--radius-sm`, `--font-body`).

| Class | Style | Usage |
|---|---|---|
| `.btn-primary` | `#038BFF` bg, white text | Primary / "Next" actions |
| `.btn-secondary` | Transparent, blue border & text | Secondary actions |
| `.btn-danger` | `--error` bg, white text | Destructive (reject, remove, delete) |
| `.btn-block` | Full width | Forms, mobile CTAs |

- Active state scales to `0.98` for tactile feedback.
- Primary hover deepens to `--accent-blue-hover` and adds a soft blue glow.
- **Always confirm destructive actions** (approve/reject, remove member, delete) before they run.

---

## 6. Forms

- Inputs span full width with `12px 16px` padding, `1.5px` border (`--border`), `--radius-sm`.
- **Focus:** border switches to `--accent-blue` with a `3px` blue focus ring
  (`box-shadow: 0 0 0 3px rgba(3,139,255,.15)`) — never remove the visible focus state.
- Labels: `0.875rem`, `--text-secondary`, `6px` below-margin.
- Placeholders use `--text-muted`.
- Password fields use `.input-wrapper` + `.input-eye-btn` for show/hide eye toggle.

### Form Behavior Rules
- Protect every form with a **CSRF token**.
- On validation error, **re-populate** the form so users never re-type valid data.
- Use **GET** for read-only requests, **POST** for anything that writes to the database.

---

## 7. Feedback: Flash & Alerts

Class `.flash` with modifier:
- `.flash--success` — green, left-border `--success`
- `.flash--error` — red, left-border `--error`
- `.flash--info` — blue, left-border `--info`

Announcement banners (Admin → Settings) use a coral gradient with a coral left border.

### Status Indicators
- `.status-success` (green) / `.status-failed` (red) for log rows.
- Use small uppercase pill/badge styling (`0.72–0.78rem`) for tags and statuses.

---

## 8. Layout & Navigation

- **Thin left icon rail** (`68px`): scrollable club photos, calendar, admin (admins only),
  and profile photo.
  - On **desktop**, calendar/admin/profile move to the top-right; the club list shows without scrolling.
- **Club menu / Admin menu** slide out at `280px` just right of the rail.
  - On desktop the club menu is always visible; on mobile it opens when a club icon is tapped.
- **Cards** float to fill horizontal space on desktop and stack vertically on mobile
  (e.g., calendar event cards grouped by bolded month header).

---

## 9. Responsive Design

- **Mobile-first.** Single breakpoint family around `768px` (and `500px` for tightening
  profile/detail grids).
- Touch targets stay comfortably large; hover-only affordances (`@media (hover: none)`)
  are always shown on touch devices.
- Auto-submitting code inputs and big, clear numeric entry on small screens.

---

## 10. Imagery

- Profile photos reference an `image_id`; render via `render_image.php?id=...`.
- Cache rendered images to `cache/` and emit the **cached URL** in the `<img>` tag when available
  (the `<img>` tag chooses the cached file or `render_image.php`, not the renderer hitting the cache).
- Profile photos are **circular**; users can zoom/drag to fit the bubble.
- Hero images are full-width banners on club and event pages.

---

## 11. Modals

Follow the separation-of-concerns pattern:
1. Modal HTML/JS lives in a UI manager class so the experience is consistent across pages.
2. Modal logic calls **dedicated AJAX endpoints** returning JSON (or HTML fragments), not the host page.
3. AJAX endpoints return **HTML fragments** for the affected section so the page can swap markup
   without a full reload; on error, surface the error string in an appropriate place.

Direct navigation actions (e.g., "Edit Event") should be plain links, not modals.

---

## 12. Accessibility & Quality

- Maintain sufficient contrast (dark text on white/light surfaces).
- Preserve visible focus rings on all interactive elements.
- Use real, descriptive labels for inputs and buttons.
- Never swallow errors — always surface a message the user can act on.

---

## 13. Cache-Busting

Append the file modification time as a query-string version on CSS/JS includes so updates
always propagate:

```php
<link rel="stylesheet" href="/public/css/app.css?v=<?= filemtime($cssPath) ?>">
```

---

## 14. Theming / Future Dark Mode

All colors live as `:root` custom properties. To re-theme or add Dark Mode, override the tokens
(e.g., under a `[data-theme="dark"]` selector) — component CSS never hard-codes brand colors.

