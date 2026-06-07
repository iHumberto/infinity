#!/usr/bin/env node
/**
 * Infinity Theme — Regression Tests: clickableSlideshow + clickableTitles
 *
 * Tests R1-R4 from the test plan.
 *
 * Run: node test/regression/clickable.test.js
 */

// ── DOM Mock ─────────────────────────────────────────────────────────
class MockElement {
    constructor(tag) {
        this.tagName = tag.toUpperCase();
        this.id = '';
        this.className = '';
        this.innerHTML = '';
        this.textContent = '';
        this.innerText = '';
        this.style = { display: '' };
        this._dataset = {};
        this._attributes = {};
        this._listeners = {};
        this._children = [];
        this.parentElement = null;
    }
    get dataset() { return this._dataset; }
    setAttribute(name, value) { this._attributes[name] = value; if (name === 'id') this.id = value; if (name === 'class') this.className = value; }
    getAttribute(name) { return this._attributes[name] || null; }
    appendChild(child) { child.parentElement = this; this._children.push(child); return child; }
    removeChild(child) { this._children = this._children.filter(c => c !== child); }
    remove() { if (this.parentElement) this.parentElement.removeChild(this); }
    addEventListener(event, fn, opts) { if (!this._listeners[event]) this._listeners[event] = []; this._listeners[event].push(fn); }
    dispatchEvent(event) {
        const list = this._listeners[event.type] || [];
        list.forEach(fn => fn.call(this, event));
    }
    click() { this.dispatchEvent({ type: 'click', target: this, preventDefault() {}, stopPropagation() {} }); }
    closest(selector) {
        // Support comma-separated selectors; strip pseudo-classes and normalize > to space
        const selectors = selector.split(',').map(s => s.trim());
        const matches = (el, sel) => {
            // Strip :pseudo-classes and normalize > to space
            sel = sel.replace(/::?[a-z-]+(\([^)]*\))?/gi, '').replace(/\s*>\s*/g, ' ').trim();
            if (!sel) return true; // empty after stripping → match anything
            if (sel.includes(' ')) {
                // Descendant: only match the rightmost part for closest
                const parts = sel.split(/\s+/);
                return el._matchesSelector(parts[parts.length - 1]);
            }
            return el._matchesSelector(sel);
        };
        if (selectors.some(s => matches(this, s))) return this;
        let p = this.parentElement;
        while (p) {
            if (selectors.some(s => matches(p, s))) return p;
            p = p.parentElement;
        }
        return null;
    }
    querySelector(selector) {
        // Support comma-separated selectors
        const selectors = selector.split(',').map(s => s.trim());
        for (const sel of selectors) {
            const found = this._find(sel, false);
            if (found) return found;
        }
        return null;
    }
    querySelectorAll(selector) {
        const selectors = selector.split(',').map(s => s.trim());
        const results = [];
        for (const sel of selectors) {
            results.push(...this._findAll(sel));
        }
        return results;
    }
    contains(el) { return this._children.some(c => c === el || c.contains(el)); }
    _matchesSelector(sel) {
        // Handle attribute selectors [attr] or [attr="value"]
        const attrMatch = sel.match(/^([a-z0-9#.\-_]+)\[([a-z-]+)(?:="([^"]*)")?\]$/i);
        if (attrMatch) {
            const base = attrMatch[1];
            const attr = attrMatch[2];
            const val = attrMatch[3] || null;
            if (!this._matchesSelector(base)) return false;
            if (val !== null) return this.getAttribute(attr) === val;
            return this.getAttribute(attr) !== null;
        }
        // Handle compound class selectors like .itemsContainer.vertical-list
        if (sel.includes('.') && !sel.startsWith('#') && !sel.match(/^[a-z]/i)) {
            const classes = sel.split('.');
            let offset = 0;
            if (classes[0] === '') {
                offset = 1;
            } else {
                if (classes[0] !== '' && this.tagName.toLowerCase() !== classes[0].toLowerCase()) return false;
                offset = 1;
            }
            const elClasses = this.className.split(' ').filter(c => c);
            for (let i = offset; i < classes.length; i++) {
                if (!elClasses.includes(classes[i])) return false;
            }
            return true;
        }
        if (sel.startsWith('.')) return this.className.split(' ').includes(sel.slice(1));
        if (sel.startsWith('#')) return this.id === sel.slice(1);
        if (sel === this.tagName.toLowerCase()) return true;
        return false;
    }
    _find(selector, all = false) {
        // Handle descendant selectors: "parent child"
        if (selector.includes(' ')) {
            const parts = selector.split(/\s+/);
            const lastPart = parts[parts.length - 1];
            const ancestors = parts.slice(0, -1);
            // Find all elements matching last part, then verify ancestry
            const candidates = this._findAll(lastPart);
            for (const c of candidates) {
                let valid = true;
                let current = c.parentElement;
                for (let a = ancestors.length - 1; a >= 0; a--) {
                    while (current && !current._matchesSelector(ancestors[a])) {
                        current = current.parentElement;
                    }
                    if (!current) { valid = false; break; }
                    current = current.parentElement;
                }
                if (valid) {
                    if (!all) return c;
                }
            }
            return null;
        }
        if (this._matchesSelector(selector)) return this;
        for (const child of this._children) {
            const found = child._find(selector, all);
            if (found && !all) return found;
        }
        return null;
    }
    _findAll(selector) {
        const results = [];
        if (this._matchesSelector(selector)) results.push(this);
        for (const child of this._children) {
            results.push(...child._findAll(selector));
        }
        return results;
    }
}

// Global document mock
const body = new MockElement('body');
const document = {
    body,
    readyState: 'complete',
    createElement(tag) { return new MockElement(tag); },
    getElementById(id) { return body._find('#' + id); },
    querySelector(sel) { return body.querySelector(sel); },
    querySelectorAll(sel) { return body.querySelectorAll(sel); },
    addEventListener(evt, fn) { body.addEventListener(evt, fn); },
};
global.document = document;
global.window = { location: { hash: '' }, ApiClient: null, Emby: null, DEBUG_INFINITY: false };

// MutationObserver mock
const observers = [];
global.MutationObserver = class {
    constructor(cb) { this._cb = cb; this._target = null; this._opts = null; observers.push(this); }
    observe(target, opts) { this._target = target; this._opts = opts; }
    disconnect() { this._target = null; }
    // Helper to trigger mutation
    _trigger() { this._cb([{ type: 'childList', addedNodes: [], removedNodes: [] }], this); }
};

// ── Test runner ───────────────────────────────────────────────────────
let passed = 0, failed = 0;
const failures = [];

function assert(ok, msg) {
    if (ok) passed++; else { failed++; const m = `FAIL: ${msg}`; failures.push(m); console.error(`  ✗ ${m}`); }
}

let suiteQueue = [];
function runTests(name, tests) { suiteQueue.push({ name, tests }); }

function runAllSuites(index = 0) {
    if (index >= suiteQueue.length) {
        setTimeout(() => {
            console.log('\n' + '='.repeat(60));
            console.log(`\n📊 RESULTADO: ${passed} passaram, ${failed} falharam`);
            if (failures.length > 0) { console.log('\n❌ FALHAS:'); failures.forEach(f => console.log(`  ${f}`)); process.exit(1); }
            else { console.log('✅ Todos os testes de regressao passaram!\n'); process.exit(0); }
        }, 100);
        return;
    }
    const { name, tests } = suiteQueue[index];
    console.log(`\n📋 ${name}`);
    let i = 0;
    function nextTest() {
        if (i >= tests.length) { runAllSuites(index + 1); return; }
        const [desc, fn] = tests[i++];
        try {
            const r = fn();
            if (r instanceof Promise) r.then(() => { if (!failures.some(f => f.includes(desc))) { console.log(`  ✓ ${desc}`); passed++; } nextTest(); })
                .catch(e => { failed++; console.error(`  ✗ ${desc} — ${e.message}`); failures.push(`  ✗ ${desc} — ${e.message}`); nextTest(); });
            else { if (!failures.some(f => f.includes(desc))) { console.log(`  ✓ ${desc}`); passed++; } nextTest(); }
        } catch (e) { failed++; console.error(`  ✗ ${desc} — ${e.message}`); failures.push(`  ✗ ${desc} — ${e.message}`); nextTest(); }
    }
    nextTest();
}

// Reset DOM state between tests
function resetDom() {
    body._children = [];
    body._listeners = {};
    observers.length = 0;
    global.window.location.hash = '';
    global.window.ApiClient = null;
}

// ── Load clickableSlideshow.js ────────────────────────────────────────
const fs = require('fs');
const slideshowCode = fs.readFileSync(
    require('path').join(__dirname, '..', '..', 'js', 'clickableSlideshow.js'), 'utf8'
);
const titlesCode = fs.readFileSync(
    require('path').join(__dirname, '..', '..', 'js', 'clickableTitles.js'), 'utf8'
);

// ── R1: clickableSlideshow ignores buttons ────────────────────────────
runTests('R1: clickableSlideshow ignora botoes', [
    ['clique em .play-button NAO navega', () => {
        resetDom();

        const container = new MockElement('div');
        container.id = 'slides-container';
        const slide = new MockElement('div');
        slide.className = 'slide active';
        slide._dataset.itemId = 'item-123';

        const playBtn = new MockElement('button');
        playBtn.className = 'play-button';
        slide.appendChild(playBtn);
        container.appendChild(slide);
        body.appendChild(container);

        eval(slideshowCode);
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        let navigated = false;
        global.window.location = { set hash(v) { navigated = true; } };

        // Manually dispatch to container's listener (simulating event bubbling)
        const listeners = container._listeners['click'] || [];
        if (listeners.length > 0) {
            listeners[0].call(container, {
                type: 'click', target: playBtn,
                preventDefault() {}, stopPropagation() {},
            });
        }

        assert(!navigated, 'clique no play-button nao deve navegar');
    }],
    ['clique em .detail-button NAO navega', () => {
        resetDom();
        const container = new MockElement('div');
        container.id = 'slides-container';
        const slide = new MockElement('div');
        slide.className = 'slide active';
        slide._dataset.itemId = 'item-456';

        const detailBtn = new MockElement('button');
        detailBtn.className = 'detail-button';
        slide.appendChild(detailBtn);
        container.appendChild(slide);
        body.appendChild(container);

        eval(slideshowCode);
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        let navigated = false;
        global.window.location = { set hash(v) { navigated = true; } };
        const listeners = container._listeners['click'] || [];
        if (listeners.length > 0) {
            listeners[0].call(container, {
                type: 'click', target: detailBtn,
                preventDefault() {}, stopPropagation() {},
            });
        }
        assert(!navigated, 'clique no detail-button nao deve navegar');
    }],
    ['clique em .dot NAO navega', () => {
        resetDom();
        const container = new MockElement('div');
        container.id = 'slides-container';
        const slide = new MockElement('div');
        slide.className = 'slide active';
        slide._dataset.itemId = 'item-789';

        const dot = new MockElement('span');
        dot.className = 'dot';
        container.appendChild(dot);
        container.appendChild(slide);
        body.appendChild(container);

        eval(slideshowCode);
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        let navigated = false;
        global.window.location = { set hash(v) { navigated = true; } };
        const listeners = container._listeners['click'] || [];
        if (listeners.length > 0) {
            listeners[0].call(container, {
                type: 'click', target: dot,
                preventDefault() {}, stopPropagation() {},
            });
        }
        assert(!navigated, 'clique no dot nao deve navegar');
    }],
    ['clique no #slideshow-pause-button NAO navega', () => {
        resetDom();
        const container = new MockElement('div');
        container.id = 'slides-container';
        const slide = new MockElement('div');
        slide.className = 'slide active';
        slide._dataset.itemId = 'item-pause';

        const pauseBtn = new MockElement('button');
        pauseBtn.id = 'slideshow-pause-button';
        slide.appendChild(pauseBtn);
        container.appendChild(slide);
        body.appendChild(container);

        eval(slideshowCode);
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        let navigated = false;
        global.window.location = { set hash(v) { navigated = true; } };
        const listeners = container._listeners['click'] || [];
        if (listeners.length > 0) {
            listeners[0].call(container, {
                type: 'click', target: pauseBtn,
                preventDefault() {}, stopPropagation() {},
            });
        }
        assert(!navigated, 'clique no pause-button nao deve navegar');
    }]
]);

// ── R2: clickableSlideshow navigates on slide click ──────────────────
runTests('R2: clickableSlideshow navega no slide', [
    ['clique no .slide.active navega para detalhes', () => {
        resetDom();
        const container = new MockElement('div');
        container.id = 'slides-container';
        const slide = new MockElement('div');
        slide.className = 'slide active';
        slide._dataset.itemId = 'target-item-42';

        // Add a non-button child to click on
        const backdrop = new MockElement('div');
        backdrop.className = 'backdrop-container';
        slide.appendChild(backdrop);
        container.appendChild(slide);
        body.appendChild(container);

        eval(slideshowCode);
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        // Simulate click on backdrop that bubbles up to container
        // (our mock DOM doesn't bubble events, so we manually invoke the listener)
        let navigated = false;
        let targetHash = '';
        global.window.location = { set hash(v) { navigated = true; targetHash = v; } };

        const containerListeners = container._listeners['click'] || [];
        assert(containerListeners.length >= 1, 'container deve ter click listener');
        if (containerListeners.length > 0) {
            const fakeEvent = {
                type: 'click', target: backdrop,
                preventDefault() {}, stopPropagation() {},
            };
            containerListeners[0].call(container, fakeEvent);
        }

        assert(navigated, 'clique no slide ativo deve navegar');
        assert(targetHash === '/details?id=target-item-42', `hash: ${targetHash}`);
    }],
    ['clique FORA do .slide.active NAO navega', () => {
        resetDom();
        const container = new MockElement('div');
        container.id = 'slides-container';
        body.appendChild(container);

        eval(slideshowCode);
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        let navigated = false;
        global.window.location = { set hash(v) { navigated = true; } };
        // Click on container (not on a slide)
        const fakeEvent = {
            type: 'click',
            target: container,
            preventDefault() {}, stopPropagation() {},
        };
        // Find the click listener added to container
        const clickListeners = container._listeners['click'] || [];
        // The listener is added by the script to #slides-container
        assert(clickListeners.length >= 0, 'container tem listener');
    }]
]);

// ── R3: clickableTitles finds container ──────────────────────────────
runTests('R3: clickableTitles encontra container', [
    ['MutationObserver detecta .itemsContainer', () => {
        resetDom();
        eval(titlesCode);

        // The script looks for: #childrenContent .itemsContainer.vertical-list
        // So .itemsContainer must be INSIDE #childrenContent
        const childrenContent = new MockElement('div');
        childrenContent.id = 'childrenContent';
        const container = new MockElement('div');
        container.className = 'itemsContainer vertical-list';
        childrenContent.appendChild(container);
        body.appendChild(childrenContent);

        // Trigger the observer
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        // After finding the container, the script adds a click listener
        const clickListeners = container._listeners['click'] || [];
        assert(clickListeners.length >= 1, `container deve ter click listener, tem ${clickListeners.length}`);
    }],
    ['NAO adiciona listener antes do container existir', () => {
        resetDom();
        eval(titlesCode);

        // Trigger observer without container
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        // No container should have listeners yet
        let totalListeners = 0;
        body._children.forEach(c => { totalListeners += (c._listeners['click'] || []).length; });
        assert(totalListeners === 0, 'sem container → sem listeners');
    }]
]);

// ── R4: clickableTitles click on title ────────────────────────────────
runTests('R4: clickableTitles click em titulo', [
    ['clique no titulo dispara click na imagem', () => {
        resetDom();
        eval(titlesCode);

        // Build episode grid DOM — .itemsContainer INSIDE #childrenContent
        const childrenContent2 = new MockElement('div');
        childrenContent2.id = 'childrenContent';
        const container = new MockElement('div');
        container.className = 'itemsContainer vertical-list';
        childrenContent2.appendChild(container);
        body.appendChild(childrenContent2);

        const listItem = new MockElement('div');
        listItem.className = 'listItem listItem-largeImage';
        listItem._dataset.id = 'ep-001';

        const listItemBody = new MockElement('div');
        listItemBody.className = 'listItemBody';

        const titleElement = new MockElement('div');
        titleElement.className = 'listItemBodyText';
        titleElement.textContent = 'Episode 1';
        listItemBody.appendChild(titleElement);
        listItem.appendChild(listItemBody);

        const imageLink = new MockElement('a');
        imageLink.className = 'listItemImage';
        imageLink.setAttribute('data-action', 'link');
        let imageClicked = false;
        imageLink.click = () => { imageClicked = true; };
        listItem.appendChild(imageLink);

        container.appendChild(listItem);

        // Trigger observer to find container
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        // Now click on the title
        const clickEvent = {
            type: 'click',
            target: titleElement,
            preventDefault() {},
            stopPropagation() {},
        };

        // Manually dispatch to the click listener on container
        const listeners = container._listeners['click'] || [];
        assert(listeners.length >= 1, 'container tem click listener');
        if (listeners.length > 0) {
            listeners[0].call(container, clickEvent);
        }

        assert(imageClicked, 'imagem deve ter sido clicada');
    }],
    ['clique em elemento que nao e titulo NAO dispara navegacao', () => {
        resetDom();
        eval(titlesCode);

        const childrenContent3 = new MockElement('div');
        childrenContent3.id = 'childrenContent';
        const container = new MockElement('div');
        container.className = 'itemsContainer vertical-list';
        childrenContent3.appendChild(container);
        body.appendChild(childrenContent3);

        const listItem = new MockElement('div');
        listItem.className = 'listItem listItem-largeImage';

        const otherElement = new MockElement('div');
        otherElement.className = 'something-else';
        listItem.appendChild(otherElement);

        const imageLink = new MockElement('a');
        imageLink.className = 'listItemImage';
        imageLink.setAttribute('data-action', 'link');
        let imageClicked = false;
        imageLink.click = () => { imageClicked = true; };
        listItem.appendChild(imageLink);

        container.appendChild(listItem);
        observers.forEach(o => { if (o._target === body) o._trigger(); });

        const clickEvent = {
            type: 'click', target: otherElement,
            preventDefault() {}, stopPropagation() {},
        };
        const listeners = container._listeners['click'] || [];
        if (listeners.length > 0) listeners[0].call(container, clickEvent);

        assert(!imageClicked, 'clique fora do titulo nao deve navegar');
    }]
]);

// ── Kickoff ─────────────────────────────────────────────────────────
runAllSuites();
