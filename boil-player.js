/*
  Boil player: plays a Boil Studio project (.json) on a website.
  Usage:  <canvas data-boil="boil.json" aria-label="Minh Tran, handwritten"></canvas>
          <script src="boil-player.js" defer></script>
  The drawing is redrawn from its strokes, so it stays sharp at any size.
*/
(() => {
  'use strict';

  function mulberry(a) {
    return () => {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }
  function hexRgb(h) {
    const n = parseInt((h || '#ffffff').slice(1), 16);
    return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const grain = new Map();
  function pencilPattern(c, color) {
    let t = grain.get(color);
    if (!t) {
      t = document.createElement('canvas'); t.width = t.height = 64;
      const x = t.getContext('2d'), img = x.createImageData(64, 64), [r, g, b] = hexRgb(color), rnd = mulberry(7);
      for (let i = 0; i < 64 * 64; i++) {
        img.data[i * 4] = r; img.data[i * 4 + 1] = g; img.data[i * 4 + 2] = b;
        img.data[i * 4 + 3] = rnd() < 0.6 ? 170 + rnd() * 85 : rnd() * 70;
      }
      x.putImageData(img, 0, 0);
      grain.set(color, t);
    }
    return c.createPattern(t, 'repeat');
  }
  function smoothPath(c, p) {
    c.beginPath(); c.moveTo(p[0][0], p[0][1]);
    if (p.length === 1) { c.lineTo(p[0][0] + 0.01, p[0][1]); return; }
    for (let i = 1; i < p.length; i++) {
      const last = i === p.length - 1;
      c.quadraticCurveTo(p[i][0], p[i][1], last ? p[i][0] : (p[i][0] + p[i + 1][0]) / 2, last ? p[i][1] : (p[i][1] + p[i + 1][1]) / 2);
    }
  }
  // Same stroke rendering as Boil Studio, so the site matches what you drew.
  function drawStroke(c, s) {
    const p = s.pts; if (!p || !p.length) return;
    c.lineCap = 'round'; c.lineJoin = 'round';
    if (s.brush === 'marker') { c.strokeStyle = s.color; c.lineWidth = s.size; smoothPath(c, p); c.stroke(); return; }
    const pencil = s.brush === 'pencil';
    const style = pencil ? pencilPattern(c, s.color) : s.color;
    c.strokeStyle = style; c.fillStyle = style;
    const wf = pencil ? q => s.size * (0.45 + 0.55 * q) : q => s.size * (0.12 + 0.98 * q);
    if (p.length === 1) { c.beginPath(); c.arc(p[0][0], p[0][1], wf(p[0][2]) / 2, 0, Math.PI * 2); c.fill(); return; }
    let mx = p[0][0], my = p[0][1];
    for (let i = 1; i < p.length; i++) {
      const last = i === p.length - 1;
      const nx = last ? p[i][0] : (p[i][0] + p[i + 1][0]) / 2;
      const ny = last ? p[i][1] : (p[i][1] + p[i + 1][1]) / 2;
      c.lineWidth = wf(p[i][2]);
      c.beginPath(); c.moveTo(mx, my); c.quadraticCurveTo(p[i][0], p[i][1], nx, ny); c.stroke();
      mx = nx; my = ny;
    }
  }

  // Projects saved by the first version of Boil Studio had no layers and stored
  // points as fractions of the canvas width. Convert those on the fly.
  function fromV1(o) {
    const w = 1400, h = Math.round(1400 / (o.aspect || 3.5));
    return {
      w, h, introFps: o.introFps || 15, loopFps: o.loopFps || 10, loopStart: o.loopStart || 0,
      layers: [{ id: 'l', visible: true, opacity: 1 }],
      frames: o.frames.map(f => ({ hold: 1, cels: { l: (f.strokes || []).map(s => ({
        brush: 'pen', color: s.color || '#fbf3e4', size: (s.size || 0.014) * w,
        pts: (s.pts || []).map(p => [p[0] * w, p[1] * w, p[2] == null ? 0.6 : p[2]])
      })) } }))
    };
  }

  async function mount(canvas) {
    const url = canvas.dataset.boil;
    if (location.protocol === 'file:') {
      console.error('Boil player: this page was opened as a file, so the browser blocks loading ' + url +
        '. Run a local server in this folder (for example: python3 -m http.server) and open http://localhost:8000');
      return;
    }
    let doc;
    try {
      const res = await fetch(url);
      if (!res.ok) throw new Error('HTTP ' + res.status + ' (is ' + url + ' in the same folder as this page?)');
      doc = JSON.parse((await res.text()).replace(/^\uFEFF/, ''));
    } catch (e) { console.error('Boil player: could not load ' + url + '.', e.message || e); return; }
    if (doc && Array.isArray(doc.frames) && !Array.isArray(doc.layers)) doc = fromV1(doc);
    if (!doc || !Array.isArray(doc.frames) || !doc.frames.length || !Array.isArray(doc.layers)) {
      console.error('Boil player: ' + url + ' is not a Boil Studio project. Use "Save project" in Boil Studio.'); return;
    }
    const strokes = doc.frames.reduce((a, f) => a + doc.layers.reduce((b, L) => b + ((f.cels || {})[L.id] || []).length, 0), 0);
    if (!strokes) console.error('Boil player: ' + url + ' loaded but has no strokes in it.');
    else if (doc.layers.every(L => L.visible === false)) console.error('Boil player: every layer in ' + url + ' is hidden, so nothing draws. Show a layer in Boil Studio and save again.');
    else console.info('Boil player: loaded ' + doc.frames.length + ' frames, ' + strokes + ' strokes.');
    const W = doc.w, H = doc.h, n = doc.frames.length;
    const loopStart = Math.min(doc.loopStart || 0, n - 1);
    const fpsOf = i => (i < loopStart ? doc.introFps || 15 : doc.loopFps || 10);
    const ctx = canvas.getContext('2d');
    const tmp = document.createElement('canvas'), tctx = tmp.getContext('2d');
    canvas.width = W; canvas.height = H;
    canvas.style.aspectRatio = W + ' / ' + H;
    if (!canvas.hasAttribute('role')) canvas.setAttribute('role', 'img');

    let shown = 0;
    function draw(fi) {
      shown = fi;
      const f = doc.frames[fi], k = canvas.width / W;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      for (const L of doc.layers) {
        if (L.visible === false) continue;
        const st = f.cels && f.cels[L.id];
        if (!st || !st.length) continue;
        const op = L.opacity == null ? 1 : L.opacity;
        if (op >= 1) {
          ctx.setTransform(k, 0, 0, k, 0, 0); st.forEach(s => drawStroke(ctx, s)); ctx.setTransform(1, 0, 0, 1, 0, 0);
        } else {
          tctx.setTransform(1, 0, 0, 1, 0, 0); tctx.clearRect(0, 0, tmp.width, tmp.height);
          tctx.setTransform(k, 0, 0, k, 0, 0); st.forEach(s => drawStroke(tctx, s));
          ctx.globalAlpha = op; ctx.drawImage(tmp, 0, 0); ctx.globalAlpha = 1;
        }
      }
    }
    function size() {
      const r = canvas.getBoundingClientRect();
      if (!r.width) return;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.max(1, Math.round(r.width * dpr)), ch = Math.max(1, Math.round(cw * H / W));
      if (canvas.width === cw && canvas.height === ch) return;
      canvas.width = tmp.width = cw; canvas.height = tmp.height = ch;
      draw(shown);
    }
    new ResizeObserver(size).observe(canvas);
    size();

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) { draw(n - 1); return; }

    // Only animate while the canvas is on screen and the tab is visible.
    let i = 0, timer = null, onScreen = true;
    function step() {
      draw(i);
      const wait = (doc.frames[i].hold || 1) * 1000 / fpsOf(i);
      i = i < n - 1 ? i + 1 : loopStart;
      timer = setTimeout(step, wait);
    }
    const run = () => { if (!timer && onScreen && !document.hidden) step(); };
    const pause = () => { clearTimeout(timer); timer = null; };
    new IntersectionObserver(es => { onScreen = es[0].isIntersecting; onScreen ? run() : pause(); }).observe(canvas);
    document.addEventListener('visibilitychange', () => (document.hidden ? pause() : run()));
    run();
  }

  const start = () => document.querySelectorAll('canvas[data-boil]').forEach(mount);
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', start);
  else start();
})();