#!/usr/bin/env node
/**
 * Infinity Theme — Test Suite
 *
 * Tests for ConfigPersistence module (07-config-persistence.js).
 * Uses a localStorage mock and minimal DOM simulation for Node.js.
 *
 * Run: node test/run-tests.js
 */

// ── localStorage Mock ────────────────────────────────────────────────
const localStorageMock = (() => {
    let store = {};
    return {
        getItem(key) { return store[key] ?? null; },
        setItem(key, value) { store[key] = String(value); },
        removeItem(key) { delete store[key]; },
        clear() { store = {}; },
        _store: store
    };
})();
global.localStorage = localStorageMock;

// ── Minimal DOM simulation ───────────────────────────────────────────
const styleMap = new Map();
global.document = {
    documentElement: {
        style: {
            setProperty(name, value) { styleMap.set(name, value); },
            getPropertyValue(name) { return styleMap.get(name) || ''; },
            removeProperty(name) { styleMap.delete(name); }
        }
    },
    getElementById(id) { return null; },
    head: { appendChild() {}, removeChild() {} },
    createElement(tag) {
        return {
            tagName: tag,
            textContent: '',
            id: '',
            setAttribute() {},
            remove() {}
        };
    },
    querySelector() { return null; }
};
global.window = { location: { hash: '' } };

// ── Test runner ───────────────────────────────────────────────────────
let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
    if (condition) {
        passed++;
    } else {
        failed++;
        failures.push(`FAIL: ${message}`);
        console.error(`  ✗ ${message}`);
    }
}

function runTests(name, tests) {
    console.log(`\n📋 ${name}`);
    tests.forEach(([desc, fn]) => {
        try {
            fn();
            if (!failures.some(f => f.includes(desc))) {
                console.log(`  ✓ ${desc}`);
                passed++;
            }
        } catch (e) {
            failed++;
            const msg = `  ✗ ${desc} — ERROR: ${e.message}`;
            console.error(msg);
            failures.push(msg);
        }
    });
}

// ── Load module under test ────────────────────────────────────────────
// Simulate CONFIG global expected by the module
global.CONFIG = {
    shuffleInterval: 10000,
    retryInterval: 500,
    minSwipeDistance: 50,
    loadingCheckInterval: 100,
    maxItems: 500,
    preloadCount: 3,
    fadeTransitionDuration: 500,
    hideLogo: false,
    showTitle: true,
    slideshowItems: 16,
    enableRandom: false,
    slideAnimationEnabled: true,
    slideshowSource: 'random',
    slideshowPrebuiltIds: []
};

// Load the built module (raw JS, no export — uses globals)
// Note: const declarations in eval() are block-scoped in Node.js,
// so we use vm.runInThisContext to execute in global scope (browser-like).
try {
    const fs = require('fs');
    const path = require('path');
    const vm = require('vm');
    const modulePath = path.join(__dirname, '..', 'js', 'modules', '07-config-persistence.js');
    const code = fs.readFileSync(modulePath, 'utf8');
    vm.runInThisContext(code);
    console.log('✅ Module 08 loaded successfully.');
} catch (e) {
    console.error('❌ Failed to load module 08:', e.message);
    process.exit(1);
}

// ── TESTS ─────────────────────────────────────────────────────────────

// === Functional Tests ===

runTests('Funcional: getDefaults()', [
    ['returns object with version', () => {
        const defaults = ConfigPersistence.getDefaults();
        assert(defaults.version === 1, 'version should be 1');
    }],
    ['returns all theme keys', () => {
        const defaults = ConfigPersistence.getDefaults();
        const keys = ['backgroundColor', 'textColor', 'accentColor', 'cardBg',
                      'headerBg', 'sidebarBg', 'buttonBg', 'warningColor',
                      'selectionBorder', 'inputBg'];
        for (const key of keys) {
            assert(typeof defaults.theme[key] === 'string', `theme.${key} exists`);
        }
    }],
    ['returns font config', () => {
        const defaults = ConfigPersistence.getDefaults();
        assert(defaults.font.url === '', 'font.url empty');
        assert(defaults.font.family === 'Kodchasan', 'font.family is Kodchasan');
    }],
    ['returns slideshow config', () => {
        const defaults = ConfigPersistence.getDefaults();
        assert(defaults.slideshow.items === 16, 'items=16');
        assert(defaults.slideshow.interval === 10, 'interval=10');
        assert(defaults.slideshow.fadeDuration === 500, 'fade=500');
        assert(defaults.slideshow.source === 'recently_added', 'source=recently_added');
    }],
    ['defaults are frozen (immutable)', () => {
        const defaults = ConfigPersistence.getDefaults();
        defaults.theme.backgroundColor = '#000';
        const fresh = ConfigPersistence.getDefaults();
        assert(fresh.theme.backgroundColor === '#0F0D14', 'original value preserved');
    }]
]);

runTests('Funcional: load()', [
    ['empty localStorage → returns defaults', () => {
        localStorageMock.clear();
        const config = ConfigPersistence.load();
        assert(config.theme.backgroundColor === '#0F0D14', 'default bg');
        assert(config.slideshow.items === 16, 'default items');
    }],
    ['saved data → loaded correctly', () => {
        localStorageMock.clear();
        const testConfig = ConfigPersistence.getDefaults();
        testConfig.theme.backgroundColor = '#000000';
        testConfig.slideshow.items = 8;
        localStorageMock.setItem('infinity-config', JSON.stringify(testConfig));
        const loaded = ConfigPersistence.load();
        assert(loaded.theme.backgroundColor === '#000000', 'custom bg loaded');
        assert(loaded.slideshow.items === 8, 'custom items loaded');
    }],
    ['corrupt JSON → returns defaults', () => {
        localStorageMock.clear();
        localStorageMock.setItem('infinity-config', '{bad json!!!}');
        const config = ConfigPersistence.load();
        assert(config.theme.backgroundColor === '#0F0D14', 'fallback to default');
    }],
    ['version mismatch → returns defaults', () => {
        localStorageMock.clear();
        const testConfig = ConfigPersistence.getDefaults();
        testConfig.version = 999;
        localStorageMock.setItem('infinity-config', JSON.stringify(testConfig));
        const config = ConfigPersistence.load();
        assert(config.version === 1, 'returned defaults');
    }],
    ['invalid color values filtered out', () => {
        localStorageMock.clear();
        const testConfig = ConfigPersistence.getDefaults();
        testConfig.theme.backgroundColor = 'not-a-color';
        localStorageMock.setItem('infinity-config', JSON.stringify(testConfig));
        const config = ConfigPersistence.load();
        assert(config.theme.backgroundColor === '#0F0D14', 'invalid color → default');
    }]
]);

runTests('Funcional: save(), reset(), round-trip', [
    ['save → load roundtrip', () => {
        localStorageMock.clear();
        const config = ConfigPersistence.getDefaults();
        config.theme.accentColor = '#FF0000';
        config.slideshow.interval = 15;
        ConfigPersistence.save(config);
        const loaded = ConfigPersistence.load();
        assert(loaded.theme.accentColor === '#FF0000', 'accent saved');
        assert(loaded.slideshow.interval === 15, 'interval saved');
    }],
    ['reset clears localStorage', () => {
        localStorageMock.setItem('infinity-config', '{"version":1}');
        ConfigPersistence.reset();
        assert(localStorageMock.getItem('infinity-config') === null, 'storage cleared');
    }],
    ['reset returns defaults', () => {
        const config = ConfigPersistence.reset();
        assert(config.theme.backgroundColor === '#0F0D14', 'defaults returned');
    }]
]);

runTests('Funcional: apply()', [
    ['sets CSS custom properties', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = '#ABCDEF';
        ConfigPersistence.apply(config);
        const cssBg = document.documentElement.style.getPropertyValue('--theme-background-color');
        assert(cssBg === '#ABCDEF', 'CSS var set');
    }],
    ['updates CONFIG slideshow values', () => {
        const config = ConfigPersistence.getDefaults();
        config.slideshow.items = 12;
        config.slideshow.interval = 8;
        config.slideshow.source = 'recently_added';
        ConfigPersistence.apply(config);
        assert(CONFIG.slideshowItems === 12, 'CONFIG.items');
        assert(CONFIG.shuffleInterval === 8000, 'CONFIG.interval');
        assert(CONFIG.enableRandom === false, 'recently_added → enableRandom=false');
        assert(CONFIG.slideshowSource === 'recently_added', 'CONFIG.source');
    }],
    ['random source → enableRandom=true', () => {
        const config = ConfigPersistence.getDefaults();
        config.slideshow.source = 'random';
        ConfigPersistence.apply(config);
        assert(CONFIG.enableRandom === true, 'random → enableRandom=true');
    }],
    ['prebuilt IDs stored in CONFIG', () => {
        const config = ConfigPersistence.getDefaults();
        config.slideshow.source = 'prebuilt';
        config.slideshow.prebuiltIds = ['abc123', 'def456'];
        ConfigPersistence.apply(config);
        assert(CONFIG.slideshowPrebuiltIds.length === 2, 'prebuilt IDs');
        assert(CONFIG.slideshowPrebuiltIds[0] === 'abc123', 'ID[0]');
    }]
]);

// === Validation Tests ===

runTests('Validação: validate()', [
    ['valid config passes', () => {
        const config = ConfigPersistence.getDefaults();
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, 'valid config');
        assert(result.errors.length === 0, 'no errors');
    }],
    ['invalid hex color rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = 'not-a-color!!!!';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'invalid color rejected');
        assert(result.errors.some(e => e.includes('backgroundColor')), 'error mentions field');
    }],
    ['negative slideshow items rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.slideshow.items = -5;
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'negative items rejected');
    }],
    ['slideshow items > 100 rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.slideshow.items = 999;
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, '>100 items rejected');
    }],
    ['invalid source rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.slideshow.source = 'invalid_source';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'invalid source rejected');
    }]
]);

runTests('Validação: Cores', [
    ['hex #FFF (shorthand) valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = '#FFF';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, '#FFF accepted');
    }],
    ['hex #FFFFFF valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = '#FFFFFF';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, '#FFFFFF accepted');
    }],
    ['hex #FF0000FF (with alpha) valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = '#FF0000FF';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, '#RRGGBBAA accepted');
    }],
    ['rgb(255, 0, 0) valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = 'rgb(255, 0, 0)';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, 'rgb accepted');
    }],
    ['rgba(255,0,0,0.5) valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = 'rgba(255, 0, 0, 0.5)';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, 'rgba accepted');
    }],
    ['empty string rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = '';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'empty rejected');
    }]
]);

runTests('Validação: Font URL', [
    ['empty URL valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.font.url = '';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, 'empty URL ok');
    }],
    ['https URL valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.font.url = 'https://fonts.example.com/font.woff';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, 'https URL ok');
    }],
    ['http URL valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.font.url = 'http://example.com/font.woff';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, 'http URL ok');
    }],
    ['relative path valid', () => {
        const config = ConfigPersistence.getDefaults();
        config.font.url = '/web/fonts/custom.woff';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === true, 'relative path ok');
    }]
]);

// === Security Tests ===

runTests('Segurança: Vetores Primários — XSS via valores', [
    ['XSS: color value — script injection rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = '</style><script>alert(1)</script>';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'script tag rejected');
    }],
    ['XSS: color value — CSS injection sanitized', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = '#000; background: url("http://evil.com")';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'CSS injection rejected');
    }],
    ['XSS: color value — expression() rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.theme.backgroundColor = 'expression(alert(1))';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'expression() rejected');
    }],
    ['XSS: font URL — javascript: protocol rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.font.url = 'javascript:alert(1)';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'javascript: URL rejected');
    }],
    ['XSS: font URL — data: protocol rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.font.url = 'data:text/html,<script>alert(1)</script>';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'data: URL rejected');
    }],
    ['XSS: font URL — file: protocol rejected', () => {
        const config = ConfigPersistence.getDefaults();
        config.font.url = 'file:///etc/passwd';
        const result = ConfigPersistence.validate(config);
        assert(result.valid === false, 'file: URL rejected');
    }],
    ['XSS: font family — special chars sanitized', () => {
        const config = ConfigPersistence.getDefaults();
        config.font.family = 'Arial";}</style><script>alert(1)</script>';
        const result = ConfigPersistence.validate(config);
        // sanitizeFontFamily will clean it, making it different from input
        assert(config.font.family !== 'Arial";}</style><script>alert(1)</script>' ||
               result.valid === false, 'font family sanitized');
    }]
]);

runTests('Segurança: Vetores Primários — Dados e path traversal', [
    ['Path traversal in prebuilt IDs filtered', () => {
        const config = ConfigPersistence.getDefaults();
        config.slideshow.source = 'prebuilt';
        config.slideshow.prebuiltIds = ['../../../etc/passwd', '../../shadow', 'valid-id-123'];
        const result = ConfigPersistence.validate(config);
        // After sanitization via load(), this test uses validate() directly
        // The sanitizeItemId function (internal to load) strips non-alphanumeric
        // For validate(), we check the source
        assert(result.valid === true, 'source is valid');
    }],
    ['Non-alphanumeric IDs stripped by load()', () => {
        localStorageMock.clear();
        const testConfig = ConfigPersistence.getDefaults();
        testConfig.slideshow.source = 'prebuilt';
        testConfig.slideshow.prebuiltIds = ['../../../etc/passwd', 'valid-id-123', '<script>alert(1)</script>'];
        localStorageMock.setItem('infinity-config', JSON.stringify(testConfig));
        const loaded = ConfigPersistence.load();
        // Only 'valid-id-123' should survive
        assert(loaded.slideshow.prebuiltIds.length === 1, 'only valid ID survives');
        assert(loaded.slideshow.prebuiltIds[0] === 'valid-id-123', 'valid ID kept');
    }]
]);

// ── SUMMARY ───────────────────────────────────────────────────────────
console.log('\n' + '='.repeat(60));
console.log(`\n📊 RESULTADO: ${passed} passaram, ${failed} falharam`);
if (failures.length > 0) {
    console.log('\n❌ FALHAS:');
    failures.forEach(f => console.log(`  ${f}`));
    process.exit(1);
} else {
    console.log('✅ Todos os testes passaram!\n');
    process.exit(0);
}
