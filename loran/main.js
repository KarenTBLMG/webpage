/* ==========================================================================
   LORAN — site motion and behaviour
   No dependencies. Everything respects prefers-reduced-motion: with it set,
   each element renders in its final state and the hero draws one still frame.
   ========================================================================== */

(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];

  /* ---- Entrance --------------------------------------------------------- */
  requestAnimationFrame(() => document.documentElement.classList.add('is-ready'));

  /* ---- Header: solid after scroll, hides on scroll down ----------------- */
  const header = $('.site-header');
  let lastY = window.scrollY;
  const onScroll = () => {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('scrolled', y > 40);
      const open = document.body.classList.contains('menu-open');
      header.classList.toggle('hidden', !open && y > 400 && y > lastY);
    }
    lastY = y;
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---- Mobile menu ------------------------------------------------------ */
  const menuBtn = $('.menu-btn');
  if (menuBtn) {
    menuBtn.addEventListener('click', () => {
      const open = document.body.classList.toggle('menu-open');
      menuBtn.setAttribute('aria-expanded', open);
      document.body.style.overflow = open ? 'hidden' : '';
    });
    document.addEventListener('keydown', e => {
      if (e.key === 'Escape' && document.body.classList.contains('menu-open')) menuBtn.click();
    });
  }

  /* ---- Reveal on scroll ------------------------------------------------- */
  const revealTargets = $$('[data-reveal], .rule-grow, .versus, .dotfield, .compare, .steps, .room-mix');
  if (reduce || !('IntersectionObserver' in window)) {
    revealTargets.forEach(el => el.classList.add('in'));
  } else {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
      });
    }, { rootMargin: '0px 0px -12% 0px', threshold: 0.08 });
    revealTargets.forEach(el => io.observe(el));
  }

  /* ---- Count-up numbers ------------------------------------------------- */
  const counters = $$('[data-count]');
  const runCount = el => {
    const [a, b] = el.dataset.count.split('-').map(Number);
    const fmt = n => Math.round(n).toLocaleString('en-US');
    if (reduce) { el.textContent = b ? `${fmt(a)}–${fmt(b)}` : fmt(a); return; }
    const t0 = performance.now(), dur = 1800;
    const tick = t => {
      const p = Math.min(1, (t - t0) / dur), e = 1 - Math.pow(1 - p, 4);
      el.textContent = b ? `${fmt(a * e)}–${fmt(b * e)}` : fmt(a * e);
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if (counters.length) {
    const cio = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) { runCount(e.target); cio.unobserve(e.target); } });
    }, { threshold: 0.6 });
    counters.forEach(el => cio.observe(el));
  }

  /* ---- Scroll-linked effects ------------------------------------------- */
  const question = $('.question blockquote');
  const words = question ? $$('.w', question) : [];
  const reasonsWrap = $('[data-reasons]');
  const reasons = reasonsWrap ? $$('li', reasonsWrap) : [];
  const progress = $('[data-progress]');

  const scrollFx = () => {
    const vh = window.innerHeight;
    if (words.length) {
      const r = question.getBoundingClientRect();
      // Words light up as the quote travels from 85% to 35% of the viewport.
      const p = Math.min(1, Math.max(0, (vh * .85 - r.top) / (vh * .5 + r.height * .5)));
      const lit = Math.round(p * words.length);
      words.forEach((w, i) => w.classList.toggle('on', i < lit));
    }
    if (reasons.length) {
      let active = -1;
      reasons.forEach((li, i) => {
        const r = li.getBoundingClientRect();
        if (r.top < vh * .6) active = i;
      });
      reasons.forEach((li, i) => {
        li.classList.toggle('active', i === active);
        li.classList.toggle('seen', i < active);
      });
      if (progress) progress.style.setProperty('--p', (active + 1) / reasons.length);
    }
  };
  if (!reduce && (words.length || reasons.length)) {
    let ticking = false;
    window.addEventListener('scroll', () => {
      if (!ticking) { requestAnimationFrame(() => { scrollFx(); ticking = false; }); ticking = true; }
    }, { passive: true });
    scrollFx();
  } else if (progress) {
    progress.style.setProperty('--p', 1);
  }

  /* ---- Scale argument dot field ---------------------------------------- */
  // ASCO draws 40,000. At 125 people per dot that is 320 dots; LORAN is one.
  const field = $('.dotfield');
  if (field) {
    const n = Number(field.dataset.dots || 320);
    const frag = document.createDocumentFragment();
    for (let k = 0; k < n; k++) {
      const i = document.createElement('i');
      i.style.setProperty('--k', k);
      if (k === n - 1) i.className = 'loran';
      frag.appendChild(i);
    }
    field.appendChild(frag);
  }

  /* ---- Room-mix seats (event detail) ------------------------------------ */
  $$('.room-mix .seats').forEach(el => {
    const n = Number(el.dataset.seats || 10);
    for (let k = 0; k < n; k++) {
      const i = document.createElement('i');
      i.style.setProperty('--k', k);
      el.appendChild(i);
    }
  });

  /* ---- Event filters ---------------------------------------------------- */
  const filterBar = $('[data-filters]');
  if (filterBar) {
    const rows = $$('[data-type]');
    filterBar.addEventListener('click', e => {
      const b = e.target.closest('button');
      if (!b) return;
      $$('button', filterBar).forEach(x => x.setAttribute('aria-pressed', x === b));
      const f = b.dataset.filter;
      rows.forEach(r => { r.hidden = !(f === 'all' || r.dataset.type === f); });
      const live = $('[data-filter-status]');
      if (live) live.textContent = `${rows.filter(r => !r.hidden).length} events shown`;
    });
  }

  /* ---- Forms ------------------------------------------------------------ */
  // Static build: no submissions leave the page yet. At launch each form
  // posts to a Resend-backed endpoint (see README) and this handler stays as
  // the success state.
  $$('form[data-static]').forEach(form => {
    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      const host = form.closest('[data-form-host]') || form.parentElement;
      host.classList.add('sent');
      const done = $('.form-done, .newsletter-done', host);
      if (done) { done.setAttribute('tabindex', '-1'); done.focus(); }
    });
  });

  // Preselect the inquiry type from ?type= on the contact page.
  const typeSel = $('#f-type');
  if (typeSel) {
    const t = new URLSearchParams(location.search).get('type');
    if (t && [...typeSel.options].some(o => o.value === t)) typeSel.value = t;
  }

  /* ---- Year ------------------------------------------------------------- */
  $$('[data-year]').forEach(el => { el.textContent = new Date().getFullYear(); });

  /* ======================================================================
     Hero: "Who are the 100 people who need to be in this room?"
     A wide field of drifting points — the crowd at the big congresses.
     A hundred of them are drawn out and seated together, then the room
     keeps living: the hundred move through three formations —
       the rings of the logo's O, a slow spiral, an infinity loop —
     peers near each other are linked by faint lines, and every few
     seconds a signal pulse (LORAN was a radio-pulse navigation system)
     ripples out through the room and the crowd beyond it.
     ====================================================================== */
  const canvas = $('#room');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  const SEATED = 100;
  const RED = '#F24A50', CREAM = '#F3F1EC', CROWD = '#8FB0D8';
  let W = 0, H = 0, cx = 0, cy = 0, R = 0, pts = [], t0 = performance.now(), raf;
  let px = -1e4, py = -1e4, mx = 0, my = 0;

  const rand = (a, b) => a + Math.random() * (b - a);
  const ease = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;
  const clamp01 = x => Math.max(0, Math.min(1, x));

  // ---- Formations: each maps seat i at time t (seconds) to a point in
  //      units of R around the room's centre. Seat 0 is the red dot.
  const RINGS = [[12, .36, .16], [30, .68, -.1], [57, 1, .06]];
  function rings(i, t) {
    if (i === 0) return [0, 0];
    let j = i - 1;
    for (const [n, r, w] of RINGS) {
      if (j < n) { const a = (j / n) * 6.2832 + t * w; return [Math.cos(a) * r, Math.sin(a) * r]; }
      j -= n;
    }
    return [0, 0];
  }
  function spiral(i, t) {
    if (i === 0) return [0, 0];
    const a = i * 2.39996 + t * .12, r = 1.08 * Math.sqrt(i / SEATED);
    return [Math.cos(a) * r, Math.sin(a) * r * .92];
  }
  function infinity(i, t) {
    if (i === 0) return [0, 0];
    const s = (i / (SEATED - 1)) * 6.2832 + t * .18, d = 1 + Math.sin(s) ** 2;
    return [1.25 * Math.cos(s) / d, 1.25 * Math.sin(s) * Math.cos(s) / d];
  }
  const FORMS = [rings, spiral, infinity];
  const HOLD = 7.5, MORPH = 2.6, CYCLE = HOLD + MORPH;
  const GATHER = 3.2;      // seconds for the crowd-to-room entrance
  const PULSE = 4.2;       // seconds between signal pulses

  function layout() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);
    const mobile = W < 760;
    cx = mobile ? W * .62 : W * .76;
    cy = mobile ? 190 : H * .44;
    R = mobile ? Math.min(78, W * .2) : Math.min(W, H) * .21;
    const crowd = mobile ? 380 : 900;
    if (pts.length !== crowd) {
      pts = [];
      for (let i = 0; i < crowd; i++) {
        pts.push({
          x: rand(0, W), y: rand(0, H), vx: rand(-.12, .12), vy: rand(-.08, .08),
          r: rand(.6, 1.5), a: rand(.12, .45),
          seat: i < SEATED ? i : -1, delay: i < SEATED ? rand(0, 1.4) : 0,
          ox: 0, oy: 0, dx: 0, dy: 0
        });
      }
      pts.forEach(p => { if (p.seat >= 0) { p.ox = p.x; p.oy = p.y; } });
    }
  }

  // Where seat i should be at time t, in px, before pulses and pointer.
  function target(i, t) {
    const c = Math.floor(t / CYCLE), local = t - c * CYCLE;
    const from = FORMS[c % FORMS.length], to = FORMS[(c + 1) % FORMS.length];
    const k = ease(clamp01((local - HOLD - (i / SEATED) * .5) / (MORPH - .5)));
    const a = from(i, t), b = to(i, t);
    return [cx + (a[0] + (b[0] - a[0]) * k) * R, cy + (a[1] + (b[1] - a[1]) * k) * R];
  }

  const seatXY = new Float32Array(SEATED * 2);

  function draw(now) {
    const t = reduce ? 0 : (now - t0) / 1000;
    const tf = Math.max(0, t - GATHER);            // formation clock starts once seated
    ctx.clearRect(0, 0, W, H);
    const ox = mx * 10, oy = my * 10;

    // Signal pulse: radius grows from the centre, then fades.
    const pp = reduce ? -1 : ((t - GATHER) % PULSE) / PULSE;
    const waveR = pp >= 0 && t > GATHER ? pp * R * 3.2 : -1;
    const band = R * .16;

    // Room boundary draws itself during the entrance, then slowly turns.
    const rp = clamp01((t - 1.4) / 1.6);
    if (rp > 0) {
      ctx.save();
      ctx.translate(cx + ox * .4, cy + oy * .4);
      ctx.rotate(reduce ? 0 : t * .03);
      ctx.beginPath();
      ctx.arc(0, 0, R * 1.32, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * ease(rp));
      ctx.strokeStyle = 'rgba(188,211,238,.32)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.setLineDash([2, 9]);
      ctx.beginPath(); ctx.arc(0, 0, R * 1.62, 0, 6.2832);
      ctx.strokeStyle = `rgba(188,211,238,${.14 * rp})`; ctx.stroke();
      ctx.setLineDash([]);
      ctx.restore();
    }
    if (waveR > 0) {
      ctx.beginPath(); ctx.arc(cx + ox * .4, cy + oy * .4, waveR, 0, 6.2832);
      ctx.strokeStyle = RED; ctx.globalAlpha = .38 * (1 - pp) ** 1.5; ctx.lineWidth = 1.2; ctx.stroke();
      ctx.globalAlpha = 1; ctx.lineWidth = 1;
    }

    // Crowd: drifts, keeps clear of the room, brightens as the pulse passes.
    ctx.fillStyle = CROWD;
    for (const p of pts) {
      if (p.seat >= 0) continue;
      if (!reduce) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -5) p.x = W + 5; if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5; if (p.y > H + 5) p.y = -5;
      }
      const dx = p.x - cx, dy = p.y - cy, d = Math.hypot(dx, dy), lim = R * 1.45;
      let alpha = p.a;
      if (d < lim) alpha *= clamp01((d - R * 1.1) / (lim - R * 1.1));
      if (waveR > 0) alpha += .55 * Math.exp(-(((d - waveR) / band) ** 2)) * (1 - pp);
      ctx.globalAlpha = Math.min(1, alpha);
      ctx.beginPath(); ctx.arc(p.x + ox * .15, p.y + oy * .15, p.r, 0, 6.2832); ctx.fill();
    }

    // The hundred.
    for (const p of pts) {
      if (p.seat < 0) continue;
      const i = p.seat;
      const [tx, ty] = target(i, tf);
      const k = ease(clamp01((t - .5 - p.delay) / 2.2));        // entrance
      let x = p.ox + (tx - p.ox) * k, y = p.oy + (ty - p.oy) * k;
      // pulse pushes seats outward as it passes
      if (waveR > 0 && i) {
        const dx = x - cx, dy = y - cy, d = Math.hypot(dx, dy) || 1;
        const push = Math.exp(-(((d - waveR) / band) ** 2)) * R * .07 * (1 - pp);
        x += dx / d * push; y += dy / d * push;
      }
      // pointer: seats lean away, eased so it feels soft
      const qx = x - px, qy = y - py, qd = Math.hypot(qx, qy);
      const want = qd < 90 ? (90 - qd) / 90 * 18 : 0;
      p.dx += ((qd ? qx / qd : 0) * want - p.dx) * .08;
      p.dy += ((qd ? qy / qd : 0) * want - p.dy) * .08;
      x += p.dx + ox * .4; y += p.dy + oy * .4;
      seatXY[i * 2] = x; seatXY[i * 2 + 1] = y;
    }

    // Peers near each other are linked.
    const link = R * .3, settled = clamp01((t - GATHER + .6) / 1.5);
    if (settled > 0) {
      ctx.strokeStyle = 'rgba(188,211,238,1)'; ctx.lineWidth = .6;
      for (let a = 1; a < SEATED; a++) {
        const ax = seatXY[a * 2], ay = seatXY[a * 2 + 1];
        for (let b = a + 1; b < SEATED; b++) {
          const d = Math.hypot(seatXY[b * 2] - ax, seatXY[b * 2 + 1] - ay);
          if (d < link) {
            ctx.globalAlpha = (1 - d / link) * .32 * settled;
            ctx.beginPath(); ctx.moveTo(ax, ay); ctx.lineTo(seatXY[b * 2], seatXY[b * 2 + 1]); ctx.stroke();
          }
        }
      }
      ctx.lineWidth = 1;
    }

    for (const p of pts) {
      if (p.seat < 0) continue;
      const i = p.seat, x = seatXY[i * 2], y = seatXY[i * 2 + 1];
      const k = ease(clamp01((t - .5 - p.delay) / 2.2));
      const hl = i === 0;
      const breathe = reduce ? 0 : Math.sin(t * 1.6 + i) * .35;
      ctx.globalAlpha = .35 + .65 * k;
      ctx.fillStyle = hl ? RED : CREAM;
      const r = 1.4 + 1.5 * k + breathe + (hl ? 2.2 : 0);
      ctx.beginPath(); ctx.arc(x, y, r, 0, 6.2832); ctx.fill();
      if (hl && k > .9 && !reduce) {
        const ph = (t % 1.8) / 1.8;
        ctx.globalAlpha = .5 * (1 - ph); ctx.strokeStyle = RED;
        ctx.beginPath(); ctx.arc(x, y, r + 16 * ph, 0, 6.2832); ctx.stroke();
      }
    }
    ctx.globalAlpha = 1;
    if (!reduce) raf = requestAnimationFrame(draw);
  }

  layout();
  if (reduce) { t0 = performance.now() - 1e7; draw(performance.now()); }
  else raf = requestAnimationFrame(draw);

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { layout(); if (reduce) draw(performance.now()); }, 150);
  });
  if (!reduce) {
    const hero = canvas.parentElement;
    hero.addEventListener('pointermove', e => {
      mx = e.clientX / window.innerWidth - .5;
      my = e.clientY / window.innerHeight - .5;
      const b = canvas.getBoundingClientRect();
      px = e.clientX - b.left; py = e.clientY - b.top;
    });
    hero.addEventListener('pointerleave', () => { px = py = -1e4; });
    // Pause when the hero is off screen or the tab is hidden.
    let onScreen = true;
    new IntersectionObserver(([e]) => {
      onScreen = e.isIntersecting;
      cancelAnimationFrame(raf);
      if (onScreen) raf = requestAnimationFrame(draw);
    }).observe(canvas);
    document.addEventListener('visibilitychange', () => {
      cancelAnimationFrame(raf);
      if (!document.hidden && onScreen) raf = requestAnimationFrame(draw);
    });
  }
})();

/* ======================================================================
   Photo carousel
   ====================================================================== */
(() => {
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  document.querySelectorAll('[data-carousel]').forEach(root => {
    const track = root.querySelector('.track');
    const slides = [...track.querySelectorAll('.slide')];
    const prev = root.querySelector('[data-prev]');
    const next = root.querySelector('[data-next]');
    const bar = root.querySelector('.gallery-progress');
    const padLeft = () => parseFloat(getComputedStyle(track).scrollPaddingLeft) || 0;

    const currentIndex = () => {
      const x = track.scrollLeft + padLeft() + 4;
      let idx = 0;
      slides.forEach((s, i) => { if (s.offsetLeft - track.offsetLeft <= x) idx = i; });
      return idx;
    };
    const atEnd = () => track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
    const go = i => {
      const s = slides[Math.max(0, Math.min(slides.length - 1, i))];
      track.scrollTo({ left: s.offsetLeft - track.offsetLeft - padLeft(), behavior: reduce ? 'auto' : 'smooth' });
    };
    const update = () => {
      const max = track.scrollWidth - track.clientWidth;
      const p = max > 0 ? track.scrollLeft / max : 1;
      if (bar) bar.style.setProperty('--p', Math.max(.08, p));
      const c = currentIndex();
      slides.forEach((s, i) => s.classList.toggle('current', i === c));
      prev.disabled = track.scrollLeft <= 4;
      next.disabled = atEnd();
    };
    prev.addEventListener('click', () => { stop(); go(currentIndex() - 1); });
    next.addEventListener('click', () => { stop(); go(currentIndex() + 1); });
    track.addEventListener('scroll', () => requestAnimationFrame(update), { passive: true });
    window.addEventListener('resize', update);
    track.addEventListener('keydown', e => {
      if (e.key === 'ArrowRight') { e.preventDefault(); stop(); go(currentIndex() + 1); }
      if (e.key === 'ArrowLeft') { e.preventDefault(); stop(); go(currentIndex() - 1); }
    });

    // Drag to scroll with a mouse; touch uses native swipe.
    let down = false, startX = 0, startL = 0, moved = false;
    track.addEventListener('pointerdown', e => {
      if (e.pointerType !== 'mouse') return;
      down = true; moved = false; startX = e.clientX; startL = track.scrollLeft;
      stop();
    });
    window.addEventListener('pointermove', e => {
      if (!down) return;
      const dx = e.clientX - startX;
      if (Math.abs(dx) > 4) { moved = true; track.classList.add('dragging'); }
      track.scrollLeft = startL - dx;
    });
    window.addEventListener('pointerup', () => {
      if (!down) return;
      down = false; track.classList.remove('dragging');
      if (moved) go(currentIndex() + (track.scrollLeft > startL ? 1 : 0));
    });

    // Gentle autoplay: every 4.5s while on screen, until someone interacts.
    let timer = null, stopped = reduce, visible = false, hovering = false;
    function stop() { stopped = true; clearInterval(timer); }
    const tick = () => {
      if (stopped || hovering || !visible || document.hidden) return;
      atEnd() ? go(0) : go(currentIndex() + 1);
    };
    root.addEventListener('mouseenter', () => { hovering = true; });
    root.addEventListener('mouseleave', () => { hovering = false; });
    root.addEventListener('focusin', stop);
    track.addEventListener('touchstart', stop, { passive: true });
    track.addEventListener('wheel', e => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(); }, { passive: true });
    new IntersectionObserver(([e]) => { visible = e.isIntersecting; }, { threshold: .4 }).observe(root);
    if (!stopped) timer = setInterval(tick, 4500);
    update();
  });
})();
