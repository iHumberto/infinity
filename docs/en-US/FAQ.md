# ❓ Frequently Asked Questions

> Common questions about the Infinity theme for Jellyfin.

## Installation

### The theme isn't showing up. What should I check?

Make sure you completed all steps:

1. Did you add the code to `index.html` before `</head>`? Check that the file was saved.
2. Did you add the `@import` line to the Branding Custom CSS field and click Save?
3. Try clearing your browser cache (Ctrl+F5 or Cmd+Shift+R).
4. Open your browser's developer tools (F12) and check the **Console** tab for errors.

### Can I install Infinity without editing server files?

No. Infinity needs two things that require server access: adding code to `index.html` and adding a line to the Custom CSS field in Jellyfin's Branding settings. Both need administrator access.

### Do I need to install anything on my server?

No. Infinity loads entirely from the web (jsDelivr CDN). You don't need to download files, install packages, or run any scripts on your server. You only need to edit two configuration points in Jellyfin.

## Configuration

### Can I use the configuration page and Custom CSS at the same time?

No. The configuration page completely replaces the old method of configuring via Custom CSS. If you had `--infinity-*` variables in the Branding CSS field, they will be ignored — use the configuration page instead.

### Are settings saved per user?

No. Settings are saved in the browser (localStorage) and apply to everyone who accesses Jellyfin through that browser. To use the same settings on another computer, repeat the configuration there.

### What happens if I switch browsers or clear browser data?

Settings are saved in the browser's local storage. If you clear your browser data or use a different browser, the settings return to the defaults. Simply go to the configuration page again and reconfigure.

### Why didn't the colors or font change?

Check that you clicked **Save Settings** after making your changes. Real-time changes are only a preview — they only become permanent after saving.

## Slideshow

### The slideshow is showing the wrong images or no images.

Check the slide source setting on the configuration page:
- **Random**: picks from your library. Make sure you have media in your library.
- **Recently Added**: shows only recently added items. If you haven't added anything lately, it may show few or no items.
- **Manual List**: check that the IDs in `list.txt` are correct and the file is in the right folder.

### How many slides can the slideshow show?

Between 1 and 100. The default is 16. More slides use more browser memory — if the page feels slow, reduce the count.

### Can I turn off the slideshow?

To completely remove the slideshow, remove the slideshow-related lines from `index.html`:
- `<link rel="stylesheet" href="...slideshowpure.css">`
- `<script defer src="...slideshowpure.js"></script>`
- `<script src="...clickableSlideshow.js"></script>`

The rest of the theme will continue to work normally.

## Updates

### How do I update to the latest version?

Infinity loads from jsDelivr CDN using the `@main` branch. Updates are automatic — when a new version is released on the `main` branch, jsDelivr serves the new files. You may need to clear your browser cache (Ctrl+F5) to see changes immediately.

### Can I use a specific version instead of always getting the latest?

Yes. Instead of `@main` in the URLs, you can use a specific version tag like `@v1.0.1`. This freezes the theme at that version. However, this means you won't receive updates or fixes.

### How do I know when there's an update?

Check the project repository: [forgejo.humbertof.dev/Humberto/infinity](https://forgejo.humbertof.dev/Humberto/infinity/). New releases are tagged with version numbers.

## Troubleshooting

### The admin dashboard looks broken or unstyled.

Make sure the `dashboard.css` link is correctly placed in `index.html`. The admin panel styling is loaded separately from the main theme — if this link is missing or wrong, the admin pages won't have the theme applied.

### Some pages don't show the theme.

The main theme (`finity-complete.css`) is loaded through Jellyfin's Custom CSS field, which applies to most pages. However, the admin dashboard pages need the separate `dashboard.css` loaded from `index.html`. Make sure both are configured.

### The console shows errors about "marked" or "DOMPurify".

These are external libraries the slideshow needs. Make sure the `<script>` tags for `marked` and `dompurify` are placed **before** the `slideshowpure.js` tag in `index.html`. The order matters — the slideshow script depends on these libraries being loaded first.

### I'm getting a Content Security Policy (CSP) error.

If your Jellyfin has a custom CSP configuration, you may need to allow resources from:
- `https://cdn.jsdelivr.net` (for Infinity files)
- `https://fonts.googleapis.com` (if using Google Fonts)

Check your reverse proxy or Jellyfin configuration if you use CSP headers.
