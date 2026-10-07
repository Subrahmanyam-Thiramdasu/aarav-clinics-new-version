/**
 * AARAV CLINICS — Counters
 * Animated number counters when in viewport
 */

(function () {
  'use strict';

  function easeOutExpo(t) {
    return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-target'), 10);
    const duration = 2000;
    const startTime = performance.now();

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutExpo(progress);
      const current = Math.round(easedProgress * target);

      el.textContent = current.toLocaleString('en-IN') + (el.getAttribute('data-suffix') || '');

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  const counterObs = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        animateCounter(entry.target);
        counterObs.unobserve(entry.target);
      }
    });
  }, { rootMargin: '0px 0px -40px 0px', threshold: 0.4 });

  document.addEventListener('DOMContentLoaded', function () {
    document.querySelectorAll('[data-counter]').forEach(function (el) {
      counterObs.observe(el);
    });
  });

})();
