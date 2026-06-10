'use strict';

/* ================================================
   Hamburger Menu
   ================================================ */
const hamburger  = document.querySelector('.hamburger');
const mobileMenu = document.querySelector('.mobile-menu');
const mobileLinks = mobileMenu ? mobileMenu.querySelectorAll('a') : [];

function closeMenu() {
  hamburger.classList.remove('active');
  mobileMenu.classList.remove('open');
  mobileMenu.setAttribute('aria-hidden', 'true');
  hamburger.setAttribute('aria-expanded', 'false');
  document.body.style.overflow = '';
}

if (hamburger && mobileMenu) {
  hamburger.addEventListener('click', () => {
    const isOpen = hamburger.classList.toggle('active');
    mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', String(!isOpen));
    hamburger.setAttribute('aria-expanded', String(isOpen));
    document.body.style.overflow = isOpen ? 'hidden' : '';
  });

  mobileLinks.forEach(link => link.addEventListener('click', closeMenu));

  // Close on backdrop click (tap outside nav)
  mobileMenu.addEventListener('click', e => {
    if (e.target === mobileMenu) closeMenu();
  });
}

/* ================================================
   FAQ Accordion
   ================================================ */
document.querySelectorAll('.faq-item').forEach(item => {
  const btn  = item.querySelector('.faq-q');
  const body = item.querySelector('.faq-a');
  if (!btn || !body) return;

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('open');

    // Close all open items
    document.querySelectorAll('.faq-item.open').forEach(el => {
      el.classList.remove('open');
      el.querySelector('.faq-a').style.maxHeight = null;
      el.querySelector('.faq-q').setAttribute('aria-expanded', 'false');
    });

    // Open clicked item if it was closed
    if (!isOpen) {
      item.classList.add('open');
      body.style.maxHeight = body.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ================================================
   Header Scroll Shadow
   ================================================ */
const header = document.querySelector('.header');
if (header) {
  window.addEventListener('scroll', () => {
    header.classList.toggle('scrolled', window.scrollY > 50);
  }, { passive: true });
}

/* ================================================
   Scroll-in Animation (IntersectionObserver)
   ================================================ */
const animTargets = document.querySelectorAll(
  '.problem-card, .service-card, .reason-card, .case-card, .pricing-card, .flow-step, .faq-item, .hero-stats'
);

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('in');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

animTargets.forEach((el, i) => {
  el.classList.add('anim');
  el.style.transitionDelay = (i % 4) * 0.08 + 's';
  observer.observe(el);
});

/* ================================================
   Smooth Scroll for Anchor Links
   ================================================ */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', e => {
    const target = document.querySelector(anchor.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const headerH = header ? header.offsetHeight : 0;
    window.scrollTo({
      top: target.offsetTop - headerH - 8,
      behavior: 'smooth'
    });
  });
});
