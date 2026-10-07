/**
 * AARAV CLINICS — Testimonials Carousel
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const track = document.querySelector('.testimonial-track');
    const dotsContainer = document.querySelector('.testimonial-dots');
    const prevBtn = document.getElementById('testimonialPrev');
    const nextBtn = document.getElementById('testimonialNext');

    if (!track) return;

    const cards = Array.from(track.children);
    let current = 0;
    let autoTimer = null;
    let perView = getPerView();

    function getPerView() {
      if (window.innerWidth < 600) return 1;
      if (window.innerWidth < 900) return 2;
      return 3;
    }

    function getMaxIndex() {
      return Math.max(0, cards.length - perView);
    }

    function updateTrack() {
      const cardWidth = cards[0] ? cards[0].offsetWidth : 0;
      const gap = parseInt(getComputedStyle(track).gap) || 24;
      const offset = current * (cardWidth + gap);
      track.style.transform = 'translateX(-' + offset + 'px)';

      // Update dots
      if (dotsContainer) {
        dotsContainer.querySelectorAll('.testimonial-dot').forEach(function (d, i) {
          d.classList.toggle('is-active', i === current);
        });
      }
    }

    function buildDots() {
      if (!dotsContainer) return;
      dotsContainer.innerHTML = '';
      const max = getMaxIndex() + 1;
      for (let i = 0; i < max; i++) {
        const dot = document.createElement('button');
        dot.className = 'testimonial-dot' + (i === 0 ? ' is-active' : '');
        dot.setAttribute('aria-label', 'Go to slide ' + (i + 1));
        dot.addEventListener('click', function () {
          goTo(i);
          resetAuto();
        });
        dotsContainer.appendChild(dot);
      }
    }

    function goTo(index) {
      current = Math.min(Math.max(index, 0), getMaxIndex());
      updateTrack();
    }

    function next() { goTo(current === getMaxIndex() ? 0 : current + 1); }
    function prev() { goTo(current === 0 ? getMaxIndex() : current - 1); }

    function startAuto() {
      autoTimer = setInterval(next, 5000);
    }

    function resetAuto() {
      clearInterval(autoTimer);
      startAuto();
    }

    if (prevBtn) prevBtn.addEventListener('click', function () { prev(); resetAuto(); });
    if (nextBtn) nextBtn.addEventListener('click', function () { next(); resetAuto(); });

    // Keyboard support
    track.addEventListener('keydown', function (e) {
      if (e.key === 'ArrowLeft') { prev(); resetAuto(); }
      if (e.key === 'ArrowRight') { next(); resetAuto(); }
    });

    // Touch/swipe
    let touchStartX = 0;
    track.addEventListener('touchstart', function (e) {
      touchStartX = e.touches[0].clientX;
    }, { passive: true });

    track.addEventListener('touchend', function (e) {
      const diff = touchStartX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 50) {
        diff > 0 ? next() : prev();
        resetAuto();
      }
    }, { passive: true });

    // Pause on hover
    track.addEventListener('mouseenter', function () { clearInterval(autoTimer); });
    track.addEventListener('mouseleave', startAuto);

    // Resize handler
    window.addEventListener('resize', function () {
      const newPerView = getPerView();
      if (newPerView !== perView) {
        perView = newPerView;
        current = 0;
        buildDots();
      }
      updateTrack();
    });

    buildDots();
    updateTrack();
    startAuto();
  });

})();
