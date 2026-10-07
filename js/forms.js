/**
 * AARAV CLINICS — Appointment & Contact Forms
 * Theme: WARM MEDICAL LUXURY
 * Clean inline validation, phone checking, and WhatsApp handoff
 */

(function () {
  'use strict';

  const WHATSAPP_NUM = '916302882910';

  function initForm(form) {
    if (!form) return;

    function getGroup(input) {
      return input.closest('.form-group') || input.parentElement;
    }

    function showError(input, message) {
      const group = getGroup(input);
      group.classList.add('has-error');
      let errEl = group.querySelector('.form-error');
      if (!errEl) {
        errEl = document.createElement('span');
        errEl.className = 'form-error';
        group.appendChild(errEl);
      }
      errEl.textContent = message;
    }

    function clearError(input) {
      const group = getGroup(input);
      group.classList.remove('has-error');
      const errEl = group.querySelector('.form-error');
      if (errEl) errEl.textContent = '';
    }

    // Clear error on input
    form.querySelectorAll('.form-control, .form-select, .form-textarea').forEach(function (input) {
      input.addEventListener('input', function () {
        clearError(input);
      });
      input.addEventListener('change', function () {
        clearError(input);
      });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      let valid = true;

      const nameInput = form.querySelector('[name="name"], #name, #contactName');
      const phoneInput = form.querySelector('[name="phone"], #phone, #contactPhone');
      const serviceInput = form.querySelector('[name="service"], #service, #contactService');
      const messageInput = form.querySelector('[name="message"], #message, #contactMessage');

      if (nameInput) {
        if (!nameInput.value.trim()) {
          showError(nameInput, 'Please enter your full name.');
          valid = false;
        } else {
          clearError(nameInput);
        }
      }

      if (phoneInput) {
        const cleanPhone = phoneInput.value.replace(/\D/g, '');
        if (!cleanPhone || cleanPhone.length < 10) {
          showError(phoneInput, 'Please enter a valid 10-digit mobile number.');
          valid = false;
        } else {
          clearError(phoneInput);
        }
      }

      if (serviceInput && serviceInput.hasAttribute('required')) {
        if (!serviceInput.value || serviceInput.value === '') {
          showError(serviceInput, 'Please select a clinical service.');
          valid = false;
        } else {
          clearError(serviceInput);
        }
      }

      if (!valid) {
        const firstError = form.querySelector('.has-error input, .has-error select, .has-error textarea');
        if (firstError) firstError.focus();
        return;
      }

      const nameVal = nameInput ? nameInput.value.trim() : '';
      const phoneVal = phoneInput ? phoneInput.value.trim() : '';
      const serviceVal = serviceInput ? serviceInput.value.trim() : 'General Consultation';
      const msgVal = messageInput ? messageInput.value.trim() : '';

      const text = encodeURIComponent(
        'Hello Aarav Clinics, I would like to book an appointment.\n\n' +
        '• Name: ' + nameVal + '\n' +
        '• Phone: ' + phoneVal + '\n' +
        '• Service: ' + serviceVal + '\n' +
        (msgVal ? '• Note: ' + msgVal + '\n' : '') +
        '\nLocation: Ashok Nagar, Hyderabad'
      );

      const waUrl = 'https://wa.me/' + WHATSAPP_NUM + '?text=' + text;
      window.open(waUrl, '_blank', 'noopener,noreferrer');

      // Success feedback
      const successBanner = form.querySelector('.form-success-banner') ||
        document.getElementById('apptSuccess') ||
        document.getElementById('contactSuccess');

      if (successBanner) {
        form.reset();
        successBanner.classList.add('is-visible');
        successBanner.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });
  }

  document.addEventListener('DOMContentLoaded', function () {
    const apptForm = document.getElementById('apptForm');
    const contactForm = document.getElementById('contactForm');
    if (apptForm) initForm(apptForm);
    if (contactForm) initForm(contactForm);
    document.querySelectorAll('form[data-form="booking"]').forEach(initForm);
  });
})();
