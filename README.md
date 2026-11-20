# PRIMO — Sitio web

Landing one-page de PRIMO, productora integral de eventos. Vite + React + TypeScript, Tailwind CSS v4 y Motion.

## Comandos

```bash
npm install      # una sola vez
npm run dev      # desarrollo, en http://localhost:5173
npm run build    # build de producción en dist/
npm run preview  # servir la build localmente
npm run lint
```

## Editar contenido

Todo el texto sale de `src/content/*.json`; no hace falta tocar componentes.

- **Datos de contacto:** `site.json` → `contacto` (WhatsApp, email, Instagram, teléfono, zona).
- **Artistas destacados:** `roster.json` → `artistas` (foto en `public/images/artistas/`). Para el presskit, poner el PDF en `public/presskits/` y su ruta en el campo `presskit`.
- **Estilos de DJ para consultar:** `roster.json` → `estilos.items`.
- **Equipo de rental:** `rental.json`.
- **Servicios:** `services.json`.
- **Tipos de proyecto (carrusel):** `projects.json`. Los videos de fondo van en `videos` (alcanza con uno) y cada item elige cuál usar con `video: 0`, `1`…

Los medios están en `public/` (`videos/`, `posters/`, `images/`).

## Estructura

```
src/
  content/      JSON + index.ts (tipos y acceso al contenido)
  components/
    ui/         Button, Label, Guides, MediaVideo, MediaPlaceholder, Accordion, Reveal…
    layout/     Navbar, MobileMenu, Footer, Logo
    sections/   Hero, Nosotros, Rental, Servicios, Artistas, Proyectos, Proceso, Pilares, Contacto
  hooks/        useInViewVideo, usePrefersReducedMotion, useDialog
  styles/       scenes.css (escenas de reemplazo para fotos que faltan)
primo-web-kit/  kit original del diseño (referencia; no se edita)
```

El brief completo de diseño y las reglas de negocio están en `CLAUDE.md`.

## Deploy (Vercel)

Vercel detecta Vite solo: build `npm run build`, salida `dist/`. No hace falta configuración extra.

## Pendientes antes de publicar

Ver la checklist al final de `CLAUDE.md`. Además:

- El formulario **todavía no envía nada**: muestra el estado de éxito localmente. El punto de conexión está marcado con `TODO` en `src/components/sections/Contacto.tsx`.
- `og:image` en `index.html` usa una ruta relativa; cambiarla por la URL absoluta cuando esté el dominio.
