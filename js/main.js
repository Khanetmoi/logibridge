/* main.js - mobile menu, contact demo, carousel, counters, svg animation */

document.addEventListener('DOMContentLoaded', function () {

  /* ---------- MOBILE MENU ---------- */
  const mobileToggle = document.getElementById('mobileToggle');
  const mobileNav = document.getElementById('mobileNav');
  if (mobileToggle && mobileNav) {
    mobileToggle.addEventListener('click', () => {
      const isOpen = mobileNav.style.display === 'block';
      mobileNav.style.display = isOpen ? 'none' : 'block';
      mobileToggle.setAttribute('aria-expanded', !isOpen);
    });
  }

  /* ---------- CONTACT FORM DEMO ---------- */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('button[type="submit"]');
      if (!btn) return;
      btn.disabled = true;
      const old = btn.innerHTML;
      btn.innerHTML = 'Envoi...';
      setTimeout(() => {
        btn.disabled = false;
        btn.innerHTML = old;
        alert('Merci — nous avons bien reçu votre demande. Nous répondrons sous 24 heures.');
        contactForm.reset();
      }, 900);
    });
  }

  /* ---------- IMAGE CAROUSELS ---------- */
  const galleries = document.querySelectorAll('.sector-card .carousel');

  galleries.forEach(carousel => {
    const images = carousel.querySelectorAll('.slide-img');
    const prev = carousel.querySelector('.prev');
    const next = carousel.querySelector('.next');
    let index = 0;
    let autoSlide;

    if (!images.length) return;

    function showImage(i) {
      images.forEach((img, idx) => {
        img.classList.toggle('active', idx === i);
      });
    }

    function nextImage() {
      index = (index + 1) % images.length;
      showImage(index);
    }

    function prevImage() {
      index = (index - 1 + images.length) % images.length;
      showImage(index);
    }

    if (prev) prev.addEventListener('click', prevImage);
    if (next) next.addEventListener('click', nextImage);

    function startAutoSlide() {
      stopAutoSlide();
      autoSlide = setInterval(nextImage, 5000);
    }

    function stopAutoSlide() {
      if (autoSlide) clearInterval(autoSlide);
    }

    carousel.addEventListener('mouseenter', stopAutoSlide);
    carousel.addEventListener('mouseleave', startAutoSlide);

    showImage(index);
    startAutoSlide();
  });

  /* ---------- COUNTERS ---------- */
  const counters = document.querySelectorAll('.num');

  function animateCounter(el, target) {
    const start = 0;
    const duration = 1400;
    const startTime = performance.now();

    function step(now) {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      el.textContent = Math.floor(start + (target - start) * eased);
      if (progress < 1) requestAnimationFrame(step);
    }
    requestAnimationFrame(step);
  }

  const statsSection = document.querySelector('#why .stats');
  if (statsSection) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          counters.forEach((c) => animateCounter(c, +c.dataset.target));
          obs.disconnect();
        }
      });
    }, { threshold: 0.2 });
    obs.observe(statsSection);
  }

  /* ---------- SVG ANIMATION ---------- */
  const packageIcon = document.getElementById('svg-package-icon');
  const stepPositions = {
    'card-sourcing': { x: 100, y: 90 },
    'card-negociation': { x: 300, y: 90 },
    'card-controle': { x: 500, y: 90 },
    'card-logistique': { x: 700, y: 90 }
  };

  Object.keys(stepPositions).forEach(cardId => {
    const card = document.getElementById(cardId);
    if (card && packageIcon) {
      card.addEventListener('mouseenter', () => {
        const { x, y } = stepPositions[cardId];
        packageIcon.setAttribute('x', x);
        packageIcon.setAttribute('y', y);
      });
    }
  });

});
