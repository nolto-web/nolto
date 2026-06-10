/* ===================================================
   やすらぎ整体サロン komorebi — script.js
   =================================================== */

/* --- Scroll Animation --- */
const animEls = document.querySelectorAll('.anim');

const animObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('in');
        animObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.1, rootMargin: '0px 0px -36px 0px' }
);

animEls.forEach((el) => animObserver.observe(el));

/* --- FAQ Accordion --- */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const btn = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    /* Close all */
    faqItems.forEach((i) => {
      i.classList.remove('is-open');
      i.querySelector('.faq-question').setAttribute('aria-expanded', 'false');
      const a = i.querySelector('.faq-answer');
      a.classList.remove('is-open');
      a.setAttribute('aria-hidden', 'true');
    });

    /* Open if it was closed */
    if (!isOpen) {
      item.classList.add('is-open');
      btn.setAttribute('aria-expanded', 'true');
      answer.classList.add('is-open');
      answer.setAttribute('aria-hidden', 'false');
    }
  });
});

/* --- Fixed CTA Visibility --- */
const fixedCta = document.getElementById('fixedCta');

if (fixedCta) {
  const updateFixedCta = () => {
    const scrollY = window.scrollY;
    const docH   = document.documentElement.scrollHeight;
    const winH   = window.innerHeight;

    if (scrollY < 200 || scrollY + winH > docH - 220) {
      fixedCta.style.opacity = '0';
      fixedCta.style.pointerEvents = 'none';
    } else {
      fixedCta.style.opacity = '1';
      fixedCta.style.pointerEvents = 'auto';
    }
  };

  fixedCta.style.opacity = '0';
  fixedCta.style.pointerEvents = 'none';
  fixedCta.style.transition = 'opacity 0.3s ease';

  window.addEventListener('scroll', updateFixedCta, { passive: true });
  updateFixedCta();
}
