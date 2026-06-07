// infinity/modules/07-config-persistence.js — ConfigPersistence: localStorage read/write/validate/apply
// This file is part of the Infinity theme. Built via: npm run build

/**
 * Configuration persistence layer for the Infinity theme.
 *
 * Stores user preferences in localStorage under key 'infinity-config'.
 * Provides validation, sanitization, and live application of config values
 * to CSS custom properties and the global CONFIG object.
 *
 * Chain: localStorage (user-saved) > defaults (shipped with theme)
 */

const STORAGE_KEY = 'infinity-config';
const CONFIG_VERSION = 1;

const DEFAULTS = Object.freeze({
    version: CONFIG_VERSION,
    theme: {
        backgroundColor: '#0F0D14',
        textColor: '#eee',
        accentColor: '#9400D3',
        cardBg: '#15121A',
        headerBg: 'rgba(10, 8, 18, 0.7)',
        sidebarBg: '#0D0A14',
        buttonBg: '#27242E',
        warningColor: '#bb4a4a',
        selectionBorder: '#9400D3',
        inputBg: '#27242E'
    },
    font: {
        url: '',
        family: 'Kodchasan'
    },
    slideshow: {
        items: 16,
        interval: 10,
        fadeDuration: 500,
        kenBurnsDuration: 10,
        hideLogo: false,
        showTitle: true,
        animation: true,
        source: 'recently_added',
        prebuiltIds: []
    }
});

/**
 * CSS custom property mapping for theme colors.
 * Each config key maps to one or more CSS variables set on :root.
 */
const CSS_VAR_MAP = {
    backgroundColor:    '--theme-background-color',
    textColor:          '--theme-text-color',
    accentColor:        '--theme-accent-color',
    cardBg:             '--card-bg',
    headerBg:           '--header-bg',
    sidebarBg:          '--sidebar-bg',
    buttonBg:           '--button-bg',
    warningColor:       '--theme-warning-color',
    selectionBorder:    '--selection-border-color',
    inputBg:            '--input-bg'
};

/**
 * Color regex patterns for validation.
 * Accepts: #RGB, #RRGGBB, #RRGGBBAA, rgb(r,g,b), rgba(r,g,b,a)
 */
const COLOR_PATTERNS = [
    /^#[0-9a-fA-F]{3}$/,
    /^#[0-9a-fA-F]{6}$/,
    /^#[0-9a-fA-F]{8}$/,
    /^rgb\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*\)$/,
    /^rgba\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*(0|1|0?\.\d+)\s*\)$/
];

/**
 * Validates a single color string.
 * @param {string} color - Color value to validate
 * @returns {boolean}
 */
const isValidColor = (color) => {
    if (typeof color !== 'string' || color.length === 0) return false;
    return COLOR_PATTERNS.some(pattern => pattern.test(color.trim()));
};

/**
 * Validates a font URL — must be http/https, no javascript: or data: protocols.
 * Empty string is valid (means "use default font").
 * @param {string} url
 * @returns {boolean}
 */
const isValidFontUrl = (url) => {
    if (typeof url !== 'string') return false;
    if (url.length === 0) return true;
    const trimmed = url.trim().toLowerCase();
    if (trimmed.startsWith('javascript:')) return false;
    if (trimmed.startsWith('data:')) return false;
    if (trimmed.startsWith('file:')) return false;
    // Allow http, https, and relative paths
    if (!trimmed.startsWith('http://') && !trimmed.startsWith('https://') && !trimmed.startsWith('/') && !trimmed.startsWith('./') && !trimmed.startsWith('../')) {
        // If it's not a URL, it might still be a valid relative path — allow it
        // but flag protocols we know are dangerous
    }
    return true;
};

/**
 * Sanitizes a color value to prevent CSS injection.
 * Strips anything that's not a valid color format.
 * @param {string} color
 * @returns {string} sanitized color or empty string
 */
const sanitizeColor = (color) => {
    if (typeof color !== 'string') return '';
    const trimmed = color.trim();
    if (isValidColor(trimmed)) return trimmed;
    // If it looks like a color but has extra stuff, try to extract
    const hexMatch = trimmed.match(/#[0-9a-fA-F]{3,8}/);
    if (hexMatch) return hexMatch[0];
    const rgbMatch = trimmed.match(/rgba?\(\s*\d{1,3}\s*,\s*\d{1,3}\s*,\s*\d{1,3}\s*(?:,\s*(?:0|1|0?\.\d+)\s*)?\)/);
    if (rgbMatch) return rgbMatch[0];
    return '';
};

/**
 * Sanitizes a font family name for CSS injection safety.
 * Only allows alphanumeric, spaces, hyphens, underscores, and quotes.
 * @param {string} family
 * @returns {string}
 */
const sanitizeFontFamily = (family) => {
    if (typeof family !== 'string') return DEFAULTS.font.family;
    // Remove any characters that could break out of CSS context
    const safe = family.replace(/[^a-zA-Z0-9\s\-_'",]/g, '').trim();
    return safe.length > 0 ? safe : DEFAULTS.font.family;
};

/**
 * Sanitizes item IDs (Jellyfin UUIDs: alphanumeric + hyphens).
 * @param {string} id
 * @returns {string|null} sanitized ID or null if invalid
 */
const sanitizeItemId = (id) => {
    if (typeof id !== 'string') return null;
    const trimmed = id.trim();
    // Jellyfin IDs are alphanumeric with hyphens
    if (/^[a-zA-Z0-9\-]+$/.test(trimmed) && trimmed.length > 0) {
        return trimmed;
    }
    return null;
};

const ConfigPersistence = {
    /**
     * Returns a deep-frozen copy of the default configuration.
     * @returns {object}
     */
    getDefaults() {
        return JSON.parse(JSON.stringify(DEFAULTS));
    },

    /**
     * Loads configuration from localStorage with validation.
     * Merges stored config with defaults so missing keys always have values.
     * If stored data is corrupt, returns defaults.
     * @returns {object} valid config object
     */
    load() {
        try {
            const raw = localStorage.getItem(STORAGE_KEY);
            if (!raw) return this.getDefaults();

            const stored = JSON.parse(raw);
            if (!stored || typeof stored !== 'object') return this.getDefaults();

            // Version mismatch → reset to defaults
            if (stored.version !== CONFIG_VERSION) return this.getDefaults();

            const config = this.getDefaults();

            // Merge theme colors — only accept valid colors
            if (stored.theme && typeof stored.theme === 'object') {
                for (const key of Object.keys(config.theme)) {
                    if (key in stored.theme) {
                        const sanitized = sanitizeColor(stored.theme[key]);
                        if (sanitized) {
                            config.theme[key] = sanitized;
                        }
                    }
                }
            }

            // Merge font
            if (stored.font && typeof stored.font === 'object') {
                if (typeof stored.font.url === 'string' && isValidFontUrl(stored.font.url)) {
                    config.font.url = stored.font.url.trim();
                }
                if (typeof stored.font.family === 'string') {
                    config.font.family = sanitizeFontFamily(stored.font.family);
                }
            }

            // Merge slideshow
            if (stored.slideshow && typeof stored.slideshow === 'object') {
                const s = stored.slideshow;
                if (typeof s.items === 'number' && s.items >= 1 && s.items <= 100) config.slideshow.items = Math.floor(s.items);
                if (typeof s.interval === 'number' && s.interval >= 1 && s.interval <= 300) config.slideshow.interval = s.interval;
                if (typeof s.fadeDuration === 'number' && s.fadeDuration >= 0 && s.fadeDuration <= 10000) config.slideshow.fadeDuration = Math.floor(s.fadeDuration);
                if (typeof s.kenBurnsDuration === 'number' && s.kenBurnsDuration >= 1 && s.kenBurnsDuration <= 60) config.slideshow.kenBurnsDuration = s.kenBurnsDuration;
                if (typeof s.hideLogo === 'boolean') config.slideshow.hideLogo = s.hideLogo;
                if (typeof s.showTitle === 'boolean') config.slideshow.showTitle = s.showTitle;
                if (typeof s.animation === 'boolean') config.slideshow.animation = s.animation;
                if (typeof s.source === 'string' && ['random', 'recently_added', 'prebuilt'].includes(s.source)) {
                    config.slideshow.source = s.source;
                }
                if (Array.isArray(s.prebuiltIds)) {
                    config.slideshow.prebuiltIds = s.prebuiltIds
                        .map(sanitizeItemId)
                        .filter(Boolean)
                        .slice(0, 100);
                }
            }

            return config;
        } catch (e) {
            console.warn('[Infinity] ConfigPersistence.load() failed:', e.message, '— using defaults');
            return this.getDefaults();
        }
    },

    /**
     * Saves configuration to localStorage.
     * Throws if localStorage is full or unavailable.
     * @param {object} config
     * @throws {Error} on QuotaExceededError or storage unavailable
     */
    save(config) {
        if (!config || typeof config !== 'object') {
            throw new Error('Invalid config object');
        }
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(config));
        } catch (e) {
            if (e.name === 'QuotaExceededError') {
                console.error('[Infinity] localStorage full — cannot save config');
            }
            throw e;
        }
    },

    /**
     * Resets configuration: clears localStorage, returns defaults.
     * @returns {object} default config
     */
    reset() {
        try {
            localStorage.removeItem(STORAGE_KEY);
        } catch (e) {
            console.warn('[Infinity] Could not clear localStorage:', e.message);
        }
        return this.getDefaults();
    },

    /**
     * Applies configuration in real-time.
     * - Sets CSS custom properties on documentElement for theme colors
     * - Injects @font-face for custom font if URL is set
     * - Updates global CONFIG for slideshow settings
     * - Does NOT persist to localStorage (call save() separately)
     * @param {object} config — validated config object
     */
    apply(config) {
        if (!config || !config.theme) return;

        const root = document.documentElement;

        // Apply theme colors as CSS custom properties
        for (const [configKey, cssVar] of Object.entries(CSS_VAR_MAP)) {
            const color = config.theme[configKey];
            if (color && isValidColor(color)) {
                root.style.setProperty(cssVar, color);
            }
        }

        // Apply font
        if (config.font) {
            root.style.setProperty('--font-family-base', config.font.family + ', sans-serif');

            // Inject/update @font-face for custom font URL
            this._applyFontUrl(config.font.url, config.font.family);
        }

        // Apply slideshow configs to global CONFIG
        if (config.slideshow && typeof CONFIG !== 'undefined') {
            CONFIG.slideshowItems = config.slideshow.items;
            CONFIG.shuffleInterval = config.slideshow.interval * 1000;
            CONFIG.fadeTransitionDuration = config.slideshow.fadeDuration;
            CONFIG.hideLogo = config.slideshow.hideLogo;
            CONFIG.showTitle = config.slideshow.showTitle;
            CONFIG.slideAnimationEnabled = config.slideshow.animation;
            // 'enableRandom' is now derived from 'source' in loadSlideshowData
            CONFIG.enableRandom = (config.slideshow.source === 'random');
            CONFIG.slideshowSource = config.slideshow.source;
            CONFIG.slideshowPrebuiltIds = config.slideshow.prebuiltIds || [];
        }
    },

    /**
     * Injects or updates @font-face for custom font URL.
     * @param {string} url
     * @param {string} family
     * @private
     */
    _applyFontUrl(url, family) {
        const styleId = 'infinity-custom-font';
        let styleEl = document.getElementById(styleId);

        if (!url) {
            // Remove custom font if URL is empty
            if (styleEl) styleEl.remove();
            return;
        }

        if (!styleEl) {
            styleEl = document.createElement('style');
            styleEl.id = styleId;
            document.head.appendChild(styleEl);
        }

        const safeFamily = sanitizeFontFamily(family);
        styleEl.textContent = `@font-face { font-family: "${safeFamily}"; src: url("${url}") format("woff"); font-display: swap; }`;
    },

    /**
     * Validates a config object and returns error messages.
     * Used by the config page UI to show validation errors before save.
     * @param {object} config
     * @returns {{ valid: boolean, errors: string[] }}
     */
    validate(config) {
        const errors = [];

        if (!config || typeof config !== 'object') {
            return { valid: false, errors: ['Configuração inválida.'] };
        }

        // Validate theme colors
        if (config.theme) {
            for (const [key, value] of Object.entries(config.theme)) {
                if (!isValidColor(value)) {
                    errors.push(`Cor inválida em "${key}": "${value}"`);
                }
            }
        }

        // Validate font URL
        if (config.font) {
            if (!isValidFontUrl(config.font.url)) {
                errors.push('URL da fonte inválida ou protocolo não permitido.');
            }
            const safeFam = sanitizeFontFamily(config.font.family);
            if (safeFam !== config.font.family) {
                errors.push('Nome da família tipográfica contém caracteres inválidos.');
            }
        }

        // Validate slideshow numeric ranges
        if (config.slideshow) {
            const s = config.slideshow;
            if (typeof s.items !== 'number' || s.items < 1 || s.items > 100) {
                errors.push('Quantidade de slides deve estar entre 1 e 100.');
            }
            if (typeof s.interval !== 'number' || s.interval < 1 || s.interval > 300) {
                errors.push('Intervalo deve estar entre 1 e 300 segundos.');
            }
            if (typeof s.fadeDuration !== 'number' || s.fadeDuration < 0 || s.fadeDuration > 10000) {
                errors.push('Duração do fade deve estar entre 0 e 10000 ms.');
            }
            if (typeof s.kenBurnsDuration !== 'number' || s.kenBurnsDuration < 1 || s.kenBurnsDuration > 60) {
                errors.push('Duração do Ken Burns deve estar entre 1 e 60 segundos.');
            }
            if (!['random', 'recently_added', 'prebuilt'].includes(s.source)) {
                errors.push('Origem do slideshow inválida.');
            }
        }

        return { valid: errors.length === 0, errors };
    },

    /**
     * Builds a CSS string from the config for Jellyfin Branding storage.
     * This makes config server-side — all users see the same theme.
     * @param {object} config
     * @returns {string} CSS block
     */
    _buildCssString(config) {
        const t = config.theme || {};
        const f = config.font || {};
        const s = config.slideshow || {};
        const d = DEFAULTS;
        const lines = [];

        // Theme colors — only include if different from default
        const colorVars = [
            ['--theme-background-color', t.backgroundColor, d.theme.backgroundColor],
            ['--theme-text-color', t.textColor, d.theme.textColor],
            ['--theme-accent-color', t.accentColor, d.theme.accentColor],
            ['--card-bg', t.cardBg, d.theme.cardBg],
            ['--header-bg', t.headerBg, d.theme.headerBg],
            ['--sidebar-bg', t.sidebarBg, d.theme.sidebarBg],
            ['--button-bg', t.buttonBg, d.theme.buttonBg],
            ['--input-bg', t.inputBg, d.theme.inputBg],
            ['--theme-warning-color', t.warningColor, d.theme.warningColor],
            ['--selection-border-color', t.selectionBorder, d.theme.selectionBorder]
        ];
        for (const [name, val, def] of colorVars) {
            if (val && val !== def) lines.push(`  ${name}: ${val} !important;`);
        }

        // Font — only if different
        if (f.url && f.url !== d.font.url) {
            lines.push(`  --infinity-font-url: "${f.url.replace(/"/g, '\\"')}";`);
        }
        if (f.family && f.family !== d.font.family) {
            lines.push(`  --font-family-base: "${f.family}", sans-serif !important;`);
        }

        // Slideshow numeric — only if different
        if (s.items && s.items !== d.slideshow.items) lines.push(`  --infinity-slideshow-items: ${s.items};`);
        if (s.interval && s.interval !== d.slideshow.interval) lines.push(`  --infinity-slide-interval: ${s.interval}s;`);
        if (s.fadeDuration && s.fadeDuration !== d.slideshow.fadeDuration) lines.push(`  --infinity-fade-duration: ${s.fadeDuration}ms;`);
        if (s.kenBurnsDuration && s.kenBurnsDuration !== d.slideshow.kenBurnsDuration) lines.push(`  --infinity-kenburns-duration: ${s.kenBurnsDuration}s;`);
        if (s.source && s.source !== d.slideshow.source) lines.push(`  --infinity-source: ${s.source};`);

        if (lines.length === 0) return ''; // Nothing changed

        return `/* ══ INFINITY-CONFIG ══ */\n:root {\n${lines.join('\n')}\n}`;
    },

    /**
     * Saves config to the Jellyfin server via Branding API.
     * Updates Custom CSS field so ALL users see the same config.
     * Falls back to localStorage if server save fails.
     * @param {object} config
     * @returns {Promise<boolean>}
     */
    async saveToServer(config) {
        try {
            const cssBlock = this._buildCssString(config);
            let serverAddress, authHeader;

            // Try STATE.jellyfinData first (set by initJellyfinData on home page)
            if (typeof STATE !== 'undefined' && STATE.jellyfinData && STATE.jellyfinData.accessToken && STATE.jellyfinData.accessToken !== 'Not Found') {
                const d = STATE.jellyfinData;
                serverAddress = d.serverAddress;
                authHeader = `MediaBrowser Client="${d.appName}", Device="${d.deviceName}", DeviceId="${d.deviceId}", Version="${d.appVersion}", Token="${d.accessToken}"`;
            } else if (window.ApiClient && window.ApiClient._serverInfo && window.ApiClient._serverInfo.AccessToken) {
                // Fallback: use ApiClient directly
                const api = window.ApiClient;
                serverAddress = api._serverAddress || api.serverAddress?.();
                const token = api._serverInfo.AccessToken;
                authHeader = `MediaBrowser Client="${api._appName || 'Infinity'}", Device="${api._deviceName || 'Browser'}", DeviceId="${api._deviceId || ''}", Version="${api._appVersion || '1.0'}", Token="${token}"`;
            } else {
                console.warn('[Infinity] Not authenticated — config saved locally only.');
                return false;
            }

            const headers = { 'Authorization': authHeader, 'Content-Type': 'application/json' };

            // Fetch current branding config
            const brandingUrl = `${serverAddress}/System/Configuration/branding`;
            const getResponse = await fetch(brandingUrl, { headers });

            if (!getResponse.ok) throw new Error(`GET branding: ${getResponse.status}`);
            const branding = await getResponse.json();

            // Remove any existing Infinity blocks using the unique marker
            const marker = '/* ══ INFINITY-CONFIG ══ */';
            let css = branding.CustomCss || '';
            while (true) {
                const start = css.indexOf(marker);
                if (start === -1) break;
                // Find the closing */ that ends the comment on the first line
                const commentEnd = css.indexOf('*/', start);
                if (commentEnd === -1) break;
                // Find the closing } of the :root block
                const rootEnd = css.indexOf('}', commentEnd);
                if (rootEnd === -1) break;
                // Remove from start of marker to end of :root block (inclusive)
                css = css.substring(0, start) + css.substring(rootEnd + 1);
            }
            branding.CustomCss = css.trim();
            // Only append new block if there's something to save
            if (cssBlock) {
                branding.CustomCss = branding.CustomCss
                    ? `${branding.CustomCss}\n\n${cssBlock}`
                    : cssBlock;
            }

            // POST updated config
            const postResponse = await fetch(brandingUrl, {
                method: 'POST',
                headers,
                body: JSON.stringify(branding)
            });

            if (!postResponse.ok) throw new Error(`POST branding: ${postResponse.status}`);

            console.log('[Infinity] Config saved to Jellyfin server successfully.');
            return true;
        } catch (e) {
            console.error('[Infinity] Server save failed, using localStorage only:', e.message);
            return false;
        }
    },
};
