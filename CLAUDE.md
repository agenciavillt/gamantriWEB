# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## PROYECTO
Nombre: GamantriWEB
Objetivo: Página web para venta de obras de fotografía, cursos y servicios audiovisuales de Cristián Gamantri.

## EQUIPO
Ver `agents-bank.md` para perfiles completos. Usar `@Nombre` para invocar agentes directamente.
- **RODRIGO [PM]** — coordina y delega, no ejecuta trabajo técnico
- Martín [STRAT] · Lucía [DSGN] · Isabella [DSGN] · Nico [DSGN] · Camilo [DSGN] · Valentín [DSGN]

## Servidor de desarrollo

```sh
npx serve -p 4200 .
```

Sitio estático puro (HTML/CSS/JS vanilla). Sin paso de compilación.

## Arquitectura

**Páginas existentes:**
- `index.html` — Home: hero, galería de obras, teaser cursos, servicios, footer
- `cursos.html` — Landing cursos: hero, propuesta de valor, steps, formulario Web3Forms

**Páginas planificadas** (ver `shared/context/arquitectura.md`):
- `/obras` + `/obras/[slug]` — colección completa + obra individual con pasarela de pago
- `/servicios` + `/servicios/briefing` — portfolio audiovisual + formulario
- `/cursos/diagnostico` — formulario de diagnóstico ampliado

**CSS/JS por página:**
- `shared/styles.css` + `shared/main.js` → globales (header, menú móvil, overlays, animaciones)
- `cursos.css` + `cursos.js` → exclusivos de cursos

## Patrones técnicos

### Animaciones GSAP (ScrollTrigger)
Agregar estas clases a cualquier elemento nuevo que deba animarse al hacer scroll:
- `.reveal` — fade-up genérico
- `.reveal-d1` … `.reveal-d5` — misma animación con delay escalonado (0.12s × N)
- `.reveal-scale` — fade + scale leve
- `data-parallax="<speed>"` — parallax (valores típicos: `-0.3` a `0.5`)

Las animaciones se registran automáticamente en el `window.addEventListener('load', ...)` de `main.js` y `cursos.js`.

### Overlays / modales
Funciones globales en `main.js`: `openOverlay(id)` / `closeOverlay(id)`.
Todo overlay debe tener la clase `.overlay` y un ID único. El sistema ya maneja cierre con ESC y click en el fondo. Para nuevos overlays, solo agregar el HTML con `.overlay` + llamar `openOverlay('mi-id')`.

### Sistema bilingüe (ES/EN)
Cualquier texto visible puede ser bilingüe con atributos de datos:
```html
<span data-es="Texto en español" data-en="English text">Texto en español</span>
```
La función `setLang(l)` en `main.js` actualiza automáticamente todos los elementos con `data-es` / `data-en`.

### Header scroll
- Clase `.scrolled` se agrega al superar 80px de scroll
- Clase `.hidden` se agrega al scrollear hacia abajo past 200px (hide-on-scroll)
- IDs distintos por página: `header` (index) y `cursos-header` (cursos)

### Formulario Web3Forms
`cursos.js` envía a `https://api.web3forms.com/submit` via `fetch`. El `access_key` vive en un `<input type="hidden">` dentro del formulario. Al éxito muestra el overlay `#gracias-overlay`.

## Design system

Variables CSS en `shared/styles.css`:
```css
--base: #080808   --surface: #111111   --stone: #2E2E2C
--text: #F2EDE8   --muted: #7a7a76     --accent: #D4571E
```
Tipografías cargadas desde `shared/assets/fonts/`:
- **Play** — display, headings, precios, títulos grandes
- **Jura** — body, UI, navegación

> Nota: `shared/context/identidad-visual.md` documenta la visión de diseño original (Cormorant Garamond + Inter) pero la implementación actual usa Play + Jura.

**Assets:** logos en `shared/assets/logos/`, imágenes en `shared/assets/images/`.

## Documentación de contexto
Leer antes de trabajar en copy, diseño o estrategia:
- `shared/context/arquitectura.md` — sitemap completo e IA
- `shared/context/identidad-visual.md` — paleta, tipografía, referencias (Salgado, Renan Ozturk, Red Bull Illume)
- `shared/context/copy-productos.md` — copy oficial de productos
- `shared/context/funnels.md` — journeys de conversión (Cursos y Servicios)
