#!/usr/bin/env node
/**
 * Infinity Theme — Unit Tests: debugLog (state/debug)
 *
 * Tests U14-U15: debugLog behavior with and without DEBUG_INFINITY
 * from js/modules/01-state-auth.js
 *
 * Run: node test/unit/state.test.js
 */

// ── Simulação do debugLog (01-state-auth.js) ─────────────────────────
// const DEBUG = window.DEBUG_INFINITY === true;
// const debugLog = DEBUG ? console.log.bind(console) : () => {};

function createDebugLog(debugEnabled) {
    const DEBUG = debugEnabled === true;
    const debugLog = DEBUG ? console.log.bind(console) : () => {};
    return { DEBUG, debugLog };
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

// ── U14: debugLog com DEBUG_INFINITY=true chama console.log ────────────
runTests('U14: debugLog com DEBUG_INFINITY=true chama console.log', [
    ['DEBUG=true → debugLog chama console.log', () => {
        let called = false;
        let logArgs = null;
        const fakeConsole = { log: (...args) => { called = true; logArgs = args; } };

        // Simula o mesmo padrao do codigo fonte
        const DEBUG = true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};

        debugLog('test message');
        assert(called === true, 'console.log deve ser chamado quando DEBUG=true');
        assert(logArgs[0] === 'test message', 'mensagem passada corretamente');
    }],
    ['DEBUG=true → debugLog com multiplos argumentos', () => {
        let logArgs = null;
        const fakeConsole = { log: (...args) => { logArgs = args; } };

        const DEBUG = true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};

        debugLog('msg', 123, { key: 'value' });
        assert(logArgs.length === 3, '3 argumentos passados');
        assert(logArgs[0] === 'msg', 'arg 0');
        assert(logArgs[1] === 123, 'arg 1');
        assert(logArgs[2].key === 'value', 'arg 2 (objeto)');
    }],
    ['DEBUG=true → debugLog sem argumentos nao quebra', () => {
        let called = false;
        const fakeConsole = { log: () => { called = true; } };

        const DEBUG = true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};

        let errored = false;
        try { debugLog(); } catch (e) { errored = true; }
        assert(!errored, 'debugLog() sem args nao deve lancar erro');
        assert(called === true, 'console.log chamado mesmo sem args');
    }]
]);

// ── U15: debugLog sem DEBUG_INFINITY NAO chama console.log ────────────
runTests('U15: debugLog sem DEBUG_INFINITY NAO chama console.log', [
    ['DEBUG=false → debugLog e no-op', () => {
        let called = false;
        const fakeConsole = { log: () => { called = true; } };

        const DEBUG = false;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};

        debugLog('nao deve aparecer');
        debugLog('outra mensagem');
        assert(called === false, 'console.log NAO deve ser chamado quando DEBUG=false');
    }],
    ['DEBUG=undefined → debugLog e no-op', () => {
        let called = false;
        const fakeConsole = { log: () => { called = true; } };

        // undefined === true → false
        const DEBUG = undefined === true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};

        debugLog('test');
        assert(called === false, 'DEBUG undefined → no-op');
        assert(DEBUG === false, 'undefined === true resulta em false');
    }],
    ['DEBUG=null → debugLog e no-op', () => {
        let called = false;
        const fakeConsole = { log: () => { called = true; } };

        const DEBUG = null === true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};

        debugLog('test');
        assert(called === false, 'DEBUG null → no-op');
    }],
    ['DEBUG=0 → debugLog e no-op', () => {
        let called = false;
        const fakeConsole = { log: () => { called = true; } };

        const DEBUG = 0 === true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};

        debugLog('test');
        assert(called === false, 'DEBUG 0 → no-op (comparacao estrita)');
    }],
    ['DEBUG="true" → debugLog e no-op (string nao e boolean)', () => {
        let called = false;
        const fakeConsole = { log: () => { called = true; } };

        const DEBUG = "true" === true;
        const debugLog = DEBUG ? fakeConsole.log.bind(fakeConsole) : () => {};

        debugLog('test');
        assert(called === false, 'DEBUG "true" (string) → no-op');
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
    console.log('✅ Todos os testes de debugLog passaram!\n');
    process.exit(0);
}
