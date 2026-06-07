// infinity/modules/08-config-page.js — ConfigPage: menu injection + configuration page UI
// This file is part of the Infinity theme. Built via: npm run build

/**
 * Dashboard configuration page for the Infinity theme.
 *
 * Injects a menu item "Infinity" into the Jellyfin dashboard sidebar
 * (under the "Servidor" section) and renders a full configuration
 * page with color pickers, font URL, and slideshow settings.
 *
 * Uses ConfigPersistence (module 08) for storage and live preview.
 */

const ConfigPage = {
    _menuInjected: false,
    _menuObserver: null,
    _pageVisible: false,
    _originalContent: null,
    _currentConfig: null,
    _injectedFontStyleId: 'infinity-custom-font',

    /**
     * Color fields definition for the config page.
     * Each entry maps a config key to a display label.
     */
    COLOR_FIELDS: [
        { key: 'backgroundColor',   label: 'Fundo da página',       cssVar: '--theme-background-color' },
        { key: 'textColor',         label: 'Cor do texto',          cssVar: '--theme-text-color' },
        { key: 'accentColor',       label: 'Cor de destaque',       cssVar: '--theme-accent-color' },
        { key: 'cardBg',            label: 'Fundo dos cards',       cssVar: '--card-bg' },
        { key: 'headerBg',          label: 'Fundo do header',       cssVar: '--header-bg' },
        { key: 'sidebarBg',         label: 'Fundo da sidebar',      cssVar: '--sidebar-bg' },
        { key: 'buttonBg',          label: 'Fundo dos botões',      cssVar: '--button-bg' },
        { key: 'warningColor',      label: 'Cor de aviso',          cssVar: '--theme-warning-color' },
        { key: 'selectionBorder',   label: 'Borda de seleção',      cssVar: '--selection-border-color' },
        { key: 'inputBg',           label: 'Fundo dos campos',      cssVar: '--input-bg' }
    ],

    /**
     * Initializes the config page system.
     * Starts observing the DOM for the dashboard sidebar.
     * Safe to call multiple times — idempotent.
     */
    init() {
        if (this._menuObserver) return; // Already observing

        console.log('[Infinity] ConfigPage.init() — starting dashboard observer. Hash:', window.location.hash);
        this._observeDashboard();
    },

    /**
     * Observes the DOM for the dashboard sidebar to appear.
     * Handles both MUI (10.10+) and legacy (10.8/10.9) selectors.
     * Re-injects menu on SPA navigation.
     */
    _observeDashboard() {
        // Try immediate injection first
        this._injectMenu();

        // Also listen for hash changes (SPA navigation)
        window.addEventListener('hashchange', () => {
            console.log('[Infinity] hashchange detected:', window.location.hash);
            setTimeout(() => this._injectMenu(), 200);
        });

        // Then observe for changes (SPA navigation recreates DOM)
        this._menuObserver = new MutationObserver(() => {
            this._injectMenu();
        });

        this._menuObserver.observe(document.body, {
            childList: true,
            subtree: true
        });
    },

    /**
     * Finds the dashboard sidebar and injects the "Infinity" menu item
     * under the "Servidor" section.
     * Idempotent — won't create duplicate menu items.
     */

    /**
     * Finds the dashboard sidebar and injects the "Infinity" menu item.
     * React-resistant — re-injects if React removes our element.
     */
    _injectMenu() {
        const hash = window.location.hash;

        if (!this._isDashboardRoute()) {
            if (!this._loggedNotDashboard) {
                console.log('[Infinity] _injectMenu: not dashboard route. Hash:', hash);
                this._loggedNotDashboard = true;
                setTimeout(() => { this._loggedNotDashboard = false; }, 5000);
            }
            return;
        }
        this._loggedNotDashboard = false;

        // React may remove our injected element — re-inject if needed
        const existing = document.getElementById('infinity-config-menu-item');
        if (existing && existing.parentNode) return;

        // Find "Plugins" item (always present in dashboard sidebar)
        const insertAfter = this._findSidebarItem('Plugins') ||
                            this._findSidebarItem('Geral') ||
                            this._findSidebarItem('General') ||
                            this._findSidebarItem('Dashboard');
        if (!insertAfter) return; // Sidebar not ready, observer will retry

        console.log('[Infinity] ConfigPage: inserting after:', insertAfter.textContent.trim());

        const menuItem = this._buildMenuItem();
        insertAfter.insertAdjacentElement('afterend', menuItem);
        console.log('[Infinity] ConfigPage: menu item "Infinity" injected.');
    },

    /**
     * Finds a sidebar menu item by its exact text content.
     * @param {string} text
     * @returns {Element|null}
     */
    _findSidebarItem(text) {
        // Search within drawer containers first
        const containers = document.querySelectorAll('.MuiDrawer-root, .MuiDrawer-paper, .mainDrawer');
        for (const c of containers) {
            const items = c.querySelectorAll('a, [role="button"], .MuiListItem-root, .MuiListItemButton-root');
            for (const item of items) {
                if (item.textContent.trim() === text) return item;
            }
        }
        // Fallback: search entire document
        const all = document.querySelectorAll('a, [role="button"], .MuiListItem-root, .MuiListItemButton-root');
        for (const item of all) {
            if (item.textContent.trim() === text) return item;
        }
        return null;
    },

    _isDashboardRoute() {
        const hash = window.location.hash;
        return hash.includes("/dashboard") || hash.includes("dashboard.html") || hash.includes("configurationpage");
    },

    /**
     * Builds the menu item by CLONING an existing sidebar item.
     * This preserves MUI's CSS-in-JS generated styles (Emotion class names).
     * @returns {Element}
     */
    _buildMenuItem() {
        // Find any existing sidebar item to use as a template for cloning
        // This ensures we inherit MUI's generated CSS classes (CSS-in-JS)
        const template = document.querySelector('.MuiDrawer-root a, .MuiDrawer-paper a, .mainDrawer a, [class*="MuiListItemButton"]');
        if (!template) {
            // Last resort: create from scratch with inline styles
            console.warn('[Infinity] No sidebar template found — creating item with inline styles.');
            return this._buildMenuItemFallback();
        }

        // Deep-clone the template to preserve all attributes and structure
        const menuItem = template.cloneNode(true);
        menuItem.id = 'infinity-config-menu-item';
        menuItem.href = '#';
        menuItem.removeAttribute('href'); // Remove navigation
        menuItem.setAttribute('tabindex', '0');

        // Replace inner content: icon + text
        const iconEl = menuItem.querySelector('.MuiListItemIcon-root, .material-icons, svg');
        const textEl = menuItem.querySelector('.MuiListItemText-root span, .MuiTypography-root, span');

        if (iconEl) {
            // Replace icon with palette icon
            if (iconEl.classList.contains('material-icons')) {
                iconEl.textContent = 'palette';
            } else {
                iconEl.innerHTML = '<span class="material-icons" style="font-size:20px;">palette</span>';
            }
        }

        if (textEl) {
            textEl.textContent = 'Infinity';
        } else {
            // Try to find any text container
            const anyText = menuItem.querySelector('[class*="MuiListItemText"]');
            if (anyText) {
                anyText.textContent = 'Infinity';
            }
        }

        // Capture phase + stopImmediatePropagation to beat React's event delegation
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            this._showConfigPage();
        }, { capture: true });

        return menuItem;
    },

    /**
     * Fallback: creates menu item from scratch with inline styles.
     * Used when no sidebar template is available for cloning.
     * @returns {Element}
     */
    _buildMenuItemFallback() {
        const menuItem = document.createElement('a');
        menuItem.id = 'infinity-config-menu-item';
        menuItem.href = '#';
        menuItem.style.cssText = 'display:flex; align-items:center; padding:8px 16px; margin:2px 8px; border-radius:4em; color:#eee; text-decoration:none; cursor:pointer;';
        menuItem.innerHTML = `
            <span class="material-icons" style="font-size:20px; margin-right:12px;">palette</span>
            <span style="font-size:0.9rem;">Infinity</span>
        `;
        menuItem.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            e.stopImmediatePropagation();
            this._showConfigPage();
        }, { capture: true });
        return menuItem;
    },


    /**
     * Shows the configuration page, replacing dashboard content.
     */
    _showConfigPage() {
        if (this._pageVisible) return;

        console.log('[Infinity] _showConfigPage() called. Hash:', window.location.hash);

        // Find dashboard content container — try multiple selectors for Jellyfin 10.10+
        const contentArea =
            document.querySelector('.dashboardDocument .MuiContainer-root') ||
            document.querySelector('.dashboardContent') ||
            document.getElementById('dashboardContent') ||
            document.querySelector('[class*="dashboardContent"]') ||
            document.querySelector('.adminContent') ||
            document.querySelector('.skinBody') ||
            document.querySelector('#main') ||
            document.querySelector('main');

        if (!contentArea) {
            console.error('[Infinity] Cannot find dashboard content area. Available containers:',
                [...document.querySelectorAll('[class*="dashboard"], [class*="content"], [class*="admin"], main')]
                    .map(el => el.className || el.tagName));
            return;
        }

        console.log('[Infinity] Content area found:', contentArea.className || contentArea.id || contentArea.tagName);

        // Save reference to original content for restoration
        if (!this._originalContent) {
            this._originalContent = contentArea.innerHTML;
        }

        // Load current config
        this._currentConfig = ConfigPersistence.load();

        // Render the config page
        contentArea.innerHTML = this._renderPage();

        // Bind events
        this._bindColorPickers();
        this._bindSlideshowControls();
        this._bindSourceSelector();
        this._bindButtons();

        // Apply live preview
        ConfigPersistence.apply(this._currentConfig);

        this._pageVisible = true;
        console.log('[Infinity] Configuration page rendered.');
    },

    /**
     * Hides the config page and restores original dashboard content.
     */
    _hideConfigPage() {
        if (!this._pageVisible) return;

        const contentArea = document.querySelector('.dashboardContent') ||
                            document.getElementById('dashboardContent') ||
                            document.querySelector('.adminContent') ||
                            document.querySelector('.skinBody');

        if (contentArea && this._originalContent !== null) {
            contentArea.innerHTML = this._originalContent;
        }

        this._pageVisible = false;
    },

    /**
     * Renders the full configuration page HTML.
     * @returns {string} HTML string
     */
    _renderPage() {
        const c = this._currentConfig;
        const t = c.theme;
        const f = c.font;
        const s = c.slideshow;

        // Color fields HTML
        const colorFields = this.COLOR_FIELDS.map(field => {
            const value = t[field.key] || '';
            return `
                <div class="infinity-color-field" style="margin-bottom:12px;">
                    <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;">
                        ${field.label}
                    </label>
                    <div style="display:flex; align-items:center; gap:8px;">
                        <input type="color"
                               value="${this._toHexForPicker(value)}"
                               data-config-key="${field.key}"
                               class="infinity-color-picker"
                               style="width:36px; height:36px; border:none; border-radius:0.5rem; cursor:pointer; background:none; padding:0;"
                               title="Seletor de cor">
                        <input type="text"
                               value="${this._escapeHtml(value)}"
                               data-config-key="${field.key}"
                               class="infinity-color-text"
                               placeholder="#000000 ou rgb(0,0,0)"
                               style="flex:1; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:6px 8px; font-family:monospace; font-size:0.85rem;">
                    </div>
                </div>
            `;
        }).join('');

        const sourceOptions = [
            { value: 'random', label: 'Aleatório (Random)', desc: 'Escolhe filmes e séries aleatórios da biblioteca.' },
            { value: 'recently_added', label: 'Adicionados Recentemente', desc: 'Usa as mídias mais recentes da biblioteca.' },
            { value: 'prebuilt', label: 'Lista Manual', desc: 'Usa os IDs fornecidos abaixo (um por linha ou separados por vírgula).' }
        ];

        const sourceRadios = sourceOptions.map(opt => `
            <label style="display:flex; align-items:flex-start; margin-bottom:8px; cursor:pointer;">
                <input type="radio"
                       name="infinity-source"
                       value="${opt.value}"
                       ${s.source === opt.value ? 'checked' : ''}
                       style="margin-top:3px; accent-color:#9400D3;">
                <div style="margin-left:8px;">
                    <div style="color:#eee; font-weight:500;">${opt.label}</div>
                    <div style="color:rgba(255,255,255,0.5); font-size:0.8rem;">${opt.desc}</div>
                </div>
            </label>
        `).join('');

        const showPrebuilt = s.source === 'prebuilt';
        const prebuiltIdsStr = (s.prebuiltIds || []).join('\n');

        return `
            <div class="infinity-config-page" style="max-width:800px; margin:0 auto; padding:24px;">
                <h2 style="color:#eee; font-size:1.5rem; margin-bottom:4px; font-weight:700;">
                    ⚙️ Configuração do Tema Infinity
                </h2>
                <p style="color:rgba(255,255,255,0.5); margin-bottom:24px; font-size:0.85rem;">
                    Personalize as cores, fonte e slideshow do tema. As alterações são aplicadas em tempo real.
                    Clique em <strong>Salvar Configurações</strong> para persistir.
                </p>

                <!-- COLORS SECTION -->
                <div class="infinity-section" style="background:#15121A; border-radius:15px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#eee; font-size:1.1rem; margin-bottom:16px; font-weight:600;">
                        🎨 Cores do Tema
                    </h3>
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(280px, 1fr)); gap:4px 16px;">
                        ${colorFields}
                    </div>
                </div>

                <!-- FONT SECTION -->
                <div class="infinity-section" style="background:#15121A; border-radius:15px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#eee; font-size:1.1rem; margin-bottom:16px; font-weight:600;">
                        🔤 Fonte Customizada
                    </h3>
                    <div style="margin-bottom:12px;">
                        <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;">
                            URL da fonte (.woff)
                        </label>
                        <input type="text"
                               id="infinity-font-url"
                               value="${this._escapeHtml(f.url)}"
                               placeholder="https://exemplo.com/fonte.woff"
                               style="width:100%; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:8px 10px; font-size:0.85rem; box-sizing:border-box;">
                        <div style="color:rgba(255,255,255,0.4); font-size:0.75rem; margin-top:4px;">
                            Deixe em branco para usar a fonte padrão (Kodchasan). Aceita URLs http/https ou caminhos relativos.
                        </div>
                    </div>
                    <div>
                        <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;">
                            Nome da família tipográfica
                        </label>
                        <input type="text"
                               id="infinity-font-family"
                               value="${this._escapeHtml(f.family)}"
                               placeholder="Nome da Fonte"
                               style="width:100%; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:8px 10px; font-size:0.85rem; box-sizing:border-box;">
                    </div>
                </div>

                <!-- SLIDESHOW SECTION -->
                <div class="infinity-section" style="background:#15121A; border-radius:15px; padding:20px; margin-bottom:20px;">
                    <h3 style="color:#eee; font-size:1.1rem; margin-bottom:16px; font-weight:600;">
                        🖼️ Slideshow
                    </h3>

                    <!-- Numeric settings -->
                    <div style="display:grid; grid-template-columns:repeat(auto-fill, minmax(200px, 1fr)); gap:12px 16px; margin-bottom:16px;">
                        ${this._renderNumberField('infinity-slideshow-items', 'Quantidade de slides', s.items, 1, 100)}
                        ${this._renderNumberField('infinity-slideshow-interval', 'Intervalo (segundos)', s.interval, 1, 300)}
                        ${this._renderNumberField('infinity-fade-duration', 'Duração do fade (ms)', s.fadeDuration, 0, 10000)}
                        ${this._renderNumberField('infinity-kenburns-duration', 'Duração Ken Burns (seg)', s.kenBurnsDuration, 1, 60)}
                    </div>

                    <!-- Toggles -->
                    <div style="display:flex; flex-wrap:wrap; gap:16px;">
                        ${this._renderToggle('infinity-hide-logo', 'Esconder logo', s.hideLogo)}
                        ${this._renderToggle('infinity-show-title', 'Mostrar título', s.showTitle)}
                        ${this._renderToggle('infinity-animation', 'Animação Ken Burns', s.animation)}
                    </div>

                    <!-- Source selector -->
                    <div style="margin-top:20px; padding-top:16px; border-top:1px solid rgba(255,255,255,0.08);">
                        <h4 style="color:#eee; font-size:0.95rem; margin-bottom:12px; font-weight:500;">
                            📋 Origem dos Slides
                        </h4>
                        <div id="infinity-source-options">
                            ${sourceRadios}
                        </div>
                        <div id="infinity-prebuilt-container" style="margin-top:12px; ${showPrebuilt ? '' : 'display:none;'}">
                            <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;">
                                IDs das mídias (um por linha ou separados por vírgula)
                            </label>
                            <textarea id="infinity-prebuilt-ids"
                                      rows="5"
                                      style="width:100%; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:8px 10px; font-family:monospace; font-size:0.85rem; box-sizing:border-box; resize:vertical;"
                                      placeholder="Ex:&#10;a1b2c3d4e5f6&#10;b2c3d4e5f6a1&#10;c3d4e5f6a1b2">${this._escapeHtml(prebuiltIdsStr)}</textarea>
                            <div style="color:rgba(255,255,255,0.4); font-size:0.75rem; margin-top:4px;">
                                Cada ID deve estar em uma linha separada. Os IDs inválidos serão ignorados automaticamente.
                            </div>
                        </div>
                    </div>
                </div>

                <!-- ACTION BUTTONS -->
                <div style="display:flex; gap:12px; justify-content:flex-end; margin-top:8px;">
                    <button id="infinity-reset-btn"
                            style="background:#27242E; color:#eee; border:none; border-radius:4em; padding:10px 24px; cursor:pointer; font-family:inherit; font-size:0.9rem; transition:background-color 0.2s;"
                            onmouseover="this.style.backgroundColor='rgba(148,0,211,0.25)'"
                            onmouseout="this.style.backgroundColor='#27242E'">
                        🔄 Restaurar Padrões
                    </button>
                    <button id="infinity-save-btn"
                            style="background:#9400D3; color:#fff; border:none; border-radius:4em; padding:10px 24px; cursor:pointer; font-family:inherit; font-size:0.9rem; font-weight:600; transition:background-color 0.2s;"
                            onmouseover="this.style.backgroundColor='#AD33E0'"
                            onmouseout="this.style.backgroundColor='#9400D3'">
                        💾 Salvar Configurações
                    </button>
                </div>

                <div id="infinity-save-feedback" style="text-align:right; margin-top:8px; min-height:20px;"></div>
            </div>
        `;
    },

    /**
     * Renders a number input field with label.
     */
    _renderNumberField(id, label, value, min, max) {
        return `
            <div>
                <label style="display:block; color:#dbdbdb; margin-bottom:4px; font-size:0.85rem;" for="${id}">
                    ${label}
                </label>
                <input type="number"
                       id="${id}"
                       value="${value}"
                       min="${min}"
                       max="${max}"
                       style="width:100%; background:#27242E; color:#eee; border:1px solid rgba(255,255,255,0.08); border-radius:0.5rem; padding:6px 8px; font-size:0.85rem; box-sizing:border-box;">
            </div>
        `;
    },

    /**
     * Renders a toggle switch (checkbox styled).
     */
    _renderToggle(id, label, checked) {
        return `
            <label style="display:flex; align-items:center; cursor:pointer; color:#eee; font-size:0.85rem; gap:8px;">
                <input type="checkbox"
                       id="${id}"
                       ${checked ? 'checked' : ''}
                       style="accent-color:#9400D3; width:16px; height:16px;">
                ${label}
            </label>
        `;
    },

    /**
     * Converts a CSS color value to a hex string compatible with <input type="color">.
     * Handles: hex (#RGB, #RRGGBB, #RRGGBBAA), rgb(), rgba().
     * Falls back to #000000 for unsupported formats.
     */
    _toHexForPicker(color) {
        if (!color || typeof color !== 'string') return '#000000';

        const trimmed = color.trim();

        // Already hex (3, 6, or 8 chars)
        if (/^#[0-9a-fA-F]{3}$/.test(trimmed)) {
            // Expand shorthand: #ABC → #AABBCC
            return '#' + trimmed[1] + trimmed[1] + trimmed[2] + trimmed[2] + trimmed[3] + trimmed[3];
        }
        if (/^#[0-9a-fA-F]{6}$/.test(trimmed)) {
            return trimmed;
        }

        // rgba/rgb → hex approximation (lose alpha for picker)
        const rgbMatch = trimmed.match(/rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})/);
        if (rgbMatch) {
            const r = parseInt(rgbMatch[1], 10);
            const g = parseInt(rgbMatch[2], 10);
            const b = parseInt(rgbMatch[3], 10);
            return '#' + [r, g, b].map(c => Math.min(255, Math.max(0, c)).toString(16).padStart(2, '0')).join('');
        }

        return '#000000';
    },

    /**
     * Escapes HTML special characters.
     */
    _escapeHtml(str) {
        if (typeof str !== 'string') return '';
        return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#039;');
    },

    /**
     * Binds color picker ↔ text input bidirectional sync + live preview.
     */
    _bindColorPickers() {
        const page = document.querySelector('.infinity-config-page');
        if (!page) return;

        const pickers = page.querySelectorAll('.infinity-color-picker');
        const textInputs = page.querySelectorAll('.infinity-color-text');

        // Color picker → text input + live preview
        pickers.forEach(picker => {
            picker.addEventListener('input', () => {
                const key = picker.dataset.configKey;
                const textInput = page.querySelector(`.infinity-color-text[data-config-key="${key}"]`);
                if (textInput) textInput.value = picker.value;
                this._updateColorConfig(key, picker.value);
            });
        });

        // Text input → color picker + live preview
        textInputs.forEach(textInput => {
            textInput.addEventListener('input', () => {
                const key = textInput.dataset.configKey;
                const picker = page.querySelector(`.infinity-color-picker[data-config-key="${key}"]`);
                const value = textInput.value.trim();

                // Try to update picker if value is valid hex
                const hexForPicker = this._toHexForPicker(value);
                if (picker && hexForPicker !== '#000000' || /^#[0-9a-fA-F]{6}$/.test(value)) {
                    picker.value = hexForPicker;
                }

                this._updateColorConfig(key, value);
            });
        });
    },

    /**
     * Updates a color in the current config and applies live preview.
     */
    _updateColorConfig(key, value) {
        if (!this._currentConfig || !this._currentConfig.theme) return;

        // Store raw value in config (validation happens on save)
        this._currentConfig.theme[key] = value;

        // Apply live to CSS custom property
        const field = this.COLOR_FIELDS.find(f => f.key === key);
        if (field && value) {
            document.documentElement.style.setProperty(field.cssVar, value);
        }
    },

    /**
     * Binds slideshow numeric inputs and toggles to live preview.
     */
    _bindSlideshowControls() {
        const page = document.querySelector('.infinity-config-page');
        if (!page) return;

        // Numeric inputs
        const numericBindings = [
            { id: 'infinity-slideshow-items', key: 'items' },
            { id: 'infinity-slideshow-interval', key: 'interval' },
            { id: 'infinity-fade-duration', key: 'fadeDuration' },
            { id: 'infinity-kenburns-duration', key: 'kenBurnsDuration' }
        ];

        numericBindings.forEach(({ id, key }) => {
            const input = page.querySelector('#' + id);
            if (input) {
                input.addEventListener('input', () => {
                    const val = parseFloat(input.value);
                    if (!isNaN(val) && this._currentConfig && this._currentConfig.slideshow) {
                        this._currentConfig.slideshow[key] = val;
                        this._applySlideshowLive();
                    }
                });
            }
        });

        // Toggles
        const toggleBindings = [
            { id: 'infinity-hide-logo', key: 'hideLogo' },
            { id: 'infinity-show-title', key: 'showTitle' },
            { id: 'infinity-animation', key: 'animation' }
        ];

        toggleBindings.forEach(({ id, key }) => {
            const checkbox = page.querySelector('#' + id);
            if (checkbox) {
                checkbox.addEventListener('change', () => {
                    if (this._currentConfig && this._currentConfig.slideshow) {
                        this._currentConfig.slideshow[key] = checkbox.checked;
                        this._applySlideshowLive();
                    }
                });
            }
        });
    },

    /**
     * Applies slideshow settings live to CONFIG.
     */
    _applySlideshowLive() {
        if (!this._currentConfig || !this._currentConfig.slideshow) return;

        const s = this._currentConfig.slideshow;
        if (typeof CONFIG !== 'undefined') {
            CONFIG.slideshowItems = s.items;
            CONFIG.shuffleInterval = s.interval * 1000;
            CONFIG.fadeTransitionDuration = s.fadeDuration;
            CONFIG.hideLogo = s.hideLogo;
            CONFIG.showTitle = s.showTitle;
            CONFIG.slideAnimationEnabled = s.animation;
            CONFIG.enableRandom = (s.source === 'random');
        }
    },

    /**
     * Binds source selector radio buttons and prebuilt textarea.
     */
    _bindSourceSelector() {
        const page = document.querySelector('.infinity-config-page');
        if (!page) return;

        const radios = page.querySelectorAll('input[name="infinity-source"]');
        const prebuiltContainer = page.querySelector('#infinity-prebuilt-container');
        const prebuiltTextarea = page.querySelector('#infinity-prebuilt-ids');

        radios.forEach(radio => {
            radio.addEventListener('change', () => {
                if (this._currentConfig && this._currentConfig.slideshow) {
                    this._currentConfig.slideshow.source = radio.value;
                    this._applySlideshowLive();
                }

                // Show/hide prebuilt textarea
                if (prebuiltContainer) {
                    prebuiltContainer.style.display = radio.value === 'prebuilt' ? '' : 'none';
                }
            });
        });

        // Prebuilt IDs textarea
        if (prebuiltTextarea) {
            prebuiltTextarea.addEventListener('input', () => {
                if (!this._currentConfig || !this._currentConfig.slideshow) return;

                const raw = prebuiltTextarea.value;
                // Parse IDs: split by newline or comma, trim, filter empty
                const ids = raw
                    .split(/[\n,]+/)
                    .map(id => id.trim())
                    .filter(Boolean);

                this._currentConfig.slideshow.prebuiltIds = ids;
            });
        }
    },

    /**
     * Binds Save and Reset buttons.
     */
    _bindButtons() {
        const page = document.querySelector('.infinity-config-page');
        if (!page) return;

        const saveBtn = page.querySelector('#infinity-save-btn');
        const resetBtn = page.querySelector('#infinity-reset-btn');
        const feedback = page.querySelector('#infinity-save-feedback');

        // Save button
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                // Sync all current values from form to config
                this._syncFormToConfig();

                // Validate
                const validation = ConfigPersistence.validate(this._currentConfig);
                if (!validation.valid) {
                    this._showFeedback(feedback, 'error', validation.errors.join('<br>'));
                    return;
                }

                // Save
                try {
                    ConfigPersistence.save(this._currentConfig);
                    ConfigPersistence.apply(this._currentConfig);
                    this._showFeedback(feedback, 'success', '✅ Configurações salvas com sucesso!');
                } catch (e) {
                    this._showFeedback(feedback, 'error', '❌ Erro ao salvar: ' + this._escapeHtml(e.message));
                }
            });
        }

        // Reset button
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                // eslint-disable-next-line no-restricted-globals
                if (!confirm('Tem certeza? Todas as configurações voltarão aos padrões do tema Infinity.')) {
                    return;
                }

                this._currentConfig = ConfigPersistence.reset();
                ConfigPersistence.apply(this._currentConfig);

                // Re-render the page with defaults
                this._pageVisible = false;
                this._showConfigPage();

                this._showFeedback(feedback, 'success', '🔄 Configurações restauradas aos padrões.');
            });
        }
    },

    /**
     * Syncs form values back to the config object before save.
     */
    _syncFormToConfig() {
        const page = document.querySelector('.infinity-config-page');
        if (!page || !this._currentConfig) return;

        // Colors
        const textInputs = page.querySelectorAll('.infinity-color-text');
        textInputs.forEach(input => {
            const key = input.dataset.configKey;
            if (key && this._currentConfig.theme) {
                this._currentConfig.theme[key] = input.value.trim();
            }
        });

        // Font
        const fontUrl = page.querySelector('#infinity-font-url');
        const fontFamily = page.querySelector('#infinity-font-family');
        if (fontUrl && this._currentConfig.font) this._currentConfig.font.url = fontUrl.value.trim();
        if (fontFamily && this._currentConfig.font) this._currentConfig.font.family = fontFamily.value.trim();

        // Slideshow numeric
        if (this._currentConfig.slideshow) {
            const s = this._currentConfig.slideshow;
            const itemsEl = page.querySelector('#infinity-slideshow-items');
            const intervalEl = page.querySelector('#infinity-slideshow-interval');
            const fadeEl = page.querySelector('#infinity-fade-duration');
            const kenBurnsEl = page.querySelector('#infinity-kenburns-duration');

            if (itemsEl) s.items = parseInt(itemsEl.value, 10) || 16;
            if (intervalEl) s.interval = parseFloat(intervalEl.value) || 10;
            if (fadeEl) s.fadeDuration = parseInt(fadeEl.value, 10) || 500;
            if (kenBurnsEl) s.kenBurnsDuration = parseFloat(kenBurnsEl.value) || 10;

            // Toggles
            s.hideLogo = page.querySelector('#infinity-hide-logo')?.checked ?? false;
            s.showTitle = page.querySelector('#infinity-show-title')?.checked ?? true;
            s.animation = page.querySelector('#infinity-animation')?.checked ?? true;

            // Source
            const selectedRadio = page.querySelector('input[name="infinity-source"]:checked');
            if (selectedRadio) s.source = selectedRadio.value;

            // Prebuilt IDs
            if (s.source === 'prebuilt') {
                const textarea = page.querySelector('#infinity-prebuilt-ids');
                if (textarea) {
                    s.prebuiltIds = textarea.value
                        .split(/[\n,]+/)
                        .map(id => id.trim())
                        .filter(Boolean);
                }
            }
        }
    },

    /**
     * Shows feedback message after save/reset.
     */
    _showFeedback(element, type, message) {
        if (!element) return;

        const color = type === 'success' ? '#4caf50' : '#bb4a4a';
        element.innerHTML = `<span style="color:${color}; font-size:0.85rem;">${message}</span>`;

        // Auto-hide after 4 seconds
        setTimeout(() => {
            if (element) element.innerHTML = '';
        }, 4000);
    }
};

// Auto-initialize when this module loads in the dashboard context
// Only if ConfigPersistence is available (module 08 loaded first)
if (typeof ConfigPersistence !== 'undefined') {
    ConfigPage.init();
} else {
    console.warn('[Infinity] ConfigPersistence not available — ConfigPage will init later.');
    // Retry mechanism for build order edge cases
    const retryInterval = setInterval(() => {
        if (typeof ConfigPersistence !== 'undefined') {
            clearInterval(retryInterval);
            ConfigPage.init();
        }
    }, 100);
    // Safety: stop retrying after 10s
    setTimeout(() => clearInterval(retryInterval), 10000);
}
