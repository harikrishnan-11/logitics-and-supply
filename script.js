document.addEventListener('DOMContentLoaded', () => {

  /* ---------------- Loader ---------------- */
  const loader = document.getElementById('loader');
  window.addEventListener('load', () => {
    setTimeout(() => loader.classList.add('is-hidden'), 400);
  });
  // fallback in case load event already fired
  setTimeout(() => loader && loader.classList.add('is-hidden'), 2200);

  /* ---------------- Sticky header ---------------- */
  const header = document.getElementById('siteHeader');
  const onScroll = () => {
    if (window.scrollY > 40) header.classList.add('scrolled');
    else header.classList.remove('scrolled');

    backToTop.classList.toggle('show', window.scrollY > 600);
  };
  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();

  /* ---------------- Mobile nav ---------------- */
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');
  hamburger.addEventListener('click', () => {
    const isOpen = mobileNav.classList.toggle('open');
    hamburger.classList.toggle('active', isOpen);
    hamburger.setAttribute('aria-expanded', isOpen);
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });
  document.querySelectorAll('.mobile-link, .mobile-cta').forEach(link => {
    link.addEventListener('click', () => {
      mobileNav.classList.remove('open');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
      document.body.style.overflow = '';
    });
  });

  /* ---------------- Reveal on scroll ---------------- */
  const revealEls = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in-view');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15, rootMargin: '0px 0px -60px 0px' });
  revealEls.forEach(el => revealObserver.observe(el));

  /* ---------------- Animated stat counters ---------------- */
  const counters = document.querySelectorAll('.stat-num');
  const counterObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = parseInt(el.dataset.count, 10);
      const duration = 1400;
      const start = performance.now();
      const tick = (now) => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        el.textContent = Math.round(eased * target);
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      counterObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => counterObserver.observe(el));

  /* ---------------- Hero SVG grid dots (generated) ---------------- */
  const gridGroup = document.querySelector('.grid-dots');
  if (gridGroup) {
    const frag = document.createDocumentFragment();
    for (let x = 20; x <= 500; x += 40) {
      for (let y = 20; y <= 440; y += 40) {
        const c = document.createElementNS('http://www.w3.org/2000/svg', 'circle');
        c.setAttribute('cx', x);
        c.setAttribute('cy', y);
        c.setAttribute('r', 1.2);
        frag.appendChild(c);
      }
    }
    gridGroup.appendChild(frag);
  }

  /* ---------------- Testimonial slider ---------------- */
  const track = document.getElementById('testiTrack');
  const dotsWrap = document.getElementById('testiDots');
  if (track && dotsWrap) {
    const slides = track.children.length;
    let current = 0;
    for (let i = 0; i < slides; i++) {
      const dot = document.createElement('button');
      if (i === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goTo(i));
      dotsWrap.appendChild(dot);
    }
    const dots = dotsWrap.children;

    function goTo(i) {
      current = i;
      track.style.transform = `translateX(-${i * 100}%)`;
      Array.from(dots).forEach((d, idx) => d.classList.toggle('active', idx === i));
    }

    let autoplay = setInterval(() => goTo((current + 1) % slides), 5500);
    dotsWrap.addEventListener('click', () => {
      clearInterval(autoplay);
      autoplay = setInterval(() => goTo((current + 1) % slides), 5500);
    });
  }

  /* ---------------- Contact form ---------------- */
  const quoteForm = document.getElementById('quoteForm');
  const formSuccess = document.getElementById('formSuccess');
  if (quoteForm) {
    quoteForm.addEventListener('submit', (e) => {
      e.preventDefault();
      formSuccess.classList.add('show');
      quoteForm.reset();
      setTimeout(() => formSuccess.classList.remove('show'), 5000);
    });
  }

  /* ---------------- Newsletter form ---------------- */
  const newsForm = document.getElementById('newsForm');
  if (newsForm) {
    newsForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsForm.querySelector('input');
      input.value = 'Subscribed ✓';
      setTimeout(() => { input.value = ''; }, 2500);
    });
  }

  /* ---------------- Back to top ---------------- */
  const backToTop = document.getElementById('backToTop');
  backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  /* ---------------- Smooth scroll for in-page anchors ---------------- */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId.length > 1) {
        const target = document.querySelector(targetId);
        if (target) {
          e.preventDefault();
          const offset = 90;
          const top = target.getBoundingClientRect().top + window.scrollY - offset;
          window.scrollTo({ top, behavior: 'smooth' });
        }
      }
    });
  });

});