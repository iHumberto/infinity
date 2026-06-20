🇧🇷 [Leia em Português](README.pt-BR.md)

<div align="center">

![Project Stage][Static-Badge]
![Maintenance][maintenance-shield]
![License][license-shield]
<a href="https://forgejo.humbertof.dev/Humberto/infinity/">![Repository][repo-shield]</a>
![Tests][tests-shield]
</div>

# Infinity

Custom theme for Jellyfin, based on [Finity](https://github.com/prism2001/finity) by prism2001.

## What's different from Finity

### 🎨 Color Theme — Dark Purple

Entire palette rebuilt with purple `#9400D3` as the primary color:

- Page background with purple undertone (`#9400D3`)
- Cards, header, sidebar, and buttons in dark purple tones
- Progress bar, list hover, and scrollbar in purple
- Multi-select border in purple
- Selection checkbox with purple background and white checkmark
- Button hover with transparent purple (no longer solid black)
- Play button with purple fade on hover
- Slideshow backdrop gradient in purple tones

### 🖱️ Hover and Focus Visual Feedback

- Purple border around cards on mouse hover
- Purple border when navigating with remote control/keyboard (`.focused`)
- List items get a subtle purple outline + background on hover

### 📐 Layout and Detail Pages

- Backdrop spans 100% width (`--detail-page-backdrop-width: 100vw`, offset 0)
- Side mask with solid dark gradient (no blur) for text readability
- Mask covers the text area (60vw)
- Seasons in horizontal slider occupying 94% of the screen
- Episodes in a grid with 94% width, navigable via arrows and touch
- Font changed to **Kodchasan**

### 🎬 Slideshow

- 16 items (original: 8)
- Clickable slides — navigate to the item's detail page
- Clickable episode titles in grid view
- Interval synchronized with Ken Burns animation (10s)
- `will-change` on animated elements for GPU acceleration
- Fixed position indicator dots
- Fixed timer initialization

### 🖥️ Dashboard and Admin Pages

The theme also styles the admin Dashboard (pages that Branding Custom CSS cannot reach), using a separate file (`dashboard.css` loaded in `index.html`):

- Dark purple background on all admin pages
- **Sidebar**: opaque purple background (`#0D0A14`), pill-shaped navigation items, white text, purple hover with preserved text, spacing between sections
- **Cards and panels**: rounded corners (15px), dark background (`#15121A`), consistent with Home page cards
- **Typography**: Kodchasan font in all MUI components (Typography, Button, Input, ListItem, Tab, Chip, Select, etc.)
- **Forms**: inputs, selects, textareas with dark background and purple focus
- **Buttons**: pill shape on all buttons (default, submit, warning, outlined, text)
- **Plugin pages, metadata manager, and configuration pages** share the same visual theme

> See the [Installation](#installation) section to set up `dashboard.css` correctly.

## Installation

Infinity uses **two CSS files** with different responsibilities:

| File | Where to load | Pages affected |
|---|---|---|
| `finity-complete.css` | Dashboard > General > Branding > Custom CSS | Home, details, lists, player (user-facing pages) |
| `dashboard.css` | In the `<head>` of `index.html` | Dashboard, admin, settings, plugins |

> The Branding Custom CSS field does **not** inject CSS into Jellyfin's admin/dashboard pages — that's why `dashboard.css` must go in `index.html`.

### 1. Index.html

Paste at the end of `<head>` in Jellyfin's `index.html` (before `</head>`):

```html
<!-- Infinity — Dashboard styles (admin/config pages) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/dashboard.css">

<!-- Infinity — Slideshow (home page) -->
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.11/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.5/dist/purify.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/slideshowpure.css">
<script defer src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/slideshowpure.js"></script>
<script async src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableTitles.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableSlideshow.js"></script>
```

### 2. Custom CSS (Branding)

In Jellyfin, go to **Dashboard > General > Branding** and paste in the **Custom CSS** field:

```css
@import url('https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/finity-complete.css');
```

> **Important:** `finity-complete.css` must be loaded ONLY via the Custom CSS field, **not** in `index.html`.

### 3. Slideshow Configuration

Starting from v1.1.0, the slideshow is configured directly through the Jellyfin interface. Go to **Dashboard > Plugins > Infinity** and choose:

- **Random**: selects random movies and series from your library
- **Recently Added**: uses the most recent media (shuffled display order)
- **Manual List**: paste media IDs that should appear in the slideshow

> The old `list.txt` file is no longer needed. All slideshow settings (item count, interval, animations) are configured on the Infinity page in the control panel.

👉 [Full configuration guide](docs/en-US/CUSTOMIZATION.md)

## 💡 Docker Tip

Create a `custom` folder next to your `docker-compose.yaml` and mount the files:

```
- ./custom/index.html:/jellyfin/jellyfin-web/index.html
- ./custom/list.txt:/jellyfin/jellyfin-web/list.txt
```

<img src="screenshots/Screenshot_07.png" title="Directory tip" width="auto"/>

## ⚙️ Customization

Starting from v1.1.0, colors, font, and slideshow behavior are configured directly through the Jellyfin interface — no manual CSS editing needed.

Go to **Dashboard > Plugins > Infinity** to:

- 🎨 **Theme colors** — 10 color pickers with real-time preview (hex, rgb, rgba)
- 🔤 **Custom font** — `.woff` file URL and font family name
- 🖼️ **Slideshow** — slide count, interval, fade, Ken Burns animation
- 📋 **Slide source** — random, recently added, or manual ID list

👉 [Full configuration guide](docs/en-US/CUSTOMIZATION.md)

> The `--infinity-*` CSS variables used in previous versions have been deprecated. All configuration is now done on the panel page.

## Screenshots

<div align="center">

<img src="screenshots/Screenshot_01.png" title="Home - slideshow 01" width="75%"/>
<img src="screenshots/Screenshot_02.png" title="Home - slideshow 02" width="75%"/></br>
<img src="screenshots/Screenshot_03.png" title="Home - Continue Watching, Next, Recent Movies" width="75%"/>
<img src="screenshots/Screenshot_10.png" title="Home - New colors selection mode" width="75%"/>
<img src="screenshots/Screenshot_04.png" title="Movie page" width="75%"/></br>
<img src="screenshots/Screenshot_05.png" title="New series page, with slide seasons" width="75%"/>
<img src="screenshots/Screenshot_08.png" title="New series page, with bigger grid episodes" width="75%"/>
<img src="screenshots/Screenshot_09.png" title="New Admin dashboard" width="75%"/>
</div>

## 📚 Documentation

- [Usage Guide](docs/en-US/USAGE.md) — how to install and use the theme
- [Customization Guide](docs/en-US/CUSTOMIZATION.md) — how to customize colors, fonts, and slideshow
- [FAQ](docs/en-US/FAQ.md) — frequently asked questions

## License

This project is licensed under the [GNU GPL v3](LICENSE).

[maintenance-shield]: https://img.shields.io/maintenance/yes/2026.svg
[Static-Badge]: https://img.shields.io/badge/production-Ready-brightgreen?logo=Forgejo
[repo-shield]: https://img.shields.io/badge/forgejo-repo-brightgreen?logo=forgejo
[license-shield]: https://img.shields.io/badge/License-GNU_GPL_v3-brightgreen?style=flat&logo=gnuprivacyguard
[tests-shield]: https://github.com/iHumberto/infinity/actions/workflows/test.yml/badge.svg
