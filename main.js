(function () {
  'use strict';

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  function syncFaqAria() {
    document.querySelectorAll('.faq-item').forEach(function (item) {
      const btn = item.querySelector('.faq-q');
      const panel = item.querySelector('.faq-a');
      if (!btn || !panel) return;
      const open = item.classList.contains('open');
      btn.setAttribute('aria-expanded', open ? 'true' : 'false');
      panel.setAttribute('aria-hidden', open ? 'false' : 'true');
    });
  }

  function closeAllFaq() {
    document.querySelectorAll('.faq-item.open').forEach(function (i) {
      i.classList.remove('open');
    });
    syncFaqAria();
  }

  function toggleFaq(button) {
    const item = button.closest('.faq-item');
    if (!item) return;
    const wasOpen = item.classList.contains('open');
    closeAllFaq();
    if (!wasOpen) {
      item.classList.add('open');
      button.setAttribute('aria-expanded', 'true');
      const panel = item.querySelector('.faq-a');
      if (panel) panel.setAttribute('aria-hidden', 'false');
    }
  }

  function toggleTheme() {
    const isDark = document.body.classList.toggle('dark');
    const toggle = document.getElementById('theme-toggle');
    if (toggle) toggle.textContent = isDark ? '☀️' : '🌙';
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
  }

  function applyStoredTheme() {
    if (localStorage.getItem('theme') === 'dark') {
      document.body.classList.add('dark');
      const toggle = document.getElementById('theme-toggle');
      if (toggle) toggle.textContent = '☀️';
    }
  }

  function animateCounter(el) {
    const target = parseFloat(el.dataset.target);
    const isPlus = el.dataset.plus === '1';
    const duration = 1200;
    const start = performance.now();
    function update(now) {
      const progress = Math.min((now - start) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      const value = Math.round(ease * target);
      el.textContent = value + (isPlus ? '+' : '');
      if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
  }

  applyStoredTheme();

  const progressBar = document.getElementById('scroll-progress');
  if (progressBar) {
    window.addEventListener(
      'scroll',
      function () {
        const scrolled = window.scrollY;
        const total = document.documentElement.scrollHeight - window.innerHeight;
        const pct = total > 0 ? (scrolled / total) * 100 : 0;
        progressBar.style.width = pct + '%';
      },
      { passive: true }
    );
  }

  const themeToggle = document.getElementById('theme-toggle');
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  const navLogo = document.querySelector('.nav-logo');
  if (navLogo) {
    navLogo.addEventListener('click', function (e) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

  const hamburger = document.getElementById('nav-hamburger');
  const mobileNav = document.getElementById('mobile-nav');
  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', function () {
      const isOpen = mobileNav.classList.toggle('open');
      hamburger.classList.toggle('open', isOpen);
      hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      mobileNav.setAttribute('aria-hidden', isOpen ? 'false' : 'true');
    });
    mobileNav.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        mobileNav.classList.remove('open');
        hamburger.classList.remove('open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }

  document.querySelectorAll('.faq-q').forEach(function (btn) {
    btn.addEventListener('click', function () {
      toggleFaq(btn);
    });
  });
  syncFaqAria();

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('revealed');
          revealObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  document.querySelectorAll('.segment-card').forEach(function (el, i) {
    el.style.cssText =
      'opacity:0; transform:translateX(' +
      (i % 2 === 0 ? '-40px' : '40px') +
      '); transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1) ' +
      i * 0.12 +
      's, transform 0.7s cubic-bezier(0.16,1,0.3,1) ' +
      i * 0.12 +
      's';
    revealObserver.observe(el);
  });

  document.querySelectorAll('.result-item').forEach(function (el, i) {
    el.style.cssText =
      'opacity:0; transform:translateY(30px); transition:opacity 0.6s ease ' +
      i * 0.1 +
      's, transform 0.6s ease ' +
      i * 0.1 +
      's';
    revealObserver.observe(el);
  });

  document.querySelectorAll('.lesson-card').forEach(function (el, i) {
    el.style.cssText =
      'opacity:0; transform:translateY(40px) scale(0.97); transition:opacity 0.65s cubic-bezier(0.16,1,0.3,1) ' +
      i * 0.15 +
      's, transform 0.65s cubic-bezier(0.16,1,0.3,1) ' +
      i * 0.15 +
      's';
    revealObserver.observe(el);
  });

  document.querySelectorAll('.wow-item').forEach(function (el, i) {
    el.style.cssText =
      'opacity:0; transform:translateY(30px); transition:opacity 0.6s ease ' +
      i * 0.1 +
      's, transform 0.6s ease ' +
      i * 0.1 +
      's';
    revealObserver.observe(el);
  });

  document.querySelectorAll('.pk-item').forEach(function (el, i) {
    el.style.cssText =
      'opacity:0; transform:translateX(-30px); transition:opacity 0.55s ease ' +
      i * 0.08 +
      's, transform 0.55s ease ' +
      i * 0.08 +
      's';
    revealObserver.observe(el);
  });

  document.querySelectorAll('.tariff-card').forEach(function (el, i) {
    el.style.cssText =
      'opacity:0; transform:translateY(40px) scale(0.96); transition:opacity 0.7s cubic-bezier(0.16,1,0.3,1) ' +
      i * 0.15 +
      's, transform 0.7s cubic-bezier(0.16,1,0.3,1) ' +
      i * 0.15 +
      's';
    revealObserver.observe(el);
  });

  const counterObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          animateCounter(e.target);
          counterObserver.unobserve(e.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  document.querySelectorAll('.stat-num[data-target]').forEach(function (el) {
    if (reduceMotion) {
      const target = parseFloat(el.dataset.target);
      const isPlus = el.dataset.plus === '1';
      el.textContent = Math.round(target) + (isPlus ? '+' : '');
    } else {
      counterObserver.observe(el);
    }
  });

  if (!reduceMotion) {
    document.querySelectorAll('.btn-gold, .btn-outline, .nav-cta').forEach(function (btn) {
      btn.addEventListener('click', function (e) {
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        ripple.style.cssText =
          'width:' +
          size +
          'px; height:' +
          size +
          'px; left:' +
          (e.clientX - rect.left - size / 2) +
          'px; top:' +
          (e.clientY - rect.top - size / 2) +
          'px';
        this.appendChild(ripple);
        setTimeout(function () {
          ripple.remove();
        }, 600);
      });
    });
  }
})();
