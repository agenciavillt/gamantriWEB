// ── CURSOS.JS — Gamantri Landing Cursos ──

// Header scroll
const cursosHeader = document.getElementById('cursos-header');
window.addEventListener('scroll', () => {
  if (window.scrollY > 60) cursosHeader.classList.add('scrolled');
  else cursosHeader.classList.remove('scrolled');
}, { passive: true });

// Smooth scroll para links internos
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', e => {
    e.preventDefault();
    const target = document.querySelector(a.getAttribute('href'));
    if (target) target.scrollIntoView({ behavior: 'smooth' });
  });
});

// GSAP Reveals
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // Reveal genérico
  document.querySelectorAll('.reveal').forEach(el => {
    const delay = el.classList.contains('reveal-d1') ? 0.12
                : el.classList.contains('reveal-d2') ? 0.24
                : el.classList.contains('reveal-d3') ? 0.36 : 0;
    gsap.from(el, {
      opacity: 0, y: 32,
      duration: 0.9, delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Reveal-scale para cards
  document.querySelectorAll('.reveal-scale').forEach(el => {
    gsap.from(el, {
      opacity: 0, scale: 1.03, duration: 0.9, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Hero parallax leve
  gsap.to('.cursos-hero-img', {
    yPercent: 18,
    ease: 'none',
    scrollTrigger: {
      trigger: '#cursos-hero',
      start: 'top top', end: 'bottom top',
      scrub: true
    }
  });
});
