#!/usr/bin/env node
/**
 * Infinity Theme — Integration Tests: ApiUtils + initJellyfinData
 *
 * Tests I1-I9: fetchItemDetails, fetchItemIdsFromList, getAuthHeaders,
 * addThrottledRequest, initJellyfinData
 *
 * Run: node test/integration/api.test.js
 */

// ── Mock: STATE ──────────────────────────────────────────────────────
const STATE = {
    jellyfinData: {
        userId: 'test-user-123', appName: 'Jellyfin Web',
        appVersion: '10.9.0', deviceName: 'Test Browser',
        deviceId: 'test-device-456', accessToken: 'fake-token-abc',
        serverAddress: 'https://jellyfin.example.com', serverId: 'server-789',
    },
    slideshow: { loadedItems: {}, hasInitialized: false }
};

const CONFIG = { maxItems: 500, retryInterval: 500 };

// ── ApiUtils (extracted from 03-api-timer.js) ─────────────────────────
const ApiUtils = {
    async fetchItemDetails(itemId) {
        if (STATE.slideshow.loadedItems[itemId]) return STATE.slideshow.loadedItems[itemId];
        const url = `${STATE.jellyfinData.serverAddress}/Users/${STATE.jellyfinData.userId}/Items/${itemId}?fields=Overview,Genres`;
        try {
            const r = await fetch(url, { headers: this.getAuthHeaders() });
            if (!r.ok) throw new Error(`HTTP ${r.status}`);
            const d = await r.json();
            STATE.slideshow.loadedItems[itemId] = d;
            return d;
        } catch (e) { console.error(`Error:`, e.message); return null; }
    },
    async fetchItemIdsFromList() {
        const url = `${STATE.jellyfinData.serverAddress}/web/list.txt?userId=${STATE.jellyfinData.userId}&v=${Date.now()}`;
        try {
            const r = await fetch(url, { cache: 'no-cache' });
            if (!r.ok) { console.warn(`list.txt failed (${r.status})`); return []; }
            const t = await r.text();
            return t.split("\n").map(id => id.trim()).filter(id => id);
        } catch (e) { console.error("Error list.txt:", e.message); return []; }
    },
    getAuthHeaders() {
        const { appName, deviceName, deviceId, appVersion, accessToken } = STATE.jellyfinData;
        return { 'Authorization': `MediaBrowser Client="${appName}", Device="${deviceName}", DeviceId="${deviceId}", Version="${appVersion}", Token="${accessToken}"`, 'Accept': 'application/json' };
    },
};

// ── Request queue (from 01-state-auth.js) ────────────────────────────
const requestQueue = [];
let isProcessingQueue = false;
const processNextRequest = () => {
    if (requestQueue.length === 0) { isProcessingQueue = false; return; }
    isProcessingQueue = true;
    const { url, callback } = requestQueue.shift();
    fetch(url).then(r => r.ok ? r : Promise.reject(new Error(`Failed: ${r.status}`)))
        .then(callback).catch(e => console.error("Throttle error:", e.message))
        .finally(() => setTimeout(processNextRequest, 100));
};
const addThrottledRequest = (url, cb) => { requestQueue.push({ url, callback: cb }); if (!isProcessingQueue) processNextRequest(); };

// ── initJellyfinData (01-state-auth.js) ──────────────────────────────
function initJellyfinData(apiClient, callback) {
    if (!apiClient) {
        setTimeout(() => initJellyfinData(apiClient, callback), CONFIG.retryInterval);
        return;
    }
    try {
        STATE.jellyfinData = {
            userId: apiClient.getCurrentUserId() || "Not Found",
            appName: apiClient._appName || "Not Found",
            appVersion: apiClient._appVersion || "Not Found",
            deviceName: apiClient._deviceName || "Not Found",
            deviceId: apiClient._deviceId || "Not Found",
            accessToken: apiClient._serverInfo.AccessToken || "Not Found",
            serverId: apiClient._serverInfo.Id || "Not Found",
            serverAddress: apiClient._serverAddress || "Not Found",
        };
        if (STATE.jellyfinData.userId === "Not Found" || STATE.jellyfinData.accessToken === "Not Found")
            throw new Error("Missing credentials");
        if (callback) callback();
    } catch (e) { setTimeout(() => initJellyfinData(apiClient, callback), CONFIG.retryInterval * 2); }
}

// ── Test runner (serial async) ───────────────────────────────────────
let passed = 0, failed = 0;
const failures = [];

function assert(ok, msg) {
    if (ok) passed++; else { failed++; const m = `FAIL: ${msg}`; failures.push(m); console.error(`  ✗ ${m}`); }
}

const suiteQueue = [];

function runTests(name, tests) {
    suiteQueue.push({ name, tests });
}

function runAllSuites(index = 0) {
    if (index >= suiteQueue.length) {
        // All suites done — print summary
        setTimeout(() => {
            console.log('\n' + '='.repeat(60));
            console.log(`\n📊 RESULTADO: ${passed} passaram, ${failed} falharam`);
            if (failures.length > 0) { console.log('\n❌ FALHAS:'); failures.forEach(f => console.log(`  ${f}`)); process.exit(1); }
            else { console.log('✅ Todos os testes de integracao passaram!\n'); process.exit(0); }
        }, 200);
        return;
    }

    const { name, tests } = suiteQueue[index];
    console.log(`\n📋 ${name}`);
    let i = 0;

    function nextTest() {
        if (i >= tests.length) { runAllSuites(index + 1); return; }
        const [desc, fn] = tests[i++];
        try {
            if (fn.length === 1) { // done callback
                fn(err => {
                    if (err) { failed++; const m = `  ✗ ${desc} — ${err.message}`; console.error(m); failures.push(m); }
                    else if (!failures.some(f => f.includes(desc))) { console.log(`  ✓ ${desc}`); passed++; }
                    nextTest();
                });
            } else {
                const r = fn();
                if (r instanceof Promise) {
                    r.then(() => { if (!failures.some(f => f.includes(desc))) { console.log(`  ✓ ${desc}`); passed++; } nextTest(); })
                     .catch(e => { failed++; const m = `  ✗ ${desc} — ${e.message}`; console.error(m); failures.push(m); nextTest(); });
                } else {
                    if (!failures.some(f => f.includes(desc))) { console.log(`  ✓ ${desc}`); passed++; }
                    nextTest();
                }
            }
        } catch (e) { failed++; const m = `  ✗ ${desc} — ${e.message}`; console.error(m); failures.push(m); nextTest(); }
    }
    nextTest();
}

function mockFetch(responseFactory) {
    return async (url, opts) => {
        const r = responseFactory(url, opts);
        return { ok: r.ok !== false, status: r.status || 200, json: async () => r.json || {}, text: async () => r.text || '' };
    };
}

function resetState() { STATE.slideshow.loadedItems = {}; requestQueue.length = 0; isProcessingQueue = false; }

// ── I1: cache hit ─────────────────────────────────────────────────────
runTests('I1: fetchItemDetails() cache hit', [
    ['segundo acesso retorna cache, sem fetch', async () => {
        resetState(); let calls = 0;
        global.fetch = mockFetch(u => { calls++; return { ok: true, json: { Id: 'i1', Name: 'M1' } }; });
        await ApiUtils.fetchItemDetails('i1');
        assert(calls === 1, `1 fetch, foi ${calls}`);
        await ApiUtils.fetchItemDetails('i1');
        assert(calls === 1, `cache hit, ainda 1 fetch, foi ${calls}`);
    }],
    ['cache retorna mesmo objeto', async () => {
        resetState();
        global.fetch = mockFetch(u => ({ ok: true, json: { Id: 'i2', Name: 'Cached' } }));
        const a = await ApiUtils.fetchItemDetails('i2');
        const b = await ApiUtils.fetchItemDetails('i2');
        assert(a === b, 'mesma referencia');
        assert(a.Name === 'Cached', 'nome ok');
    }]
]);

// ── I2: cache miss ────────────────────────────────────────────────────
runTests('I2: fetchItemDetails() cache miss', [
    ['fetch bem-sucedido armazena no cache', async () => {
        resetState();
        global.fetch = mockFetch(u => ({ ok: true, json: { Id: 'i3', Name: 'New' } }));
        const r = await ApiUtils.fetchItemDetails('i3');
        assert(r !== null, 'nao null');
        assert(r.Id === 'i3', 'ID ok');
        assert(STATE.slideshow.loadedItems['i3'] !== undefined, 'no cache');
        assert(STATE.slideshow.loadedItems['i3'] === r, 'mesmo obj');
    }],
    ['usa headers de autenticacao', async () => {
        resetState(); let h = null;
        global.fetch = async (url, opts) => { h = opts.headers; return { ok: true, json: async () => ({ Id: 'i4' }), status: 200 }; };
        await ApiUtils.fetchItemDetails('i4');
        assert(h !== null, 'headers enviados');
        assert(h['Authorization'].includes('Token="fake-token-abc"'), 'token presente');
    }]
]);

// ── I3: error ─────────────────────────────────────────────────────────
runTests('I3: fetchItemDetails() error', [
    ['404 → null', async () => {
        resetState(); global.fetch = mockFetch(u => ({ ok: false, status: 404 }));
        assert(await ApiUtils.fetchItemDetails('nope') === null, '404 → null');
        assert(STATE.slideshow.loadedItems['nope'] === undefined, 'nao cacheia erro');
    }],
    ['Network error → null', async () => {
        resetState(); global.fetch = async () => { throw new Error('Network error'); };
        assert(await ApiUtils.fetchItemDetails('crash') === null, 'network error → null');
    }],
    ['500 → null', async () => {
        resetState(); global.fetch = mockFetch(u => ({ ok: false, status: 500 }));
        assert(await ApiUtils.fetchItemDetails('srv') === null, '500 → null');
    }]
]);

// ── I4: list.txt success ──────────────────────────────────────────────
runTests('I4: fetchItemIdsFromList() success', [
    ['parse de list.txt', async () => {
        resetState();
        global.fetch = mockFetch(u => ({ ok: true, text: 'id-1\nid-2\nid-3\n\n  id-4  \n' }));
        const ids = await ApiUtils.fetchItemIdsFromList();
        assert(ids.length === 4, `4 IDs, foi ${ids.length}`);
        assert(ids[0] === 'id-1', 'id[0]');
        assert(ids[3] === 'id-4', 'id[3] trim ok');
    }],
    ['uma linha', async () => {
        resetState(); global.fetch = mockFetch(u => ({ ok: true, text: 'single\n' }));
        const ids = await ApiUtils.fetchItemIdsFromList();
        assert(ids.length === 1 && ids[0] === 'single', 'unico ID');
    }]
]);

// ── I5: list.txt empty ────────────────────────────────────────────────
runTests('I5: fetchItemIdsFromList() empty', [
    ['vazio → []', async () => {
        resetState(); global.fetch = mockFetch(u => ({ ok: true, text: '' }));
        assert((await ApiUtils.fetchItemIdsFromList()).length === 0, 'vazio');
    }],
    ['so whitespace → []', async () => {
        resetState(); global.fetch = mockFetch(u => ({ ok: true, text: '\n  \n\n' }));
        assert((await ApiUtils.fetchItemIdsFromList()).length === 0, 'whitespace');
    }],
    ['404 → []', async () => {
        resetState(); global.fetch = mockFetch(u => ({ ok: false, status: 404 }));
        assert((await ApiUtils.fetchItemIdsFromList()).length === 0, '404→[]');
    }]
]);

// ── I6: getAuthHeaders ────────────────────────────────────────────────
runTests('I6: getAuthHeaders() format', [
    ['formato MediaBrowser', () => {
        const h = ApiUtils.getAuthHeaders();
        const a = h['Authorization'];
        assert(a.startsWith('MediaBrowser '), 'prefixo');
        assert(a.includes('Client="Jellyfin Web"'), 'Client');
        assert(a.includes('Token="fake-token-abc"'), 'Token');
    }],
    ['Accept json', () => { assert(ApiUtils.getAuthHeaders()['Accept'] === 'application/json', 'Accept'); }],
    ['2 headers apenas', () => { assert(Object.keys(ApiUtils.getAuthHeaders()).length === 2, 'so 2'); }]
]);

// ── I7: addThrottledRequest ──────────────────────────────────────────
runTests('I7: addThrottledRequest() enfileira', [
    ['adiciona na fila e processa', (done) => {
        resetState();
        assert(requestQueue.length === 0, 'fila vazia');
        let processed = false;
        global.fetch = mockFetch(u => { processed = true; return { ok: true, json: {} }; });

        addThrottledRequest('https://t.co/a', () => {
            assert(processed, 'foi processado');
            done();
        });
    }],
    ['multiplas em sequencia', (done) => {
        resetState();
        const order = [];
        global.fetch = mockFetch(u => { order.push(u); return { ok: true, json: {} }; });

        addThrottledRequest('https://t.co/1', () => {});
        addThrottledRequest('https://t.co/2', () => {});

        setTimeout(() => {
            assert(order.length >= 1, `ao menos 1, foi ${order.length}`);
            if (order.length >= 2) { assert(order[0] === 'https://t.co/1', 'ordem 1'); assert(order[1] === 'https://t.co/2', 'ordem 2'); }
            done();
        }, 400);
    }]
]);

// ── I8: initJellyfinData com ApiClient ────────────────────────────────
function mkApiClient(overrides = {}) {
    return {
        _currentUser: { Id: 'u1', ...overrides._currentUser },
        _serverInfo: { Id: 's1', AccessToken: 'tok', ...overrides._serverInfo },
        _appName: 'JF', _appVersion: '10.9', _deviceName: 'Chrome',
        _deviceId: 'd1', _serverAddress: 'https://jf.local',
        getCurrentUserId() { return this._currentUser?.Id; },
        ...overrides,
    };
}

// For I8-I9, we test initJellyfinData logic directly without triggering retry loops.
// We save/restore STATE.jellyfinData and global.setTimeout around each test.

runTests('I8: initJellyfinData() com ApiClient', [
    ['extrai dados corretamente', () => {
        const saveState = { ...STATE.jellyfinData };
        // Disable setTimeout for this test to prevent any retry
        const origST = global.setTimeout;
        global.setTimeout = (fn, d) => { /* no-op: prevent retry loop */ return 1; };

        initJellyfinData(mkApiClient(), () => {
            assert(STATE.jellyfinData.userId === 'u1', `userId: ${STATE.jellyfinData.userId}`);
            assert(STATE.jellyfinData.accessToken === 'tok', `token: ${STATE.jellyfinData.accessToken}`);
            assert(STATE.jellyfinData.appName === 'JF', `appName: ${STATE.jellyfinData.appName}`);
        });

        global.setTimeout = origST;
        STATE.jellyfinData = saveState;
    }],
    ['callback chamado sincrono', () => {
        const saveState = { ...STATE.jellyfinData };
        const origST = global.setTimeout;
        global.setTimeout = () => 1;

        let called = false;
        initJellyfinData(mkApiClient(), () => { called = true; });
        assert(called, 'callback sincrono');

        global.setTimeout = origST;
        STATE.jellyfinData = saveState;
    }],
    ['campos ausentes → "Not Found"', () => {
        const saveState = { ...STATE.jellyfinData };
        const origST = global.setTimeout;
        global.setTimeout = () => 1;

        initJellyfinData(mkApiClient({ _appName: undefined, _serverAddress: undefined }), () => {
            assert(STATE.jellyfinData.appName === 'Not Found', `appName: ${STATE.jellyfinData.appName}`);
        });

        global.setTimeout = origST;
        STATE.jellyfinData = saveState;
    }]
]);

// ── I9: initJellyfinData sem ApiClient ────────────────────────────────
runTests('I9: initJellyfinData() sem ApiClient', [
    ['retry com retryInterval', () => {
        const origST = global.setTimeout;
        let capturedDelay = null;
        let capturedFn = null;

        global.setTimeout = (fn, d) => {
            capturedFn = fn;
            capturedDelay = d;
            // NAO chamar fn — evitaria loop infinito
            return 1;
        };

        initJellyfinData(null, () => {});
        assert(capturedDelay === CONFIG.retryInterval, `delay=${capturedDelay}`);

        global.setTimeout = origST;
    }],
    ['sem ApiClient nao chama callback', () => {
        const origST = global.setTimeout;
        let callbackCalled = false;
        global.setTimeout = () => 1;

        initJellyfinData(null, () => { callbackCalled = true; });
        assert(!callbackCalled, 'callback nao chamado');

        global.setTimeout = origST;
    }],
    ['credenciais ausentes → retry com backoff', () => {
        const origST = global.setTimeout;
        let capturedDelay = null;

        global.setTimeout = (fn, d) => {
            capturedDelay = d;
            return 1; // no-op: prevent retry recursion
        };

        initJellyfinData(mkApiClient({
            _currentUser: { Id: '' },
            _serverInfo: { Id: 's', AccessToken: '' }
        }), () => {});

        assert(capturedDelay === CONFIG.retryInterval * 2, `backoff=${capturedDelay}`);

        global.setTimeout = origST;
    }]
]);

// ── Kickoff ─────────────────────────────────────────────────────────
runAllSuites();
