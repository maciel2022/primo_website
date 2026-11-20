# Kit PRIMO — Propuesta B → React

Todo lo necesario para construir el sitio de PRIMO con Claude Code (CLI).

## Qué hay adentro

| Carpeta / archivo | Qué es |
|---|---|
| `CLAUDE.md` | El brief técnico y de diseño. Claude Code lo lee solo al abrir la carpeta. |
| `PROMPT-INICIAL.md` | El primer mensaje para pegar en Claude Code. |
| `content/` | Todo el texto del sitio en JSON: servicios, rental, artistas, proyectos, contacto… |
| `assets/videos/` | 12 videos optimizados para web (H.264, sin audio). |
| `assets/posters/` | La imagen fija de cada video (se muestra mientras carga). |
| `assets/images/` | El collage de tickets y las fotos de Guille Reboredo y M@ZIEL. |
| `reference/propuesta-b.dc.html` | El diseño aprobado, como referencia visual y de estilos. |

## Cómo empezar

1. Descomprimí el kit en la carpeta donde vas a tener el proyecto.
2. Abrí una terminal en esa carpeta y ejecutá `claude`.
3. Pegá el contenido de `PROMPT-INICIAL.md`.
4. Cuando termine, `npm run dev` para verlo en el navegador.

## Para editar contenido después

- Agregar un artista: sumá un objeto en `content/roster.json` y su foto en `public/images/artistas/`.
- Cambiar el equipo de rental: `content/rental.json`.
- Datos de contacto: `content/site.json` → `contacto`.

## Antes de publicar

Revisá la checklist "Pendientes antes de publicar" al final de `CLAUDE.md`. Lo más importante es reemplazar los videos de muestra y el collage de tickets por material propio o con licencia.
