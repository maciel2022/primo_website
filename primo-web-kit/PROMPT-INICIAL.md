# Prompt inicial para Claude Code

Copiá y pegá esto en Claude Code, dentro de la carpeta del kit:

---

Vamos a construir el sitio de PRIMO en React. Leé primero `CLAUDE.md` completo: tiene el stack, los design tokens, el detalle de cada sección, las animaciones y las reglas de negocio. Después mirá `reference/propuesta-b.dc.html`, que es el diseño aprobado (CSS y estructura de referencia; no es código para copiar tal cual), y los JSON de `content/`.

Trabajá en este orden y mostrame el avance al terminar cada paso:

1. Scaffold con Vite + React + TypeScript + Tailwind v4 + Motion. Copiá `assets/*` a `public/` y `content/*.json` a `src/content/`. Definí los tokens en `index.css` con `@theme`, cargá las fuentes y creá las utilidades de chamfer y guías.
2. Componentes base: Button, Label, Guides, MediaVideo (con IntersectionObserver y reduced motion), MediaPlaceholder, Modal y Accordion.
3. Navbar, menú mobile, Hero y Footer.
4. Nosotros, Rental y Servicios.
5. Tipos de eventos (carrusel), Artistas (con filtros) y Proyectos (collage + modal).
6. Proceso, Pilares (marquee) y Contacto (formulario).
7. Pasada de responsive (1440 / 1024 / 390), accesibilidad, SEO y `npm run build` sin errores.

Todo el texto sale de los JSON. No muestres precios, no inventes datos y mantené las etiquetas "Demo" y "Perfil demo" donde corresponden.
