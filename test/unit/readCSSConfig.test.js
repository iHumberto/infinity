#!/usr/bin/env node
/**
 * Infinity Theme — Unit Tests: loadStoredConfig (CSS config reader)
 *
 * Tests U12-U13: Reading CSS custom properties for slideshow config
 * from js/modules/01-state-auth.js
 *
 * Note: readCSSConfig() was renamed to loadStoredConfig() in the config
 * page feature. The function now prioritizes localStorage but falls
 * back to CSS custom properties when localStorage is empty.
 *
 * Run: node test/unit/readCSSConfig.test.js
 */

// ── Mock: CONFIG global (required by loadStoredConfig) ────────────────
const ORIGINAL_CONFIG = {
    shuffleInterval: 10000,
    slideshowItems: 16,
    fadeTransitionDuration: 500,
    hideLogo: false,
    showTitle: true,
    enableRandom: false,
    slideAnimationEnabled: true,
    slideshowSource: 'random',
    slideshowPrebuiltIds: []
};

let CONFIG = { ...ORIGINAL_CONFIG };

// ── Mock: localStorage ────────────────────────────────────────────────
let localStorageStore = {};
const localStorageMock = {
    getItem(key) { return localStorageStore[key] || null; },
    setItem(key, value) { localStorageStore[key] = value; },
    removeItem(key) { delete localStorageStore[key]; },
    clear() { localStorageStore = {}; }
};

// ── Simulação de loadStoredConfig (01-state-auth.js) ──────────────────
// Esta funcao espelha a logica real do modulo 01
function loadStoredConfig(cssVariables = {}) {
    // Se ConfigPersistence nao existe, usa defaults
    // No teste, sempre simulamos o caminho "sem localStorage"
    const hasLocalStorage = localStorageMock.getItem('infinity-config');
    if (hasLocalStorage) {
        // Este caminho e testado em run-tests.js (ConfigPersistence)
        return;
    }

    // Fallback: le de CSS custom properties
    const style = {
        getPropertyValue(name) {
            return cssVariables[name] || '';
        }
    };

    const items = parseInt(style.getPropertyValue('--infinity-slideshow-items').trim());
    const interval = parseFloat(style.getPropertyValue('--infinity-slide-interval'));
    const fade = parseInt(style.getPropertyValue('--infinity-fade-duration').trim());

    CONFIG.slideshowItems = items || CONFIG.slideshowItems;
    CONFIG.shuffleInterval = (interval * 1000) || CONFIG.shuffleInterval;
    CONFIG.fadeTransitionDuration = fade || CONFIG.fadeTransitionDuration;
}

// ── Test runner ───────────────────────────────────────────────────────
let passed = 0;
let failed = 0;
const failures = [];

function assert(condition, message) {
    if (condition) {
        passed++;
    } else {
        failed++;
        const msg = `FAIL: ${message}`;
        failures.push(msg);
        console.error(`  ✗ ${msg}`);
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

// Reset CONFIG before each test section
function resetConfig() {
    CONFIG = { ...ORIGINAL_CONFIG };
    localStorageMock.clear();
}

// ── U12: loadStoredConfig com variaveis CSS definidas ────────────────
runTests('U12: loadStoredConfig() com variaveis CSS definidas', [
    ['--infinity-slideshow-items: 10 → CONFIG.slideshowItems = 10', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-slideshow-items': '10' });
        assert(CONFIG.slideshowItems === 10, `slideshowItems = 10, recebido ${CONFIG.slideshowItems}`);
    }],
    ['--infinity-slide-interval: 8 → CONFIG.shuffleInterval = 8000', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-slide-interval': '8' });
        assert(CONFIG.shuffleInterval === 8000, `shuffleInterval = 8000, recebido ${CONFIG.shuffleInterval}`);
    }],
    ['--infinity-fade-duration: 300 → CONFIG.fadeTransitionDuration = 300', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-fade-duration': '300' });
        assert(CONFIG.fadeTransitionDuration === 300, `fadeTransitionDuration = 300, recebido ${CONFIG.fadeTransitionDuration}`);
    }],
    ['todas as variaveis definidas simultaneamente', () => {
        resetConfig();
        loadStoredConfig({
            '--infinity-slideshow-items': '20',
            '--infinity-slide-interval': '5',
            '--infinity-fade-duration': '1000'
        });
        assert(CONFIG.slideshowItems === 20, 'items = 20');
        assert(CONFIG.shuffleInterval === 5000, 'interval = 5000');
        assert(CONFIG.fadeTransitionDuration === 1000, 'fade = 1000');
    }],
    ['valores em string com espacos sao parseados', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-slideshow-items': '  12  ' });
        assert(CONFIG.slideshowItems === 12, 'espacos ignorados no parse');
    }]
]);

// ── U13: loadStoredConfig sem variaveis CSS (defaults) ────────────────
runTests('U13: loadStoredConfig() sem variaveis CSS (defaults)', [
    ['sem variaveis CSS → mantem defaults', () => {
        resetConfig();
        const before = { ...CONFIG };
        loadStoredConfig({}); // CSS vazio
        assert(CONFIG.slideshowItems === before.slideshowItems, 'items mantem default');
        assert(CONFIG.shuffleInterval === before.shuffleInterval, 'interval mantem default');
        assert(CONFIG.fadeTransitionDuration === before.fadeTransitionDuration, 'fade mantem default');
    }],
    ['variavel vazia → mantem default', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-slideshow-items': '' });
        assert(CONFIG.slideshowItems === 16, 'vazia → default 16');
    }],
    ['variavel "NaN" → mantem default', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-slideshow-items': 'not-a-number' });
        assert(CONFIG.slideshowItems === 16, 'NaN → default 16');
    }],
    ['variavel "0" → mantem default (0 e falsy)', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-slideshow-items': '0' });
        // 0 || 16 = 16 (0 e falsy)
        assert(CONFIG.slideshowItems === 16, '0 e falsy → default 16');
    }],
    ['variavel negativa → usa o valor negativo (parseInt aceita)', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-slideshow-items': '-5' });
        // parseInt("-5") = -5. -5 || 16 = -5 (numero, nao-zero → truthy)
        // Nota: a validacao de range e feita pelo ConfigPersistence, nao aqui
        assert(CONFIG.slideshowItems === -5, 'negativo e aceito pelo parser (validacao e feita em outra camada)');
    }],
    ['variavel com intervalo float → parseFloat funciona', () => {
        resetConfig();
        loadStoredConfig({ '--infinity-slide-interval': '7.5' });
        assert(CONFIG.shuffleInterval === 7500, 'float 7.5 → 7500ms');
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
    console.log('✅ Todos os testes de loadStoredConfig passaram!\n');
    process.exit(0);
}
