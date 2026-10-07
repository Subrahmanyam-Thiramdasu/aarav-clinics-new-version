/**
 * AARAV CLINICS — Animations
 * Handles: scroll reveal, parallax, image reveal
 */

(function () {
  'use strict';

  // ── IntersectionObserver for .reveal ─────────────── //
  const revealOpts = {
    rootMargin: '0px 0px -60px 0px',
    threshold: 0.08,
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        // Unobserve after reveal (one-time)
        observer.unobserve(entry.target);
      }
    });
  }, revealOpts);

  function initReveal() {
    document.querySelectorAll(
      '.reveal, .reveal-left, .reveal-right, .reveal-scale, .img-reveal'
    ).forEach(function (el) {
      observer.observe(el);
    });
  }

  // ── Hero background parallax (subtle) ────────────── //
  function initHeroParallax() {
    const heroBg = document.querySelector('.hero-bg');
    if (!heroBg) return;

    window.addEventListener('scroll', function () {
      const y = window.scrollY;
      if (y < window.innerHeight) {
        heroBg.style.transform = 'scale(1) translateY(' + (y * 0.2) + 'px)';
      }
    }, { passive: true });
  }

  // ── Hero loaded state ─────────────────────────────── //
  function initHero() {
    const hero = document.querySelector('.hero');
    if (!hero) return;
    requestAnimationFrame(function () {
      hero.classList.add('is-loaded');
    });
  }

  // ── Page loader ───────────────────────────────────── //
  function initLoader() {
    const loader = document.getElementById('pageLoader');
    if (!loader) return;
    window.addEventListener('load', function () {
      setTimeout(function () {
        loader.classList.add('is-done');
        loader.addEventListener('transitionend', function () {
          loader.remove();
        }, { once: true });
      }, 300);
    });
  }

  // ── Initialise ────────────────────────────────────── //
  document.addEventListener('DOMContentLoaded', function () {
    initReveal();
    initHeroParallax();
    initHero();
    initLoader();
  });

})();
