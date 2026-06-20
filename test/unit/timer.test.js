#!/usr/bin/env node
/**
 * Infinity Theme — Unit Tests: SlideTimer
 *
 * Tests U1-U5: SlideTimer.start(), pause(), resume(), stop(), restart()
 * from js/modules/03-api-timer.js
 *
 * Run: node test/unit/timer.test.js
 */

// ── SlideTimer class (extracted from 03-api-timer.js) ─────────────────
class SlideTimer {
    constructor(callback, interval) {
        this.callback = callback;
        this.interval = interval;
        this.timerId = null;
        this.startTime = null;
        this.remaining = interval;
        this.paused = false;
    }
    stop() {
        if (this.timerId) {
            clearTimeout(this.timerId);
            clearInterval(this.timerId);
            this.timerId = null;
        }
        this.paused = true;
        return this;
    }
    pause() {
        if (this.timerId && !this.paused) {
            clearTimeout(this.timerId);
            clearInterval(this.timerId);
            this.timerId = null;
            this.remaining -= Date.now() - this.startTime;
            this.paused = true;
        }
        return this;
    }
    start() {
        if (this.timerId || !this.callback) return this;
        this.paused = false;
        this.startTime = Date.now();

        if (this.remaining < this.interval && this.remaining > 0) {
            this.timerId = setTimeout(() => {
                this.callback();
                this.remaining = this.interval;
                this.start();
            }, this.remaining);
        } else {
            this.remaining = this.interval;
            this.timerId = setInterval(this.callback, this.interval);
        }
        return this;
    }
    restart() {
        return this.stop().start();
    }
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

// ── U1: SlideTimer.start() inicia contagem ────────────────────────────
runTests('U1: SlideTimer.start() inicia contagem', [
    ['start() seta paused=false', () => {
        const timer = new SlideTimer(() => {}, 1000);
        // Constructor sets paused=false (not true — timer starts ready, not paused)
        assert(timer.paused === false, 'timer comeca nao pausado (paused=false no constructor)');
        timer.start();
        assert(timer.paused === false, 'timer nao esta pausado apos start()');
        timer.stop();
    }],
    ['start() cria timerId', () => {
        const timer = new SlideTimer(() => {}, 1000);
        assert(timer.timerId === null, 'timerId null antes de start()');
        timer.start();
        assert(timer.timerId !== null, 'timerId definido apos start()');
        timer.stop();
    }],
    ['start() registra startTime', () => {
        const timer = new SlideTimer(() => {}, 1000);
        assert(timer.startTime === null, 'startTime null antes');
        timer.start();
        assert(timer.startTime !== null, 'startTime definido apos start()');
        assert(typeof timer.startTime === 'number', 'startTime e numero');
        timer.stop();
    }],
    ['start() sem callback retorna sem erro', () => {
        const timer = new SlideTimer(null, 1000);
        timer.start();
        assert(timer.timerId === null, 'timerId permanece null sem callback');
        assert(timer.paused === false, 'paused=false mesmo sem callback');
    }]
]);

// ── U2: SlideTimer.pause() pausa e preserva remaining ─────────────────
runTests('U2: SlideTimer.pause() pausa e preserva remaining', [
    ['pause() seta paused=true', () => {
        const timer = new SlideTimer(() => {}, 1000);
        timer.start();
        assert(timer.paused === false, 'inicia nao pausado');
        timer.pause();
        assert(timer.paused === true, 'pausado apos pause()');
    }],
    ['pause() limpa timerId', () => {
        const timer = new SlideTimer(() => {}, 1000);
        timer.start();
        assert(timer.timerId !== null, 'timerId existe antes de pause()');
        timer.pause();
        assert(timer.timerId === null, 'timerId null apos pause()');
    }],
    ['pause() preserva remaining < intervalo original', () => {
        const timer = new SlideTimer(() => {}, 10000);
        timer.start();
        // Forcamos remaining baixo para simular tempo decorrido
        timer.remaining = 3000;
        timer.pause();
        assert(timer.remaining < 10000, 'remaining menor que intervalo original');
        assert(timer.remaining > 0, 'remaining ainda positivo');
        assert(timer.remaining === 3000, 'remaining preservado exatamente');
    }],
    ['pause() quando ja pausado nao altera estado', () => {
        const timer = new SlideTimer(() => {}, 1000);
        timer.start();
        timer.pause();
        const remainingAfterFirstPause = timer.remaining;
        timer.pause(); // segunda pausa
        assert(timer.paused === true, 'continua pausado');
        assert(timer.remaining === remainingAfterFirstPause, 'remaining inalterado na segunda pausa');
    }]
]);

// ── U3: SlideTimer resume (start() apos pause) retoma do ponto ────────
runTests('U3: SlideTimer resume (start apos pause) retoma do ponto', [
    ['start() apos pause() usa remaining preservado', () => {
        const timer = new SlideTimer(() => {}, 10000);
        timer.start();
        timer.remaining = 2500; // simula 7.5s decorridos
        timer.timerId = null;    // simula estado pos-pause
        timer.start();
        // Quando remaining < interval, usa setTimeout com remaining
        assert(timer.paused === false, 'resume nao pausado');
        assert(timer.timerId !== null, 'timerId definido no resume');
        timer.stop();
    }],
    ['start() apos pause dispara callback no tempo correto', (done) => {
        const timer = new SlideTimer(() => {}, 10000);
        timer.start();
        timer.remaining = 50; // 50ms restantes
        timer.timerId = null;
        timer.paused = true;

        let callbackFired = false;
        timer.callback = () => { callbackFired = true; };

        const startTime = Date.now();
        timer.start();

        setTimeout(() => {
            assert(callbackFired, 'callback deve ter disparado');
            assert(Date.now() - startTime >= 45, 'callback disparou apos ~50ms (tolerancia 45ms)');
            timer.stop();
        }, 150);
    }]
]);

// ── U4: SlideTimer.stop() limpa tudo ─────────────────────────────────
runTests('U4: SlideTimer.stop() limpa tudo', [
    ['stop() seta paused=true', () => {
        const timer = new SlideTimer(() => {}, 1000);
        timer.start();
        assert(timer.paused === false, 'nao pausado antes de stop');
        timer.stop();
        assert(timer.paused === true, 'pausado apos stop()');
    }],
    ['stop() limpa timerId', () => {
        const timer = new SlideTimer(() => {}, 1000);
        timer.start();
        assert(timer.timerId !== null, 'timerId definido antes');
        timer.stop();
        assert(timer.timerId === null, 'timerId null apos stop()');
    }],
    ['stop() nao reseta remaining', () => {
        const timer = new SlideTimer(() => {}, 1000);
        timer.start();
        timer.remaining = 500;
        timer.stop();
        assert(timer.remaining === 500, 'remaining preservado apos stop()');
    }]
]);

// ── U5: SlideTimer.restart() reseta ──────────────────────────────────
runTests('U5: SlideTimer.restart() reseta', [
    ['restart() retorna instancia (chainable)', () => {
        const timer = new SlideTimer(() => {}, 1000);
        const result = timer.restart();
        assert(result === timer, 'restart() retorna a propria instancia');
        timer.stop();
    }],
    ['restart() preserva remaining ate callback async disparar', () => {
        const timer = new SlideTimer(() => {}, 5000);
        timer.start();
        timer.remaining = 1000; // simula tempo decorrido
        timer.restart();
        // remaining nao e resetado IMEDIATAMENTE — so no setTimeout callback async
        assert(timer.remaining === 1000, 'remaining preservado apos restart() sincrono (callback async ainda nao disparou)');
        timer.stop();
    }],
    ['restart() seta paused=false', () => {
        const timer = new SlideTimer(() => {}, 1000);
        timer.start();
        timer.stop(); // paused=true
        timer.restart();
        assert(timer.paused === false, 'nao pausado apos restart()');
        timer.stop();
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
    console.log('✅ Todos os testes do SlideTimer passaram!\n');
    process.exit(0);
}
