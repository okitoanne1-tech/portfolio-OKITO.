(() => {
  const $ = (s, c = document) => [...c.querySelectorAll(s)];
  const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* Découpage des titres en lettres */
  $('.split').forEach(el => {
    const txt = el.textContent; el.setAttribute('aria-label', txt); el.textContent = '';
    [...txt].forEach((c, i) => {
      const s = document.createElement('span'); s.className = 'ch'; s.setAttribute('aria-hidden', 'true');
      s.innerHTML = `<i style="--d:${i * 0.035}s">${c === ' ' ? '&nbsp;' : c}</i>`; el.appendChild(s);
    });
  });
  /* Manifeste mot par mot */
  $('.words').forEach(el => {
    el.innerHTML = el.textContent.trim().split(/\s+/).map(w => `<span class="w">${w}</span>`).join(' ');
  });
  /* Délais en cascade pour les groupes */
  $('.projects,.services,.stats,.pillars,.index,.timeline').forEach(g => $('.reveal', g).forEach((el, i) => el.style.setProperty('--d', (i % 3) * 0.1 + 's')));

  /* Observateur d'apparition */
  const io = new IntersectionObserver(es => es.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: .15 });
  const startReveals = () => $('.reveal,.split').forEach(el => io.observe(el));

  /* Compteurs */
  const co = new IntersectionObserver(es => es.forEach(e => {
    if (!e.isIntersecting) return; co.unobserve(e.target);
    const end = +e.target.dataset.count; let n = 0;
    const t = setInterval(() => { e.target.textContent = ++n; if (n >= end) clearInterval(t); }, 500 / end);
  }), { threshold: .6 });
  $('[data-count]').forEach(el => co.observe(el));

  /* Loader */
  const loader = $('.loader')[0], num = $('.loader__count')[0];
  let p = 0;
  const tick = setInterval(() => {
    p += Math.ceil(Math.random() * 9); if (p >= 100) { p = 100; clearInterval(tick); }
    num.textContent = p;
    if (p === 100) setTimeout(() => {
      loader.classList.add('done'); document.body.classList.remove('is-loading'); startReveals();
    }, 300);
  }, 60);

  /* Scroll : progression, header, parallaxe, manifeste */
  const bar = $('.progress')[0], header = $('.header')[0], words = $('.w');
  let lastY = 0;
  const onScroll = () => {
    const y = scrollY, h = document.documentElement.scrollHeight - innerHeight;
    bar.style.width = (y / h * 100) + '%';
    header.classList.toggle('scrolled', y > 40);
    header.classList.toggle('hide', y > lastY && y > 300 && !$('.nav')[0].classList.contains('open'));
    lastY = y;
    if (!reduce) $('[data-parallax]').forEach(el => el.style.transform = `translateY(${-y * el.dataset.parallax}px)`);
    words.forEach(w => { const r = w.getBoundingClientRect(); w.classList.toggle('on', r.top < innerHeight * .75); });
  };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* Curseur personnalisé */
  const cur = $('.cursor')[0];
  if (matchMedia('(hover:hover)').matches) {
    let x = 0, y = 0, cx = 0, cy = 0;
    addEventListener('mousemove', e => { x = e.clientX; y = e.clientY; cur.style.opacity = 1; });
    (function loop() { cx += (x - cx) * .18; cy += (y - cy) * .18; cur.style.left = cx + 'px'; cur.style.top = cy + 'px'; requestAnimationFrame(loop); })();
    $('a,button,.project').forEach(el => {
      el.addEventListener('mouseenter', () => cur.classList.add('big'));
      el.addEventListener('mouseleave', () => cur.classList.remove('big'));
    });
  }

  /* Boutons magnétiques */
  if (!reduce) $('.magnetic').forEach(b => {
    b.addEventListener('mousemove', e => {
      const r = b.getBoundingClientRect();
      b.style.transform = `translate(${(e.clientX - r.left - r.width / 2) * .25}px,${(e.clientY - r.top - r.height / 2) * .35}px)`;
    });
    b.addEventListener('mouseleave', () => b.style.transform = '');
  });

  /* Inclinaison 3D des projets */
  if (!reduce) $('[data-tilt]').forEach(c => {
    c.addEventListener('mousemove', e => {
      const r = c.getBoundingClientRect(), px = (e.clientX - r.left) / r.width - .5, py = (e.clientY - r.top) / r.height - .5;
      c.style.transform = `perspective(900px) rotateY(${px * 6}deg) rotateX(${-py * 6}deg)`;
    });
    c.addEventListener('mouseleave', () => c.style.transform = '');
  });

  /* Menu mobile */
  const btn = $('.menu-btn')[0], nav = $('#nav')[0];
  const toggle = o => { nav.classList.toggle('open', o); btn.setAttribute('aria-expanded', o); btn.textContent = o ? 'Fermer' : 'Menu'; };
  btn.addEventListener('click', () => toggle(!nav.classList.contains('open')));
  $('a', nav).forEach(a => a.addEventListener('click', () => toggle(false)));
})();
