#!/usr/bin/env node
/**
 * Infinity Theme — Unit Tests: SlideUtils
 *
 * Tests U6-U11: shuffleArray, parseGenres, createElement, truncateText
 * from js/modules/02-loading-utils.js
 *
 * Run: node test/unit/utils.test.js
 */

// ── SlideUtils (extracted from 02-loading-utils.js) ───────────────────
const SlideUtils = {
    shuffleArray(array) {
        const newArray = [...array];
        for (let i = newArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [newArray[i], newArray[j]] = [newArray[j], newArray[i]];
        }
        return newArray;
    },
    truncateText(element, maxLength) {
        if (!element) return;
        const text = element.innerText || element.textContent;
        if (text && text.length > maxLength) {
            element.innerText = text.substring(0, maxLength) + "...";
        }
    },
    createSeparator() {
        const separator = { className: "", tagName: "i", innerHTML: "" };
        separator.className = "material-icons fiber_manual_record separator-icon";
        return separator;
    },
    createElement(tag, attributes = {}, content = null) {
        const element = {
            tagName: tag,
            textContent: "",
            className: "",
            innerHTML: "",
            style: {},
            _attributes: {},
            childNodes: [],
            setAttribute(key, value) { this._attributes[key] = value; },
            getAttribute(key) { return this._attributes[key]; },
            appendChild(child) { this.childNodes.push(child); },
            addEventListener() {},
            removeEventListener() {}
        };
        Object.entries(attributes).forEach(([key, value]) => {
            if (key === "style" && typeof value === "object") {
                Object.assign(element.style, value);
            } else if (key === "className") {
                element.className = value;
            } else if (key === "innerHTML") {
                element.innerHTML = value;
            } else if (key === "onclick" && typeof value === "function") {
                element.addEventListener("click", value);
            } else if (value !== null && value !== undefined) {
                element.setAttribute(key, value);
            }
        });
        if (content) {
            if (typeof content === "string") {
                element.textContent = content;
            } else if (content && typeof content === "object") {
                element.appendChild(content);
            }
        }
        return element;
    },
    parseGenres(genresArray) {
        if (Array.isArray(genresArray) && genresArray.length > 0) {
            return genresArray.slice(0, 3).join(" ▫️ ");
        }
        return "No Genre Available";
    },
};

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

// ── U6: shuffleArray() nao modifica original ──────────────────────────
runTests('U6: shuffleArray() nao modifica original', [
    ['array original intacto apos shuffle', () => {
        const original = [1, 2, 3, 4, 5];
        const copy = [...original];
        SlideUtils.shuffleArray(original);
        assert(original.length === copy.length, 'tamanho do original preservado');
        for (let i = 0; i < original.length; i++) {
            assert(original[i] === copy[i], `original[${i}] = ${original[i]}, esperado ${copy[i]}`);
        }
    }],
    ['shuffle retorna novo array (referencia diferente)', () => {
        const original = [1, 2, 3, 4, 5];
        const result = SlideUtils.shuffleArray(original);
        assert(result !== original, 'retorna nova referencia, nao a original');
    }],
    ['array vazio shuffle retorna array vazio', () => {
        const original = [];
        const result = SlideUtils.shuffleArray(original);
        assert(result.length === 0, 'array vazio → array vazio');
        assert(result !== original, 'nova referencia mesmo para array vazio');
    }]
]);

// ── U7: shuffleArray() contem mesmos elementos ────────────────────────
runTests('U7: shuffleArray() contem mesmos elementos', [
    ['todos os elementos presentes apos shuffle', () => {
        const original = [10, 20, 30, 40, 50];
        const result = SlideUtils.shuffleArray(original);
        assert(result.length === original.length, 'mesmo tamanho');
        const sortedOriginal = [...original].sort((a, b) => a - b);
        const sortedResult = [...result].sort((a, b) => a - b);
        for (let i = 0; i < sortedOriginal.length; i++) {
            assert(sortedResult[i] === sortedOriginal[i], `elemento ${sortedResult[i]} presente`);
        }
    }],
    ['strings embaralhadas mantem todos os elementos', () => {
        const original = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
        const result = SlideUtils.shuffleArray(original);
        const sorted = [...result].sort();
        assert(sorted.join(',') === 'a,b,c,d,e,f,g,h', 'todos os caracteres presentes');
    }],
    ['array de 1 elemento retorna igual', () => {
        const result = SlideUtils.shuffleArray([42]);
        assert(result.length === 1, 'tamanho 1');
        assert(result[0] === 42, 'elemento preservado');
    }]
]);

// ── U8: parseGenres() limita a 3 ─────────────────────────────────────
runTests('U8: parseGenres() limita a 3', [
    ['5 generos → retorna 3', () => {
        const result = SlideUtils.parseGenres(['Action', 'Drama', 'Sci-Fi', 'Thriller', 'Comedy']);
        const parts = result.split(' ▫️ ');
        assert(parts.length === 3, `retorna 3 generos, nao ${parts.length}: "${result}"`);
        assert(parts[0] === 'Action', 'primeiro genero preservado');
        assert(parts[1] === 'Drama', 'segundo genero preservado');
        assert(parts[2] === 'Sci-Fi', 'terceiro genero preservado');
    }],
    ['3 generos → retorna 3', () => {
        const result = SlideUtils.parseGenres(['Action', 'Drama', 'Comedy']);
        const parts = result.split(' ▫️ ');
        assert(parts.length === 3, '3 generos → 3');
    }],
    ['1 genero → retorna 1', () => {
        const result = SlideUtils.parseGenres(['Horror']);
        assert(!result.includes('▫️'), 'sem separador para 1 genero');
        assert(result === 'Horror', 'unico genero retornado');
    }]
]);

// ── U9: parseGenres() array vazio ────────────────────────────────────
runTests('U9: parseGenres() array vazio', [
    ['array vazio retorna "No Genre Available"', () => {
        const result = SlideUtils.parseGenres([]);
        assert(result === 'No Genre Available', `esperado "No Genre Available", recebido "${result}"`);
    }],
    ['null retorna "No Genre Available"', () => {
        const result = SlideUtils.parseGenres(null);
        assert(result === 'No Genre Available', 'null → fallback');
    }],
    ['undefined retorna "No Genre Available"', () => {
        const result = SlideUtils.parseGenres(undefined);
        assert(result === 'No Genre Available', 'undefined → fallback');
    }],
    ['nao-array retorna "No Genre Available"', () => {
        const result = SlideUtils.parseGenres("not an array");
        assert(result === 'No Genre Available', 'string → fallback');
    }]
]);

// ── U10: createElement() com atributos ────────────────────────────────
runTests('U10: createElement() com atributos', [
    ['cria elemento com tag correta', () => {
        const el = SlideUtils.createElement('div');
        assert(el.tagName === 'div', 'tagName = div');
    }],
    ['cria elemento com className', () => {
        const el = SlideUtils.createElement('div', { className: 'my-class' });
        assert(el.className === 'my-class', 'className definido');
    }],
    ['cria elemento com innerHTML', () => {
        const el = SlideUtils.createElement('div', { innerHTML: '<span>hi</span>' });
        assert(el.innerHTML === '<span>hi</span>', 'innerHTML definido');
    }],
    ['cria elemento com atributos customizados', () => {
        const el = SlideUtils.createElement('button', { tabIndex: "0", "data-id": "abc123" });
        assert(el.getAttribute('tabIndex') === "0", 'tabIndex definido');
        assert(el.getAttribute('data-id') === "abc123", 'data-id definido');
    }],
    ['cria elemento com content string', () => {
        const el = SlideUtils.createElement('span', {}, 'Hello World');
        assert(el.textContent === 'Hello World', 'textContent definido');
    }],
    ['cria elemento com style object', () => {
        const el = SlideUtils.createElement('div', { style: { color: 'red', fontSize: '14px' } });
        assert(el.style.color === 'red', 'style.color definido');
        assert(el.style.fontSize === '14px', 'style.fontSize definido');
    }]
]);

// ── U11: truncateText() trunca ───────────────────────────────────────
runTests('U11: truncateText() trunca', [
    ['texto > maxLength ganha "..."', () => {
        const element = { innerText: 'This is a very long text that should be truncated' };
        SlideUtils.truncateText(element, 20);
        assert(element.innerText.endsWith('...'), 'termina com ...');
        assert(element.innerText.length === 23, `tamanho = 20 + 3 = 23, recebido ${element.innerText.length}`);
        assert(element.innerText === 'This is a very long ...', 'texto truncado corretamente');
    }],
    ['texto <= maxLength nao e alterado', () => {
        const element = { innerText: 'Short text' };
        const original = element.innerText;
        SlideUtils.truncateText(element, 20);
        assert(element.innerText === original, 'texto curto preservado');
    }],
    ['elemento null nao quebra', () => {
        let errored = false;
        try {
            SlideUtils.truncateText(null, 20);
        } catch (e) {
            errored = true;
        }
        assert(!errored, 'truncateText(null) nao deve lancar erro');
    }],
    ['texto exatamente no limite nao e truncado', () => {
        const element = { innerText: 'Exactly ten!!' }; // 13 chars
        SlideUtils.truncateText(element, 13);
        assert(!element.innerText.endsWith('...'), 'texto no limite nao truncado');
        assert(element.innerText === 'Exactly ten!!', 'texto preservado');
    }],
    ['usa textContent como fallback', () => {
        const element = { textContent: 'Fallback text that is way too long for this test' };
        SlideUtils.truncateText(element, 15);
        assert(element.innerText === 'Fallback text t...', 'usa textContent como fallback');
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
    console.log('✅ Todos os testes do SlideUtils passaram!\n');
    process.exit(0);
}
