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
     A hundred of them are drawn out and seated together in one room.
     ====================================================================== */
  const canvas = $('#room');
  if (!canvas) return;
  const ctx = canvas.getContext('2d');
  const DPR = Math.min(window.devicePixelRatio || 1, 2);
  let W = 0, H = 0, pts = [], seats = [], t0 = performance.now(), mx = 0, my = 0, raf;
  const SEATED = 100;

  const rand = (a, b) => a + Math.random() * (b - a);
  const easeInOut = x => x < .5 ? 4 * x * x * x : 1 - Math.pow(-2 * x + 2, 3) / 2;

  function layout() {
    const r = canvas.getBoundingClientRect();
    W = r.width; H = r.height;
    canvas.width = W * DPR; canvas.height = H * DPR;
    ctx.setTransform(DPR, 0, 0, DPR, 0, 0);

    const mobile = W < 760;
    const cx = mobile ? W * .62 : W * .77;
    const cy = mobile ? 190 : H * .42;
    const R = mobile ? Math.min(78, W * .2) : Math.min(W, H) * .22;

    // Seats: a phyllotaxis disc — evenly packed, no rows, no head table.
    seats = [];
    for (let i = 0; i < SEATED; i++) {
      const a = i * 2.39996323, rr = R * Math.sqrt((i + .5) / SEATED);
      seats.push({ x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr });
    }
    const crowd = mobile ? 380 : 900;
    if (pts.length !== crowd) {
      pts = [];
      for (let i = 0; i < crowd; i++) {
        pts.push({
          x: rand(0, W), y: rand(0, H),
          vx: rand(-.12, .12), vy: rand(-.08, .08),
          r: rand(.6, 1.5), a: rand(.12, .45),
          seat: i < SEATED ? i : -1,
          delay: i < SEATED ? rand(0, 1400) : 0,
          sx: 0, sy: 0
        });
      }
    }
    pts.forEach(p => { if (p.seat >= 0) { p.sx = p.x; p.sy = p.y; } });
    ring.cx = cx; ring.cy = cy; ring.R = R;
  }
  const ring = { cx: 0, cy: 0, R: 0 };

  function draw(now) {
    const el = reduce ? 1e9 : now - t0;
    ctx.clearRect(0, 0, W, H);
    const px = mx * 10, py = my * 10;

    // The room's boundary draws itself once the seats start to fill.
    const rp = Math.min(1, Math.max(0, (el - 1600) / 1600));
    if (rp > 0) {
      ctx.beginPath();
      ctx.arc(ring.cx + px * .4, ring.cy + py * .4, ring.R * 1.22, -Math.PI / 2, -Math.PI / 2 + Math.PI * 2 * easeInOut(rp));
      ctx.strokeStyle = 'rgba(188,211,238,.35)'; ctx.lineWidth = 1; ctx.stroke();
      ctx.beginPath();
      ctx.arc(ring.cx + px * .4, ring.cy + py * .4, ring.R * 1.55, 0, Math.PI * 2);
      ctx.setLineDash([2, 8]);
      ctx.strokeStyle = `rgba(188,211,238,${.14 * rp})`; ctx.stroke();
      ctx.setLineDash([]);
    }

    for (const p of pts) {
      if (p.seat < 0) {
        p.x += p.vx; p.y += p.vy;
        if (p.x < -5) p.x = W + 5; if (p.x > W + 5) p.x = -5;
        if (p.y < -5) p.y = H + 5; if (p.y > H + 5) p.y = -5;
        // The crowd keeps clear of the room.
        const dx = p.x - ring.cx, dy = p.y - ring.cy, d = Math.hypot(dx, dy), lim = ring.R * 1.35;
        let alpha = p.a;
        if (d < lim) alpha *= Math.max(0, (d - ring.R) / (lim - ring.R));
        ctx.globalAlpha = alpha;
        ctx.fillStyle = '#8FB0D8';
        ctx.beginPath(); ctx.arc(p.x + px * .15, p.y + py * .15, p.r, 0, 6.283); ctx.fill();
      } else {
        const s = seats[p.seat];
        const k = easeInOut(Math.min(1, Math.max(0, (el - 500 - p.delay) / 2200)));
        const breathe = reduce ? 0 : Math.sin(now / 1400 + p.seat) * 1.2;
        const x = p.sx + (s.x - p.sx) * k + px * .4 + breathe * .5;
        const y = p.sy + (s.y - p.sy) * k + py * .4 + breathe;
        const hl = p.seat === 0;
        ctx.globalAlpha = .35 + .65 * k;
        ctx.fillStyle = hl ? '#E0604F' : '#F3F1EC';
        const r = 1.4 + 1.6 * k + (hl ? 1.2 : 0);
        ctx.beginPath(); ctx.arc(x, y, r, 0, 6.283); ctx.fill();
        if (hl && k > .9) {
          const pulse = reduce ? .5 : (now / 1800) % 1;
          ctx.globalAlpha = .5 * (1 - pulse);
          ctx.strokeStyle = '#E0604F';
          ctx.beginPath(); ctx.arc(x, y, r + 14 * pulse, 0, 6.283); ctx.stroke();
        }
      }
    }
    ctx.globalAlpha = 1;
    if (!reduce) raf = requestAnimationFrame(draw);
  }

  layout();
  if (reduce) draw(0);
  else raf = requestAnimationFrame(draw);

  let rt;
  window.addEventListener('resize', () => {
    clearTimeout(rt);
    rt = setTimeout(() => { layout(); if (reduce) draw(0); }, 150);
  });
  if (!reduce) {
    canvas.parentElement.addEventListener('pointermove', e => {
      mx = e.clientX / window.innerWidth - .5;
      my = e.clientY / window.innerHeight - .5;
    });
    // Pause when the hero is off screen.
    new IntersectionObserver(([e]) => {
      cancelAnimationFrame(raf);
      if (e.isIntersecting) raf = requestAnimationFrame(draw);
    }).observe(canvas);
  }
})();
