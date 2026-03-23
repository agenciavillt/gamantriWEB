// ── INIT INMEDIATO: posicionar y ocultar hexágono antes del primer paint ──
// defer garantiza que corre antes del primer frame del browser
(function() {
  const heroEl = document.getElementById('hero');
  if (!heroEl || typeof gsap === 'undefined') return;
  const cx = heroEl.offsetWidth  * 0.71;
  const cy = heroEl.offsetHeight * 0.67;
  // Posicionar inner group sobre la figura humana
  const innerG = document.getElementById('hex-inner-g');
  if (innerG) innerG.setAttribute('transform', `translate(${cx} ${cy})`);
  // Con inner group posicionado, getBBox() es correcto — GSAP puede calcular svgOrigin bien
  gsap.set('#hex-reveal-g', { scale: 0, svgOrigin: `${cx} ${cy}` });
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
  { titulo:'Serie Roca Viva',   img:'shared/assets/images/gamantri_07_01.jpg', edicion:'Edición 1 de 3', precio:'$ 1.100 USD', desc:'La textura y el silencio de la roca en sus formas más puras.' },
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

  // ── HERO REVEAL — HEXÁGONO CON BORDE DIFUSO ──
  const heroEl = document.getElementById('hero');
  const heroW  = heroEl.offsetWidth;
  const heroH  = heroEl.offsetHeight;

  // Origen: figura humana en la foto basalt (~71% x, ~67% y)
  const cx = heroW * 0.71;
  const cy = heroH * 0.67;

  // Confirmar posición (por si el hero redimensionó entre defer y load)
  document.getElementById('hex-inner-g').setAttribute('transform', `translate(${cx} ${cy})`);

  // Fase 1 (lenta): parte muy pequeño y crece despacio
  // Fase 2 (rápida): acelera hasta cubrir todo el viewport
  const startScale = 0.08;
  const midScale   = 2.8;
  const endScale   = Math.hypot(heroW, heroH) / 75;

  // svgOrigin: punto de escala en coordenadas del viewport SVG (figura humana)
  gsap.set('#hex-reveal-g', { scale: startScale, svgOrigin: `${cx} ${cy}` });
  gsap.set('.hero-logo',    { opacity: 0, y: 18 });
  gsap.set('.hero-tagline', { opacity: 0, y: 18 });

  // Un solo tween expo.in: curva continua, sin saltos de velocidad
  gsap.timeline({ delay: 0.2 })
    .to('#hex-reveal-g', {
      scale: endScale, duration: 2.3, ease: 'expo.in',
      svgOrigin: `${cx} ${cy}`
    })
    .to('#hero-mask-svg',   { opacity: 0, duration: 0.35 }, '-=0.3')
    .to('.hero-logo',    { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.4')
    .to('.hero-tagline', { opacity: 1, y: 0, duration: 0.5, ease: 'power3.out' }, '-=0.35');

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
