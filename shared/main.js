// ── INIT INMEDIATO: ocultar elementos header antes del primer paint ──
(function() {
  if (typeof gsap === 'undefined') return;
  gsap.set('.logo-btn',  { opacity: 0 });
  gsap.set('.nav-links, .lang-toggle, .hamburger', { opacity: 0, y: -50 });
})();

// ── MOBILE MENU ──
let menuOpen = false;
function toggleMobileMenu() {
  menuOpen = !menuOpen;
  document.getElementById('mobile-menu').classList.toggle('open', menuOpen);
  document.getElementById('hamburger').classList.toggle('open', menuOpen);
  document.body.style.overflow = menuOpen ? 'hidden' : '';
}
function closeMobileMenu() {
  menuOpen = false;
  document.getElementById('mobile-menu').classList.remove('open');
  document.getElementById('hamburger').classList.remove('open');
  document.body.style.overflow = '';
}

// ── DATOS OBRAS ──
const obras = [
  { titulo:'Serie Patagonia',   img:'shared/assets/images/gamantri_03_01.jpg', edicion:'Edición 2 de 3', precio:'$ 1.200 USD', desc:'Registro de los cielos australes en las cumbres de la Patagonia. Fine Art 300gsm, enmarcada en madera natural.' },
  { titulo:'Serie Vertical',    img:'shared/assets/images/gamantri_04_01.jpg', edicion:'Agotada',         precio:'$ 1.400 USD', desc:'La dimensión vertical del mundo de la roca. Serie completa — obra de colección.' },
  { titulo:'Serie Luz de Hora', img:'shared/assets/images/gamantri_06_01.jpg', edicion:'Edición 3 de 3', precio:'$ 980 USD',   desc:'La luz que dura minutos. Captada en el instante exacto en que el mundo cambia de color.' },
  { titulo:'Serie Roca Viva',   img:'shared/assets/images/gamantri_10_01.jpg', edicion:'Edición 1 de 3', precio:'$ 1.100 USD', desc:'La textura y el silencio de la roca en sus formas más puras.' },
  { titulo:'Serie Silencio',    img:'shared/assets/images/gamantri_09_01.jpg', edicion:'Edición 2 de 3', precio:'$ 1.300 USD', desc:'El silencio tiene una imagen. Esta es.' },
  { titulo:'Serie Frontera',    img:'shared/assets/images/gamantri_10_01.jpg', edicion:'Edición 1 de 3', precio:'$ 1.500 USD', desc:'El límite entre el mundo conocido y lo que queda por descubrir.' },
];

function openObra(i) {
  const o = obras[i];
  document.getElementById('obra-foto').src = o.img;
  document.getElementById('obra-titulo').textContent = o.titulo;
  document.getElementById('obra-edicion').textContent = o.edicion;
  document.getElementById('obra-desc').textContent = o.desc;
  document.getElementById('obra-precio').textContent = o.precio;
  openOverlay('overlay-obra');
}

// ── OVERLAYS ──
function openOverlay(id) {
  document.getElementById(id).classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeOverlay(id) {
  document.getElementById(id).classList.remove('open');
  const anyOpen = document.querySelector('.overlay.open');
  if (!anyOpen) document.body.style.overflow = '';
}
// Cerrar al hacer click en el fondo
document.querySelectorAll('.overlay').forEach(o => {
  o.addEventListener('click', e => {
    if (e.target === o) closeOverlay(o.id);
  });
});
// Cerrar con ESC
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay.open').forEach(o => closeOverlay(o.id));
  }
});

// ── GSAP + ScrollTrigger ──
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── HERO REVEAL ──
  gsap.set('.hero-logo',    { y: 80 });
  gsap.set('.hero-tagline', { clipPath: 'inset(0 100% 0 0)', opacity: 1 });

  gsap.timeline()
    // t=0→1.0s: imagen aparece desde negro
    .to('.hero-img',    { opacity: 1, duration: 1.0, ease: 'power2.inOut' })
    // t=1.1s: símbolo (logo-btn) fade in
    .to('.logo-btn',    { opacity: 1, duration: 0.5, ease: 'power3.out' }, 1.1)
    // t=1.2s: hero-logo + nav simultáneamente
    .to('.hero-logo',   { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.2)
    .to('.nav-links, .lang-toggle, .hamburger', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.2)
    // t=1.5s: tagline se escribe de izquierda a derecha
    .to('.hero-tagline', { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' }, 1.5);

  // Reveals con scrub leve
  const revealEls = document.querySelectorAll('.reveal:not(#hero .reveal)');
  revealEls.forEach(el => {
    const delay = el.classList.contains('reveal-d1') ? 0.12
                : el.classList.contains('reveal-d2') ? 0.24
                : el.classList.contains('reveal-d3') ? 0.36
                : el.classList.contains('reveal-d4') ? 0.48
                : el.classList.contains('reveal-d5') ? 0.60 : 0;
    gsap.from(el, {
      opacity: 0, y: 38,
      duration: 0.9, delay,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', toggleActions: 'play none none none' }
    });
  });

  // Reveal-scale
  document.querySelectorAll('.reveal-scale').forEach(el => {
    gsap.from(el, {
      opacity: 0, scale: 1.04, duration: 0.95, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // Parallax con scrub
  document.querySelectorAll('[data-parallax]').forEach(el => {
    const speed = parseFloat(el.dataset.parallax);
    gsap.to(el, {
      yPercent: speed * 28,
      ease: 'none',
      scrollTrigger: {
        trigger: el.parentElement,
        start: 'top bottom', end: 'bottom top',
        scrub: true
      }
    });
  });

  // Obras cards stagger al entrar
  gsap.from('.obra-card', {
    opacity: 0, y: 50, duration: 0.8, stagger: 0.1, ease: 'power3.out',
    scrollTrigger: { trigger: '.obras-grid', start: 'top 85%', toggleActions: 'play none none none' }
  });
});

// ── HEADER HIDE/SHOW ──
let lastScroll = 0;
const header = document.getElementById('header');

window.addEventListener('scroll', () => {
  const current = window.scrollY;
  if (current > 80) header.classList.add('scrolled');
  else header.classList.remove('scrolled');
  if (current > lastScroll + 8 && current > 200) header.classList.add('hidden');
  else if (current < lastScroll - 4) header.classList.remove('hidden');
  lastScroll = current;
}, { passive: true });

// ── SCROLL TO ──
function scrollToSection(selector) {
  const el = document.querySelector(selector);
  if (el) el.scrollIntoView({ behavior: 'smooth' });
}
function scrollToTop() { window.scrollTo({ top: 0, behavior: 'smooth' }); }

// ── IDIOMA ──
let lang = 'es';
function setLang(l) {
  lang = l;
  document.querySelectorAll('.lang-btn').forEach(b => b.classList.remove('active'));
  document.querySelector(`.lang-btn[onclick="setLang('${l}')"]`).classList.add('active');
  document.querySelectorAll(`[data-${l}]`).forEach(el => {
    el.textContent = el.getAttribute(`data-${l}`);
  });
}
