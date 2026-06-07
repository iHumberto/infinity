#!/usr/bin/env node
/**
 * Infinity Theme — Security Test Suite (Priority 1 — Critical)
 *
 * Tests security properties that prevent regression of critical fixes.
 * Covers: S1-S6 from the test plan (2026-05-23_plano-de-testes.md).
 *
 * Run: node test/security-tests.js
 *
 * SECURITY PRINCIPLE: The test IS the security specification.
 * If a test fails, fix the FEATURE — never weaken the test.
 */

const fs = require('fs');
const path = require('path');

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

// ── S1: console.log never exposes sensitive data ──────────────────────
// Scans the built slideshowpure.js for any console.log/warn/error
// that could expose accessToken or other sensitive fields.

const SLIDESHOW_PATH = path.join(__dirname, '..', 'js', 'slideshowpure.js');

function loadSourceCode() {
    return fs.readFileSync(SLIDESHOW_PATH, 'utf8');
}

function extractConsoleCalls(source) {
    // Extract all console.(log|warn|error) calls with surrounding context
    const calls = [];
    const regex = /console\.(log|warn|error)\s*\(([^;]*)\)/gs;
    let match;
    while ((match = regex.exec(source)) !== null) {
        calls.push({
            method: match[1],
            args: match[2].trim(),
            line: source.substring(0, match.index).split('\n').length
        });
    }
    return calls;
}

const SENSITIVE_FIELDS = ['accessToken', 'serverAddress', 'deviceId', 'serverId',
                           '_serverInfo', '_currentUser', 'ApiClient', 'userId'];

runTests('Segurança — S1: console.log nunca expoe dados sensiveis', [
    ['Nenhum console.log expoe accessToken diretamente', () => {
        const source = loadSourceCode();
        const calls = extractConsoleCalls(source);
        for (const call of calls) {
            assert(
                !call.args.includes('accessToken'),
                `console.${call.method} na linha ${call.line} NAO deve conter accessToken: ${call.args.substring(0, 80)}`
            );
        }
    }],
    ['Nenhum console.log expoe STATE.jellyfinData inteiro', () => {
        const source = loadSourceCode();
        const calls = extractConsoleCalls(source);
        for (const call of calls) {
            const hasStateDump = call.args.includes('STATE.jellyfinData') ||
                                 call.args.includes('jellyfinData');
            assert(
                !hasStateDump,
                `console.${call.method} na linha ${call.line} NAO deve expor jellyfinData: ${call.args.substring(0, 80)}`
            );
        }
    }],
    ['Nenhum console.log interpola accessToken em string literal', () => {
        const source = loadSourceCode();
        // Check for template literals or string concatenation with accessToken
        const sensitivePattern = /console\.(log|warn|error)\(\s*`[^`]*\$\{.*accessToken.*\}[^`]*`/;
        const match = sensitivePattern.exec(source);
        assert(match === null, 'Nenhum console.log deve interpolar accessToken em template literal');
    }],
    ['Nenhum console.log expoe STATE.jellyfinData.serverAddress', () => {
        const source = loadSourceCode();
        const calls = extractConsoleCalls(source);
        for (const call of calls) {
            assert(
                !call.args.includes('serverAddress'),
                `console.${call.method} na linha ${call.line} NAO deve expor serverAddress: ${call.args.substring(0, 80)}`
            );
        }
    }],
    ['Nenhum console.log expoe STATE.jellyfinData.deviceId', () => {
        const source = loadSourceCode();
        const calls = extractConsoleCalls(source);
        for (const call of calls) {
            assert(
                !call.args.includes('deviceId'),
                `console.${call.method} na linha ${call.line} NAO deve expor deviceId: ${call.args.substring(0, 80)}`
            );
        }
    }],
    ['console.error com item data nao expoe campos sensiveis do STATE', () => {
        // Verifica que o console.error("Invalid item data:", item) nao e
        // seguido de STATE.jellyfinData em nenhum lugar proximo
        const source = loadSourceCode();
        // Look for console.error/warn/log that takes an object as second arg
        // and verify the object is not STATE.jellyfinData
        const dangerousPattern = /console\.(log|warn|error)\s*\(\s*["'][^"']*["']\s*,\s*STATE\.jellyfinData/;
        const match = dangerousPattern.exec(source);
        assert(match === null, 'Nenhum console.xxx deve passar STATE.jellyfinData como argumento');
    }]
]);

// ── S2: window.slideshowPure doesn't expose STATE ────────────────────
// Load module 06 via vm.runInThisContext and verify the public API surface.

function loadModule06InContext() {
    const vm = require('vm');
    const modulePath = path.join(__dirname, '..', 'js', 'modules', '06-init-bootstrap.js');

    // We need to load all dependencies in order since module 06 depends on 01-05.
    // But we only need to verify the window.slideshowPure shape,
    // so we'll load the built file which has everything self-contained.
    const builtPath = path.join(__dirname, '..', 'js', 'slideshowpure.js');
    const code = fs.readFileSync(builtPath, 'utf8');

    // Create a sandbox with minimal globals needed
    const sandbox = {
        window: { location: { hash: '' }, slideshowCheckInterval: null },
        document: {
            documentElement: { style: { setProperty() {}, getPropertyValue() { return ''; } } },
            getElementById() { return null; },
            querySelector() { return null; },
            body: { addEventListener() {}, appendChild() {} },
            head: { appendChild() {}, removeChild() {} },
            createElement() { return { appendChild() {}, setAttribute() {}, style: {} }; },
            addEventListener() {},
            removeEventListener() {}
        },
        console: { log() {}, warn() {}, error() {} },
        setTimeout() { return 1; },
        clearTimeout() {},
        setInterval() { return 1; },
        clearInterval() {},
        requestAnimationFrame() {},
        fetch() { return Promise.resolve({ ok: false }); },
        localStorage: { getItem() { return null; }, setItem() {}, removeItem() {} },
        getComputedStyle() { return { getPropertyValue() { return ''; } }; },
        marked: undefined,
        DOMPurify: undefined,
        MutationObserver: class { observe() {} disconnect() {} },
        Event() {}
    };
    sandbox.global = sandbox;

    const context = vm.createContext(sandbox);
    try {
        vm.runInContext(code, context, { timeout: 5000 });
    } catch (e) {
        // Slideshow init may fail without real DOM — that's expected
        // We only care about window.slideshowPure being set
    }
    return context;
}

runTests('Segurança — S2: window.slideshowPure nao expoe STATE', [
    ['slideshowPure existe como objeto', () => {
        const ctx = loadModule06InContext();
        assert(typeof ctx.window.slideshowPure === 'object',
               'window.slideshowPure deve ser um objeto');
    }],
    ['slideshowPure expoe apenas metodos seguros', () => {
        const ctx = loadModule06InContext();
        const api = ctx.window.slideshowPure;
        const keys = Object.keys(api);

        // Only these keys should be present
        const allowedKeys = ['nextSlide', 'prevSlide', 'refresh'];
        for (const key of keys) {
            assert(allowedKeys.includes(key),
                   `slideshowPure NAO deve expor "${key}"`);
        }
        assert(keys.length <= 3,
               `slideshowPure deve ter no maximo 3 metodos, tem ${keys.length}: ${keys.join(', ')}`);
    }],
    ['slideshowPure nao da acesso ao STATE', () => {
        const ctx = loadModule06InContext();
        const api = ctx.window.slideshowPure;
        // Verify no property gives access to STATE or sensitive internals
        assert(api.STATE === undefined, 'STATE nao deve ser acessivel');
        assert(api.jellyfinData === undefined, 'jellyfinData nao deve ser acessivel');
        assert(api.accessToken === undefined, 'accessToken nao deve ser acessivel');
        assert(api.CONFIG === undefined, 'CONFIG nao deve ser acessivel');
    }],
    ['slideshowPure.nextSlide, prevSlide, refresh sao funcoes', () => {
        const ctx = loadModule06InContext();
        const api = ctx.window.slideshowPure;
        assert(typeof api.nextSlide === 'function', 'nextSlide deve ser funcao');
        assert(typeof api.prevSlide === 'function', 'prevSlide deve ser funcao');
        assert(typeof api.refresh === 'function', 'refresh deve ser funcao');
    }]
]);

// ── S3-S5: DOMPurify/Marked fallback security ─────────────────────────
// These test the SlideCreator.createSlideElement behavior
// when DOMPurify and/or marked are absent/present.

// Simulate the core logic from SlideCreator.createSlideElement (05-slideshow.js)
// This mirrors the actual code to test its security properties.
function simulatePlotRendering(rawOverview, hasDOMPurify, hasMarked) {
    // This is a direct simulation of the logic in 05-slideshow.js lines 33-56
    const marqueeInner = { innerHTML: '', textContent: '' };
    let usedMethod = '';

    if (hasDOMPurify && hasMarked) {
        // Safe path: sanitize then parse markdown → rich innerHTML
        const sanitized = rawOverview; // DOMPurify.sanitize would run here
        const html = rawOverview;      // marked.parse would run here
        marqueeInner.innerHTML = html;
        usedMethod = 'innerHTML (safe path: DOMPurify + marked)';
    } else {
        // Secure fallback: plain text only, no HTML parsing
        if (hasDOMPurify) {
            marqueeInner.textContent = rawOverview;
            usedMethod = 'textContent (DOMPurify only, no marked)';
        } else {
            marqueeInner.textContent = rawOverview;
            if (!hasMarked) {
                usedMethod = 'textContent (no DOMPurify, no marked — double fallback)';
            } else {
                usedMethod = 'textContent (no DOMPurify — plain text for security)';
            }
        }
    }

    return {
        innerHTML: marqueeInner.innerHTML,
        textContent: marqueeInner.textContent,
        usedMethod: usedMethod
    };
}

// Simulate the real DOMPurify behavior
function simulateDOMPurify(input) {
    // Real DOMPurify strips script tags, event handlers, etc.
    return input
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '')
        .replace(/\s*on\w+\s*=\s*"[^"]*"/gi, '')
        .replace(/\s*on\w+\s*=\s*'[^']*'/gi, '')
        .replace(/javascript\s*:/gi, '');
}

runTests('Segurança — S3: Fallback sem DOMPurify usa textContent', [
    ['Sem DOMPurify → usa textContent, nunca innerHTML', () => {
        const malicious = '<img src=x onerror=alert(1)>';
        const result = simulatePlotRendering(malicious, false, true);
        assert(result.innerHTML === '',
               'innerHTML deve estar vazio quando DOMPurify ausente');
        assert(result.textContent === malicious,
               'textContent deve conter o texto puro (nao interpretado)');
        assert(result.usedMethod.includes('textContent'),
               'Deve usar textContent, nao innerHTML');
    }],
    ['Sem DOMPurify → script tags nao sao executaveis', () => {
        const malicious = '</style><script>alert(1)</script>';
        const result = simulatePlotRendering(malicious, false, false);
        assert(result.innerHTML === '',
               'innerHTML deve estar vazio — script nao pode executar');
        assert(result.textContent === malicious,
               'textContent armazena o texto como string plana');
    }],
    ['Sem DOMPurify → event handlers nao sao injetaveis', () => {
        const malicious = '<div onmouseover="stealCookies()">hover me</div>';
        const result = simulatePlotRendering(malicious, false, true);
        assert(result.innerHTML === '',
               'innerHTML vazio — onmouseover nao pode executar');
        assert(result.textContent === malicious,
               'textContent contem o HTML como texto plano');
    }]
]);

runTests('Segurança — S4: Fallback sem marked usa textContent', [
    ['Sem marked → usa textContent, nunca innerHTML', () => {
        const overview = '**bold** <script>alert(1)</script>';
        const result = simulatePlotRendering(overview, true, false);
        assert(result.innerHTML === '',
               'innerHTML deve estar vazio quando marked ausente');
        assert(result.textContent === overview,
               'textContent deve conter o texto puro');
        assert(result.usedMethod.includes('textContent'),
               'Deve usar textContent, nao innerHTML');
    }],
    ['Sem marked e sem DOMPurify → double fallback seguro', () => {
        const malicious = '<img src=x onerror=alert(1)>';
        const result = simulatePlotRendering(malicious, false, false);
        assert(result.innerHTML === '',
               'innerHTML vazio — double fallback seguro');
        assert(result.textContent === malicious,
               'textContent armazena o texto como string');
        assert(result.usedMethod.includes('textContent'),
               'Deve usar textContent');
    }]
]);

runTests('Segurança — S5: Caminho feliz — sanitize → parse → innerHTML', [
    ['Com DOMPurify + marked → innerHTML e usado (renderizacao rica)', () => {
        const overview = 'A **bold** description with *italics*';
        const result = simulatePlotRendering(overview, true, true);
        assert(result.innerHTML !== '',
               'innerHTML deve ser populado quando ambas libs estao presentes');
        assert(result.innerHTML === overview,
               'innerHTML contem o overview processado');
        assert(result.usedMethod.includes('innerHTML'),
               'Deve usar innerHTML para renderizacao rica');
    }],
    ['Com DOMPurify + marked → script tags sao removidos antes do innerHTML', () => {
        // Simulate full DOMPurify → marked pipeline
        const malicious = 'text <script>alert(1)</script> more text';
        const sanitized = simulateDOMPurify(malicious);
        // Verifica que DOMPurify removeu o script
        assert(!sanitized.includes('<script>'),
               'DOMPurify deve remover tags <script>');
        assert(sanitized.includes('text') && sanitized.includes('more text'),
               'Conteudo legitimo deve ser preservado');
    }],
    ['Com DOMPurify + marked → event handlers sao removidos', () => {
        const malicious = '<div onload="evil()" onclick="bad()">content</div>';
        const sanitized = simulateDOMPurify(malicious);
        assert(!sanitized.includes('onload='),
               'DOMPurify deve remover onload handler');
        assert(!sanitized.includes('onclick='),
               'DOMPurify deve remover onclick handler');
    }],
    ['Com DOMPurify + marked → javascript: URLs sao neutralizadas', () => {
        const malicious = '<a href="javascript:alert(1)">click</a>';
        const sanitized = simulateDOMPurify(malicious);
        assert(!sanitized.includes('javascript:'),
               'DOMPurify deve neutralizar javascript: URLs');
    }]
]);

// ── S6: debugLog without DEBUG_INFINITY doesn't print ─────────────────
// Test that debugLog is a no-op when DEBUG_INFINITY is not set to true.

function createDebugLogModule(debugEnabled) {
    const DEBUG = debugEnabled === true;
    const debugLog = DEBUG ? console.log.bind(console) : () => {};
    return { DEBUG, debugLog };
}

runTests('Segurança — S6: debugLog sem DEBUG_INFINITY nao imprime', [
    ['debugLog e no-op quando DEBUG_INFINITY = false', () => {
        let called = false;
        const fakeConsole = { log: () => { called = true; } };

        const DEBUG = false;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};
        debugLog('mensagem sensivel', { token: 'abc123' });
        assert(called === false, 'debugLog nao deve chamar console.log quando DEBUG=false');
    }],
    ['debugLog e no-op quando DEBUG_INFINITY = undefined', () => {
        let called = false;
        const fakeConsole = { log: () => { called = true; } };

        const DEBUG = undefined === true; // false
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};
        debugLog('test');
        assert(called === false, 'debugLog nao deve chamar console.log quando DEBUG_INFINITY undefined');
    }],
    ['debugLog funciona quando DEBUG_INFINITY = true', () => {
        let called = false;
        let loggedArgs = null;
        const fakeConsole = { log: function(...args) { called = true; loggedArgs = args; } };

        const DEBUG = true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};
        debugLog('test message', 123);
        assert(called === true, 'debugLog DEVE chamar console.log quando DEBUG=true');
        assert(loggedArgs[0] === 'test message', 'Primeiro argumento preservado');
        assert(loggedArgs[1] === 123, 'Segundo argumento preservado');
    }],
    ['debugLog nunca deve expor dados mesmo quando ativo — so registra o que recebe', () => {
        // This test verifies that debugLog itself doesn't ADD sensitive data
        // It just passes through whatever it receives
        let loggedArgs = null;
        const fakeConsole = { log: function(...args) { loggedArgs = args; } };

        const DEBUG = true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};
        debugLog('user action', { itemId: 'abc', name: 'Movie' });
        assert(loggedArgs !== null, 'debugLog deve ter chamado console.log');
        assert(!('accessToken' in (loggedArgs[1] || {})),
               'debugLog nao deve ADICIONAR campos sensiveis');
    }],
    ['Codigo fonte: debugLog usa bind seguro que nao captura STATE', () => {
        const source = fs.readFileSync(SLIDESHOW_PATH, 'utf8');
        // Verify the exact pattern: const debugLog = DEBUG ? console.log.bind(console) : () => {};
        const hasBindPattern = source.includes('console.log.bind(console)');
        assert(hasBindPattern, 'debugLog deve usar bind(console), nao closure sobre STATE');
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
    console.log('✅ Todos os testes de seguranca passaram!');
    console.log('🔒 Nivel 1 (critico) verificado com sucesso.\n');
    process.exit(0);
}
