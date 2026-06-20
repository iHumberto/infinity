# 🚀 How to Install and Use Infinity

> A step-by-step guide to install the Infinity theme on your Jellyfin server.

## What is Infinity

Infinity is a custom theme that changes how your Jellyfin looks. It gives you a dark purple design, an animated slideshow on the home page, and a matching style for the admin panel. Everything is loaded from the web — you don't need to download or install anything on your server.

## Before you start

- You need access to the Jellyfin server files. This usually means access to the machine where Jellyfin is installed.
- You need to be able to edit the `index.html` file inside Jellyfin's web folder.
- You need administrator access to Jellyfin's dashboard.

## Installation

### Step 1: Find the web folder

The Jellyfin web folder location depends on how you installed Jellyfin:

| Installation method | Web folder path |
|---|---|
| Docker (linuxserver/jellyfin) | `/usr/share/jellyfin/web/` inside the container |
| Docker (jellyfin/jellyfin) | `/jellyfin/jellyfin-web/` inside the container |
| Linux native | `/usr/share/jellyfin/web/` |
| Windows | `C:\Program Files\Jellyfin\Server\jellyfin-web\` |

### Step 2: Edit index.html

Open the `index.html` file inside the web folder. Find the line `</head>` near the top of the file.

Add this code **just before** `</head>`:

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

Save the file.

### Step 3: Add the main theme CSS

1. Open the Jellyfin dashboard in your browser.
2. Go to **Dashboard** > **General**.
3. Scroll down to the **Branding** section.
4. Find the **Custom CSS** field.
5. Paste this line:

```css
@import url('https://cdn.jsdelivr.net/gh/iHumberto/infinity@main/css/finity-complete.css');
```

6. Click **Save** at the bottom of the page.

### Step 4 (optional): Set up the slideshow list

If you want to control exactly which media appears in the home page slideshow:

1. In the same folder as `index.html`, create a file called `list.txt`.
2. Add the IDs of the media you want to show — one ID per line. Example:

```
a1b2c3d4e5f6
b2c3d4e5f6a1
c3d4e5f6a1b2
```

> 💡 **How to find a media ID?** Open the movie or series detail page in Jellyfin. Look at the URL in your browser's address bar. The ID is the last part, after `?id=`. Example: `.../details?id=a1b2c3d4e5f6` — the ID is `a1b2c3d4e5f6`.

- Maximum 16 items.
- If you don't create this file, the slideshow picks random media from your library.

### Step 5: Verify

1. Open your Jellyfin in a new browser tab.
2. You should see the new dark purple theme on the home page.
3. Go to the Dashboard — the admin panel should also have the new style.
4. On the home page, you should see the slideshow with images.

## What to expect

- After installation, your Jellyfin will have a dark purple theme everywhere — home page, movie details, series pages, and the admin panel.
- The home page will show an animated slideshow with images from your library.
- You can click on slideshow items and episode titles to navigate.
- The theme works alongside Jellyfin's built-in features — nothing is removed.

## Switching between branches

The URLs above use `@main` which points to the stable, production-ready version. If you want to test new features (unstable), you can change `@main` to `@dev` in all URLs. **Not recommended for daily use.**

## Need help?

See the [FAQ](FAQ.md) for answers to common questions, or the [Customization Guide](CUSTOMIZATION.md) to learn how to personalize the theme.
