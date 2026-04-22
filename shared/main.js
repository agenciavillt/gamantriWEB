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
  {
    titulo: 'La Cárcel',
    imgFoto: 'shared/assets/images/obras/3-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/2-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/1-O-Mu-F.jpg',
    descripcion: 'Como si la naturaleza tuviera un segmento diseñado y construido por el hombre. La cárcel muestra un sector de columnas perfectas de basalto en el Valle de los Cóndores en Chile, uno de los sectores de escalada más imponentes del mundo.',
    series: [
      { precio: '350 USD', copia: '1/5', vendida: true },
      { precio: '620 USD', copia: '2/5', vendida: true },
      { precio: '840 USD', copia: '3/5', vendida: false, destacada: true },
      { precio: '1.050 USD', copia: '4/5', vendida: false },
      { precio: '1.350 USD', copia: '5/5', vendida: false },
    ],
    piezas: 'Unidad',
    referencia: '90×120 cm, marco de madera, con paspartú',
    precioDestacado: '$840 USD',
  },
  {
    titulo: 'Llaima en Nubes',
    imgFoto: 'shared/assets/images/obras/6-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/5-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/4-O-Mu-F.jpg',
    descripcion: 'Episodio púnico y poético de un volcán icónico, que luego de muchas visitas se mostró de una manera irrepetible: vestido de nubes por tan solo unos breves minutos.',
    series: [
      { precio: '350 USD', copia: '1/3', vendida: true },
      { precio: '680 USD', copia: '2/3', vendida: false, destacada: true },
      { precio: '1.100 USD', copia: '3/3', vendida: false },
    ],
    piezas: 'Unidad',
    referencia: '60×90 cm, marco de aluminio, con paspartú',
    precioDestacado: '$680 USD',
  },
  {
    titulo: 'Los Cuatro Elementos',
    imgFoto: 'shared/assets/images/obras/9-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/8-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/7-O-Mu-F.jpg',
    descripcion: 'Un recorrido a lo largo de la cordillera chilena. Cuatro imágenes tomadas a distintas horas del día en diferentes regiones del país, simbolizando los cuatro elementos. El fuego del norte, el agua de los volcanes araucanos, la tierra en Cochamó, y el aire con los vientos patagónicos de Aysén.',
    series: [
      { precio: '320 USD', copia: '1/3', vendida: true },
      { precio: '540 USD', copia: '2/3', vendida: false, destacada: true },
      { precio: '950 USD', copia: '3/3', vendida: false },
    ],
    piezas: 'Cuatro unificadas',
    referencia: '42×84 cm, marco de madera, con paspartú',
    precioDestacado: '$540 USD',
  },
  {
    titulo: 'Era Leo',
    imgFoto: 'shared/assets/images/obras/12-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/11-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/10-O-Mu-F.jpg',
    descripcion: 'Leo Cea con 11 años colgando del paso más difícil de Era Vella, en Margalef, Catalunya. Simboliza un momento único de la escalada mundial: el encadene del 9a (5.14d) más joven de la historia. Noviembre de 2024.',
    series: [
      { precio: '350 USD', copia: '1/5', vendida: true },
      { precio: '460 USD', copia: '2/5', vendida: true },
      { precio: '670 USD', copia: '3/5', vendida: false, destacada: true },
      { precio: '1.100 USD', copia: '4/5', vendida: false },
      { precio: '1.500 USD', copia: '5/5', vendida: false },
    ],
    piezas: 'Unidad',
    referencia: '60×110 cm, marco de madera, con paspartú',
    precioDestacado: '$670 USD',
  },
  {
    titulo: 'Nodriza',
    imgFoto: 'shared/assets/images/obras/15-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/14-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/13-O-Mu-F.jpg',
    descripcion: 'Entre las magias meteorológicas de las montañas aparecen las nubes lenticulares. La magnitud y perfección de esta sobre el blanco puro del Volcán Llaima se muestra como una nave nodriza acechando.',
    series: [
      { precio: '320 USD', copia: '1/3', vendida: false, destacada: true },
      { precio: '580 USD', copia: '2/3', vendida: false },
      { precio: '950 USD', copia: '3/3', vendida: false },
    ],
    piezas: 'Unidad',
    referencia: '50×80 cm, marco de acero, con paspartú',
    precioDestacado: '$320 USD',
  },
  {
    titulo: 'Caminos',
    imgFoto: 'shared/assets/images/obras/18-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/17-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/16-O-Mu-F.jpg',
    descripcion: 'En la máxima expresión del minimalismo en la naturaleza aparece seguido un paisaje de nieve. Cuando se suman nubes blancas bajas y apenas unos senderos que nos muestran ínfimos, se hace poesía.',
    series: [
      { precio: '450 USD', copia: '1/3', vendida: false, destacada: true },
      { precio: '830 USD', copia: '2/3', vendida: false },
      { precio: '1.150 USD', copia: '3/3', vendida: false },
    ],
    piezas: 'Unidad',
    referencia: '80×110 cm, marco de aluminio, con paspartú',
    precioDestacado: '$450 USD',
  },
  {
    titulo: 'El Último Tango',
    imgFoto: 'shared/assets/images/obras/21-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/20-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/19-O-Mu-F.jpg',
    descripcion: 'Entre las paredes de la mina en el Cajón del Maipo aparece este icónico multilargo. La foto muestra el segundo ascenso de dos de los mejores escaladores de Chile, Ronny Escobar y Benja Vargas.',
    series: [
      { precio: '250 USD', copia: '1/3', vendida: true },
      { precio: '380 USD', copia: '2/3', vendida: true },
      { precio: '650 USD', copia: '3/3', vendida: false, destacada: true },
    ],
    piezas: 'Unidad',
    referencia: '60×90 cm, marco de aluminio, con paspartú',
    precioDestacado: '$650 USD',
  },
  {
    titulo: 'Penitentes',
    imgFoto: 'shared/assets/images/obras/24-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/23-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/22-O-Mu-F.jpg',
    descripcion: 'El cerro El Plomo, el más alto de la Región Metropolitana de Chile. Esta imagen muestra unos penitentes casi diseñados en su campamento base, el Federación, a 5424 msnm.',
    series: [
      { precio: '350 USD', copia: '1/3', vendida: false, destacada: true },
      { precio: '680 USD', copia: '2/3', vendida: false },
      { precio: '920 USD', copia: '3/3', vendida: false },
    ],
    piezas: 'Unidad',
    referencia: '50×90 cm, marco de aluminio, con paspartú',
    precioDestacado: '$350 USD',
  },
  {
    titulo: 'Bloque Chileno',
    imgFoto: 'shared/assets/images/obras/27-O-O.jpg',
    imgZoom: 'shared/assets/images/obras/26-O-Mu-Z.jpg',
    imgFull: 'shared/assets/images/obras/25-O-Mu-F.jpg',
    descripcion: 'Composición de 4 fotografías de lugares icónicos de Chile (Cajón del Maipo, Valle de los Cóndores, Cerro Castillo y Cochamó) que conecta a los escaladores en una diagonal ascendente.',
    series: [
      { precio: '480 USD', copia: '1/3', vendida: false, destacada: true },
      { precio: '760 USD', copia: '2/3', vendida: false },
      { precio: '1.250 USD', copia: '3/3', vendida: false },
    ],
    piezas: 'Cuatro individuales',
    referencia: '40×60 cm cada pieza, marco de madera, con paspartú',
    precioDestacado: '$480 USD',
  },
];

// ── ABRIR OBRA ──
function openObra(i) {
  const o = obras[i];

  document.getElementById('obra-foto-sola').src = o.imgFoto;
  document.getElementById('obra-foto-zoom').src = o.imgZoom;
  document.getElementById('obra-foto-full').src = o.imgFull;
  document.getElementById('obra-modal-titulo').textContent = o.titulo;
  document.getElementById('obra-modal-desc').textContent = o.descripcion;
  document.getElementById('obra-modal-piezas').textContent = o.piezas;
  document.getElementById('obra-modal-ref').textContent = o.referencia;
  document.getElementById('obra-modal-precio').textContent = o.precioDestacado;

  const seriesEl = document.getElementById('obra-modal-series');
  seriesEl.innerHTML = o.series.map(s => {
    const cls = s.vendida ? 'serie-item sold' : (s.destacada ? 'serie-item destacada' : 'serie-item');
    const copiaTxt = s.vendida ? s.copia + ' · SOLD' : s.copia;
    return `<div class="${cls}"><div class="serie-precio">${s.precio}</div><div class="serie-copia">${copiaTxt}</div></div>`;
  }).join('');

  document.getElementById('overlay-obra').scrollTop = 0;
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
document.querySelectorAll('.overlay').forEach(o => {
  o.addEventListener('click', e => {
    if (e.target === o) closeOverlay(o.id);
  });
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') {
    document.querySelectorAll('.overlay.open').forEach(o => closeOverlay(o.id));
  }
});

// ── HERO KEN BURNS SLIDESHOW ──
function startHeroSlideshow() {
  const SHOW  = 7;    // segundos visibles
  const CROSS = 1.5;  // duración del crossfade

  function showImg1() {
    gsap.set('.hero-img-2', { scale: 1.0 });
    gsap.fromTo('.hero-img-1', { scale: 1.0 }, { scale: 1.16, duration: SHOW + CROSS, ease: 'none' });
    gsap.delayedCall(SHOW, () => {
      gsap.to('.hero-img-1', { opacity: 0, duration: CROSS, ease: 'power2.inOut' });
      gsap.to('.hero-img-2', { opacity: 1, duration: CROSS, ease: 'power2.inOut' });
      gsap.delayedCall(CROSS, showImg2);
    });
  }

  function showImg2() {
    gsap.set('.hero-img-1', { scale: 1.0 });
    gsap.fromTo('.hero-img-2', { scale: 1.0 }, { scale: 1.16, duration: SHOW + CROSS, ease: 'none' });
    gsap.delayedCall(SHOW, () => {
      gsap.to('.hero-img-2', { opacity: 0, duration: CROSS, ease: 'power2.inOut' });
      gsap.to('.hero-img-1', { opacity: 1, duration: CROSS, ease: 'power2.inOut' });
      gsap.delayedCall(CROSS, showImg1);
    });
  }

  showImg1();
}

// ── GSAP + ScrollTrigger ──
window.addEventListener('load', () => {
  if (typeof gsap === 'undefined') return;
  gsap.registerPlugin(ScrollTrigger);

  // ── HERO INTRO ──
  gsap.set('.hero-img-2', { opacity: 0, scale: 1.0 });
  gsap.set('.hero-logo',    { y: 80 });
  gsap.set('.hero-tagline', { clipPath: 'inset(0 100% 0 0)', opacity: 1 });

  gsap.timeline()
    .to('.hero-img-1',   { opacity: 1, duration: 1.0, ease: 'power2.inOut' })
    .to('.logo-btn',     { opacity: 1, duration: 0.5, ease: 'power3.out' }, 1.1)
    .to('.hero-logo',    { opacity: 1, y: 0, duration: 0.7, ease: 'power3.out' }, 1.2)
    .to('.nav-links, .lang-toggle, .hamburger', { opacity: 1, y: 0, duration: 0.6, ease: 'power3.out' }, 1.2)
    .to('.hero-tagline', { clipPath: 'inset(0 0% 0 0)', duration: 1.0, ease: 'power3.inOut' }, 1.5)
    .call(startHeroSlideshow);

  // ── REVEALS CON SCROLL ──
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

  document.querySelectorAll('.reveal-scale').forEach(el => {
    gsap.from(el, {
      opacity: 0, scale: 1.04, duration: 0.95, ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 88%', toggleActions: 'play none none none' }
    });
  });

  // ── PARALLAX GENÉRICO ──
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

  // ── OBRAS HERO parallax ──
  gsap.fromTo('.obras-hero-img',
    { yPercent: -10 },
    {
      yPercent: 10,
      ease: 'none',
      scrollTrigger: {
        trigger: '.obras-hero',
        start: 'top bottom', end: 'bottom top',
        scrub: true
      }
    }
  );

  // ── OBRAS CARDS stagger ──
  gsap.from('.obra-card', {
    opacity: 0, y: 50, duration: 0.8, stagger: 0.08, ease: 'power3.out',
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
  document.querySelectorAll(`.lang-btn[onclick="setLang('${l}')"]`).forEach(b => b.classList.add('active'));
  document.querySelectorAll(`[data-${l}]`).forEach(el => {
    el.textContent = el.getAttribute(`data-${l}`);
  });
}
