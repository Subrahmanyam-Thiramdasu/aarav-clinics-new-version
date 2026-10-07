/**
 * AARAV CLINICS — Navigation
 * Handles: sticky navbar, mobile menu, dropdown
 */

(function () {
  'use strict';

  const header = document.getElementById('siteHeader');
  const toggle = document.getElementById('navToggle');
  const mobileMenu = document.getElementById('mobileMenu');
  const body = document.body;

  // ── Sticky scroll behavior ──────────────────────── //
  let lastScrollY = 0;
  let ticking = false;

  function onScroll() {
    if (!ticking) {
      requestAnimationFrame(handleScroll);
      ticking = true;
    }
  }

  function handleScroll() {
    const y = window.scrollY;
    if (header) {
      header.classList.toggle('is-scrolled', y > 40);
    }
    lastScrollY = y;
    ticking = false;
  }

  window.addEventListener('scroll', onScroll, { passive: true });
  handleScroll(); // initial

  // ── Mobile menu ─────────────────────────────────── //
  function openMenu() {
    if (!toggle || !mobileMenu) return;
    toggle.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    toggle.setAttribute('aria-label', 'Close menu');
    mobileMenu.classList.add('is-open');
    body.style.overflow = 'hidden';
  }

  function closeMenu() {
    if (!toggle || !mobileMenu) return;
    toggle.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    toggle.setAttribute('aria-label', 'Open menu');
    mobileMenu.classList.remove('is-open');
    body.style.overflow = '';
  }

  function toggleMenu() {
    if (mobileMenu && mobileMenu.classList.contains('is-open')) {
      closeMenu();
    } else {
      openMenu();
    }
  }

  if (toggle) toggle.addEventListener('click', toggleMenu);

  // Close on overlay click
  if (mobileMenu) {
    mobileMenu.addEventListener('click', function (e) {
      if (e.target === mobileMenu) closeMenu();
    });
  }

  // Close on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') closeMenu();
  });

  // ── Mobile accordion sub-menus ───────────────────── //
  document.querySelectorAll('[data-mobile-toggle]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      const targetId = btn.getAttribute('data-mobile-toggle');
      const target = document.getElementById(targetId);
      if (!target) return;
      const isOpen = target.classList.toggle('is-open');
      btn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      // Rotate chevron
      const chevron = btn.querySelector('.mobile-chevron');
      if (chevron) chevron.style.transform = isOpen ? 'rotate(180deg)' : '';
    });
  });

  // ── Desktop dropdown keyboard ─────────────────────── //
  document.querySelectorAll('.nav-item').forEach(function (item) {
    const link = item.querySelector('.nav-link');
    const drop = item.querySelector('.nav-drop');
    if (!drop) return;

    link.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        item.classList.toggle('is-open');
      }
    });

    document.addEventListener('click', function (e) {
      if (!item.contains(e.target)) {
        item.classList.remove('is-open');
      }
    });
  });

  // ── Active nav link ──────────────────────────────── //
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-link').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href && (href === currentPath || href.endsWith('/' + currentPath))) {
      a.classList.add('is-active');
    }
  });

  document.querySelectorAll('.mobile-nav-link').forEach(function (a) {
    const href = a.getAttribute('href');
    if (href && (href === currentPath || href.endsWith('/' + currentPath))) {
      a.style.color = 'var(--teal)';
    }
  });

})();
