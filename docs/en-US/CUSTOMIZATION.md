# 🎨 Customizing the Infinity Theme

> Access the theme control panel to customize colors, font, and slideshow without editing any files.

## What is it

The Infinity configuration page lets you — the Jellyfin server administrator — customize the theme's appearance directly from the dashboard. Instead of editing CSS code manually, everything is in one place with visual color pickers and real-time preview.

You can:
- Change the **theme colors** (background, text, accent, cards, buttons, and more).
- Choose a **custom font** for the theme.
- Adjust the **slideshow behavior** on the home page.
- Choose **where the slideshow images come from** — random, recently added, or your own list.

## How to use

### Before you start

- You must have the Infinity theme installed on your Jellyfin.
- You must be logged in as **administrator** (the configuration page only appears for admins).

### Accessing the configuration page

1. In Jellyfin, open the **Dashboard**.
2. In the left sidebar, scroll down to the **Server** section.
3. Click **🎨 Infinity**.

The configuration page loads in place of the dashboard content.

### Customizing colors

The **🎨 Theme Colors** section shows 10 colors you can change:

| Color | What it affects |
|---|---|
| Page background | Overall background color of the theme |
| Text color | Main interface text |
| Accent color | Links, selections, progress bars |
| Card background | Background color of content blocks |
| Header background | Color of the top bar |
| Sidebar background | Color of the left menu |
| Button background | Background color of buttons |
| Warning color | Color for alert/danger actions |
| Selection border | Outline color when selecting items |
| Field background | Background color of inputs and text fields |

To change a color:
1. Click the **colored square** — your browser opens a visual color picker.
2. Choose the color you want.
3. Or type directly in the text field next to it (accepts formats like `#9400D3`, `rgb(148,0,211)`, `rgba(148,0,211,0.8)`).

> The change is applied **immediately** so you can see how it looks. Nothing is saved until you click **Save Settings**.

### Changing the font

In the **🔤 Custom Font** section:
1. Paste the URL of a `.woff` font file in the **Font URL** field. This can be an external link (e.g., Google Fonts) or a path inside your server (e.g., `/web/fonts/my-font.woff`).
2. In the **Font family name** field, type the font name (e.g., `Open Sans`).
3. Leave the URL blank to use the theme's default font (Kodchasan).

### Configuring the slideshow

In the **🖼️ Slideshow** section, you control the home page image carousel:

| Setting | What it does | Minimum | Maximum |
|---|---|---|---|
| Slide count | How many images rotate in the carousel | 1 | 100 |
| Interval (seconds) | Time between slide changes | 1 | 300 |
| Fade duration (ms) | Transition time between slides | 0 | 10,000 |
| Ken Burns duration (sec) | Zoom effect duration on images | 1 | 60 |

And three on/off options:
- **Hide logo** — Hides the media logo on the slide.
- **Show title** — Shows the media name as text.
- **Ken Burns animation** — Enables/disables the smooth zoom effect on images.

### Choosing the slide source

In the same section, below the controls, you choose **where the images come from**:

**🔀 Random** — Default. Picks random movies and series from your library.

**🆕 Recently Added** — Uses the most recent media, in order of addition. Great for highlighting what's new.

**📋 Manual List** — You define exactly which media appear. When you select this option, a text box appears for pasting IDs:
- One ID per line, or separated by commas.
- Invalid IDs are automatically ignored.
- Example:
  ```
  a1b2c3d4e5f6
  b2c3d4e5f6a1
  c3d4e5f6a1b2
  ```

> 💡 **How to find a media ID?** Go to the movie/series detail page. The ID appears at the end of the URL: `.../details?id=a1b2c3d4e5f6`.

### Saving or restoring

- **💾 Save Settings** — Saves all changes. They persist even if you restart the server or clear the cache.
- **🔄 Restore Defaults** — Returns all colors, font, and slideshow settings to the original Infinity theme values.

## Tips

- Use the real-time preview to experiment with colors before saving.
- If you don't like a change, click **Restore Defaults** to go back to the original theme.
- The configuration page is only visible to administrator accounts — regular users won't see it.
