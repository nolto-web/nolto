/* ===================================================
   HOKKAIDO NIGHT FOREST TOUR — script.js
   NOLTO 制作サンプル（体験型アウトドアイベントLP）
   =================================================== */
'use strict';

/* ---------------------------------------------------
   タブ切り替え
   --------------------------------------------------- */
const tabButtons = document.querySelectorAll('.tab-btn');
const tabPanels  = document.querySelectorAll('.tab-panel');

tabButtons.forEach((btn) => {
  btn.addEventListener('click', () => {
    tabButtons.forEach((b) => {
      b.classList.remove('is-active');
      b.setAttribute('aria-selected', 'false');
    });
    tabPanels.forEach((p) => {
      p.classList.remove('is-active');
      p.hidden = true;
    });

    btn.classList.add('is-active');
    btn.setAttribute('aria-selected', 'true');

    const panel = document.getElementById(btn.getAttribute('aria-controls'));
    if (panel) {
      panel.hidden = false;
      panel.classList.add('is-active');
    }
  });
});

/* ---------------------------------------------------
   FAQアコーディオン
   --------------------------------------------------- */
const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach((item) => {
  const btn    = item.querySelector('.faq-question');
  const answer = item.querySelector('.faq-answer');
  if (!btn || !answer) return;

  btn.addEventListener('click', () => {
    const isOpen = item.classList.contains('is-open');

    faqItems.forEach((i) => {
      i.classList.remove('is-open');
      const a = i.querySelector('.faq-answer');
      const q = i.querySelector('.faq-question');
      if (a) a.style.maxHeight = null;
      if (q) q.setAttribute('aria-expanded', 'false');
    });

    if (!isOpen) {
      item.classList.add('is-open');
      answer.style.maxHeight = answer.scrollHeight + 'px';
      btn.setAttribute('aria-expanded', 'true');
    }
  });
});

/* ---------------------------------------------------
   ギャラリーモーダル
   --------------------------------------------------- */
const modal       = document.getElementById('galleryModal');
const modalScene  = document.getElementById('modalScene');
const modalTitle  = document.getElementById('modalTitle');
const modalDesc   = document.getElementById('modalDesc');
let lastFocused   = null;

const openModal = (item) => {
  if (!modal) return;
  lastFocused = item;

  modalScene.className = 'modal-scene g-' + item.dataset.scene;
  modalTitle.textContent = item.dataset.title || '';
  modalDesc.textContent  = item.dataset.desc || '';

  modal.hidden = false;
  document.body.classList.add('modal-open');

  const closeBtn = modal.querySelector('.modal-close');
  if (closeBtn) closeBtn.focus();
};

const closeModal = () => {
  if (!modal || modal.hidden) return;
  modal.hidden = true;
  document.body.classList.remove('modal-open');
  if (lastFocused) lastFocused.focus();
};

document.querySelectorAll('.gallery-item').forEach((item) => {
  item.addEventListener('click', () => openModal(item));
});

if (modal) {
  modal.querySelectorAll('[data-modal-close]').forEach((el) => {
    el.addEventListener('click', closeModal);
  });
}

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
});

/* ---------------------------------------------------
   スクロール時フェードイン
   --------------------------------------------------- */
const fadeItems = document.querySelectorAll('.fade-item');

if ('IntersectionObserver' in window) {
  const fadeObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-in');
          fadeObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  fadeItems.forEach((el, i) => {
    el.style.transitionDelay = (i % 3) * 0.1 + 's';
    fadeObserver.observe(el);
  });
} else {
  fadeItems.forEach((el) => el.classList.add('is-in'));
}

/* ---------------------------------------------------
   カウントアップ
   --------------------------------------------------- */
const countEls = document.querySelectorAll('.count-up');

const animateCount = (el) => {
  const target   = parseInt(el.dataset.count, 10) || 0;
  const duration = 1400;
  const start    = performance.now();

  const step = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    /* ease-out カーブで減速しながら到達 */
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.round(target * eased).toLocaleString();
    if (progress < 1) requestAnimationFrame(step);
  };

  requestAnimationFrame(step);
};

if ('IntersectionObserver' in window) {
  const countObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          animateCount(entry.target);
          countObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.5 }
  );

  countEls.forEach((el) => countObserver.observe(el));
} else {
  countEls.forEach((el) => {
    el.textContent = el.dataset.count;
  });
}

/* ---------------------------------------------------
   スマホ固定CTAの表示制御
   --------------------------------------------------- */
const fixedCta = document.getElementById('fixedCta');

if (fixedCta) {
  const updateFixedCta = () => {
    const scrollY = window.scrollY;
    const docH    = document.documentElement.scrollHeight;
    const winH    = window.innerHeight;

    /* ヒーローを過ぎたら表示、フッター付近で隠す */
    const show = scrollY > winH * 0.85 && scrollY + winH < docH - 180;
    fixedCta.classList.toggle('is-visible', show);
    fixedCta.setAttribute('aria-hidden', String(!show));
  };

  window.addEventListener('scroll', updateFixedCta, { passive: true });
  updateFixedCta();
}
