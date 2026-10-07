/**
 * AARAV CLINICS — FAQ Accordion
 */

(function () {
  'use strict';

  document.addEventListener('DOMContentLoaded', function () {
    const items = document.querySelectorAll('.faq-item');

    items.forEach(function (item) {
      const btn = item.querySelector('.faq-question');
      const answer = item.querySelector('.faq-answer');
      if (!btn || !answer) return;

      btn.addEventListener('click', function () {
        const isOpen = item.classList.contains('is-open');

        // Close all
        items.forEach(function (i) {
          i.classList.remove('is-open');
          const a = i.querySelector('.faq-answer');
          if (a) a.style.maxHeight = '0';
          const b = i.querySelector('.faq-question');
          if (b) b.setAttribute('aria-expanded', 'false');
        });

        // Open clicked (toggle)
        if (!isOpen) {
          item.classList.add('is-open');
          answer.style.maxHeight = answer.scrollHeight + 'px';
          btn.setAttribute('aria-expanded', 'true');
        }
      });
    });
  });

})();
