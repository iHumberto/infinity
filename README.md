🇧🇷 [Read in Portuguese](README.pt-BR.md)

![Project Stage][Static-Badge]
![Maintenance][maintenance-shield]
![License][license-shield]
<a href="https://forgejo.humbertof.dev/Humberto/infinity/">![Repository][repo-shield]</a>
![Tests][tests-shield]

# Infinity — Theme for Jellyfin

> Custom dark/purple theme for Jellyfin Media Server. Based on [Finity](https://github.com/prism2001/finity) by prism2001. Includes interactive slideshow on the home page, admin dashboard theme, and clickable navigation.

## ✨ Features

- **Dark/purple theme** with ~50 customizable CSS variables
- **Interactive slideshow** on the home page with Ken Burns effect
- **Clickable navigation** — slideshow items and episode titles are clickable
- **Admin dashboard theme** — custom styling for the Jellyfin control panel
- **Theme configuration page** — change colors, font, and slideshow settings without editing code
- **Markdown support** in media plots via Marked.js + DOMPurify (XSS-safe)

## 🚀 Quick Install

See the full guide: [docs/en-US/USAGE.md](docs/en-US/USAGE.md)

**1. In Jellyfin's `index.html`** (before `</head>`):

```html
<!-- Dashboard styles (admin/config pages) -->
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/dashboard.css">

<!-- Slideshow dependencies + scripts -->
<script src="https://cdn.jsdelivr.net/npm/marked@15.0.11/marked.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/dompurify@3.2.5/dist/purify.min.js"></script>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/slideshowpure.css">
<script defer src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/slideshowpure.js"></script>
<script async src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableTitles.js"></script>
<script src="https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/js/clickableSlideshow.js"></script>
```

**2. In Branding Custom CSS** (Dashboard > General > Branding):

```css
@import url('https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/finity-complete.css');
```

**3.** Place a `list.txt` file in the same folder as `index.html` with media IDs (one per line, max 16).

## 🎨 Customization

See the full guide: [docs/en-US/CUSTOMIZATION.md](docs/en-US/CUSTOMIZATION.md)

The theme configuration page allows you to customize:
- **Colors** — background, text, accent, cards, buttons, and more (10 colors)
- **Font** — choose any `.woff` font
- **Slideshow** — slide count, interval, fade duration, Ken Burns animation
- **Slide source** — random, recently added, or manual list

## 🌿 Branch Model

| Branch | Purpose | CDN | Badge |
|--------|---------|-----|-------|
| `main` | Production — stable and tested code | ✅ `@main` | "Production Ready" |
| `dev` | Development — unstable code | ❌ | "Status: developing" |

> ⚠️ **This is the `dev` (development) branch.** The code here may be unstable, broken, or incomplete. **Do not use in production.** For the stable version, go to the [`main`](https://forgejo.humbertof.dev/Humberto/infinity/src/branch/main/) branch.

## 📚 Documentation

- [Usage Guide](docs/en-US/USAGE.md) — how to install and use the theme
- [Customization Guide](docs/en-US/CUSTOMIZATION.md) — how to customize colors, fonts, and slideshow
- [FAQ](docs/en-US/FAQ.md) — frequently asked questions

## 📄 License

This project is licensed under the [GNU GPL v3](LICENSE).

[maintenance-shield]: https://img.shields.io/maintenance/yes/2026.svg
[Static-Badge]: https://img.shields.io/badge/Status-developing-blue?logo=Forgejo
[repo-shield]: https://img.shields.io/badge/forgejo-repo-brightgreen?logo=forgejo
[license-shield]: https://img.shields.io/badge/License-GNU_GPL_v3-brightgreen?style=flat&logo=gnuprivacyguard
[tests-shield]: https://github.com/iHumberto/infinity/actions/workflows/test.yml/badge.svg
