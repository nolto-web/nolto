'use strict';

/* ================================================
   FAQ Accordion
   ================================================ */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  if (!btn || !answer) return;

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // close all
    document.querySelectorAll('.faq-item.open').forEach(el => {
      const elAnswer = el.querySelector('.faq-answer');
      const elBtn = el.querySelector('.faq-question');

      el.classList.remove('open');

      if (elAnswer) {
        elAnswer.style.maxHeight = null;
      }

      if (elBtn) {
        elBtn.setAttribute('aria-expanded', 'false');
      }
    });

    // open clicked if it was closed
    if (!isOpen) {
      item.classList.add('open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ================================================
   Mobile Hamburger Menu
   ================================================ */
document.addEventListener('DOMContentLoaded', () => {
  const hamburger = document.getElementById('hamburger');
  const mobileNav = document.getElementById('mobileNav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const isOpen = mobileNav.classList.toggle('is-open');
      hamburger.classList.toggle('is-open', isOpen);
      hamburger.setAttribute('aria-expanded', String(isOpen));
      mobileNav.setAttribute('aria-hidden', String(!isOpen));
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        mobileNav.classList.remove('is-open');
        hamburger.classList.remove('is-open');
        hamburger.setAttribute('aria-expanded', 'false');
        mobileNav.setAttribute('aria-hidden', 'true');
      });
    });
  }
});

/* ================================================
   Header scroll shadow
   ================================================ */
const header = document.querySelector('.header');

if (header) {
  const toggleHeaderShadow = () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  };

  toggleHeaderShadow();

  window.addEventListener('scroll', toggleHeaderShadow, { passive: true });
}

/* ================================================
   Scroll-in animation
   ================================================ */
const targets = document.querySelectorAll(
  [
    '.problem-card',
    '.plan-card',
    '.sample-card',
    '.recommend-box',
    '.feature-card',
    '.operator-card',
    '.record-card',
    '.tool-card',
    '.tool-detail-card',
    '.template-card',
    '.template-item-card',
    '.diagnosis-intro-card',
    '.diagnosis-list-card',
    '.diagnosis-check-card',
    '.diagnosis-price-card',
    '.report-preview',
    '.release-policy-card',
    '.process-step',
    '.faq-item',
    '.overview-card',
    '.sec-head',
    '.record-featured',
    '.follow-card'
  ].join(',')
);

if ('IntersectionObserver' in window) {
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  targets.forEach((el, i) => {
    el.classList.add('anim');
    el.style.transitionDelay = (i % 4) * 0.07 + 's';
    observer.observe(el);
  });
} else {
  targets.forEach(el => {
    el.classList.add('in');
  });
}

/* ================================================
   Smooth scroll for in-page anchor links
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    const href = a.getAttribute('href');

    if (!href || href === '#') return;

    const target = document.querySelector(href);
    if (!target) return;

    e.preventDefault();

    const offset = header ? header.offsetHeight + 8 : 0;
    const targetPosition = target.getBoundingClientRect().top + window.pageYOffset - offset;

    window.scrollTo({
      top: targetPosition,
      behavior: 'smooth'
    });
  });
});
