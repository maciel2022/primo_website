# PRIMO — Sitio web (Propuesta B)

Sitio one-page de **PRIMO**, productora integral de eventos enfocada en **eventos de música en la playa y salones chicos** (no eventos masivos). El eje comercial es el **rental de sonido / cabina DJ**, más un roster de DJs y artistas y servicios de producción.

Este repo se construye a partir de un diseño aprobado en Claude Design (Propuesta B, "editorial en rojo"). La referencia visual exacta está en `primo-web-kit/reference/propuesta-b.dc.html`. Todo el contenido está en `src/content/*.json` y los medios en `public/` (`videos/`, `posters/`, `images/`). La carpeta `primo-web-kit/` es el kit original y queda solo como referencia: no se edita.

> Idioma del sitio y del código visible: **español rioplatense** (voseo: "Contanos", "Consultá").

---

## Reglas de negocio (no negociables)

1. **Nunca mostrar precios** en ninguna parte del sitio.
2. **No inventar** clientes, cifras, años de trayectoria ni estadísticas.
3. No se publica contenido de muestra como si fuera real. (Los proyectos y perfiles demo del diseño original se quitaron el 2026-11-20; si vuelve a haber contenido de muestra, se marca con una etiqueta **"Demo"**.)
4. Los textos entre corchetes (`[TU EMAIL]`, `[Ubicación]`, etc.) son placeholders: dejarlos visibles tal cual hasta que se carguen los datos reales.
5. Botones y links tienen que funcionar. Nada decorativo que parezca clickeable sin acción.

---

## Stack

- **Vite + React + TypeScript**
- **Tailwind CSS v4** (`@tailwindcss/vite`), tokens en `@theme`
- **Motion** (`motion`, importar desde `motion/react`) para animaciones
- Sin router: una sola página con anclas y scroll suave
- Fuentes de Google Fonts: **Archivo** (eje de ancho), **IBM Plex Mono**, **Inter**

```bash
npm create vite@latest . -- --template react-ts
npm i motion
npm i -D tailwindcss @tailwindcss/vite
# copiar assets/* a public/  (videos/, posters/, images/)
```

### Estructura sugerida

```
src/
  main.tsx, App.tsx, index.css        # @theme con tokens, fuentes, utilidades (chamfer, guides)
  content/                            # importar los JSON de /content (copiarlos acá)
  components/
    ui/       Button, Label, Guides, MediaVideo, MediaPlaceholder, Accordion, Reveal
    layout/   Navbar, MobileMenu, Footer
    sections/ Hero, Nosotros, Rental, Servicios, Artistas, Proyectos, Proceso, Pilares, Contacto
  hooks/      useInViewVideo, usePrefersReducedMotion
```

Los componentes de sección leen de `src/content/*.json` (a través de `src/content/index.ts`): **nada de texto hardcodeado** que esté en los JSON. Agregar un artista, servicio o proyecto tiene que ser solo editar un JSON.

---

## Design tokens

### Color
| Token | Valor | Uso |
|---|---|---|
| `red` | `#D91E26` | Acento de marca: hero, banda de pilares, botones, wordmark del footer |
| `ink` | `#0B0B0B` | Texto principal, secciones oscuras, bloques de flecha de los botones |
| `paper` | `#FFFFFF` | Fondo de secciones claras |
| `mist` | `#F2F2F2` | Fondos grises (Proyectos), chips |
| `line` | `#E1E1E1` / `#E7E7E7` | Bordes y divisores |
| texto secundario | `#333` / `#555` / `#666` (en claro), `#BDBDBD` / `#CFCFCF` (en oscuro) |

El rojo tiene contraste suficiente con texto blanco (≈5:1). No poner texto rojo chico sobre negro.

### Tipografía
- **Display:** Archivo, `font-stretch: 62%`, `font-weight: 900`, MAYÚSCULAS, `line-height: .9`, `letter-spacing: -.01em`.
  - Títulos de sección (H2): `clamp(46px, 6.2cqi, 92px)`.
  - Wordmark del hero "PRIMO©": `clamp(120px, 27.5cqi, 420px)`, ocupa todo el ancho, apoyado en el borde inferior del hero.
- **Etiquetas/mono:** IBM Plex Mono 11–12px, MAYÚSCULAS. Formato de etiqueta de sección: `[PR/ Quiénes somos]` precedido por un pequeño ícono rojo tipo "play/flag".
- **Cuerpo:** Inter 400–600, 15–17px, `line-height: 1.55–1.6`.

### Formas y detalles de la identidad
- **Esquinas cortadas (chamfer)** en imágenes y videos: `clip-path` con corte diagonal en una esquina. Variantes: arriba-derecha 64px (`ch`), abajo-izquierda 56px (`ch2`), dos esquinas opuestas 40px (`ch3`).
- **Guías visibles:** en las secciones, 4 columnas de líneas verticales finas de fondo (`rgba(11,11,11,.07)`; en secciones oscuras `rgba(255,255,255,.07)`), alineadas al contenedor. En mobile, 2 columnas.
- **Botón:** bloque de texto (mono, mayúsculas, 12px, alto 48px) + bloque cuadrado de 48px con flecha ↗, que tiene la esquina inferior derecha cortada 12px. Variantes: texto negro con flecha roja / texto blanco con flecha negra / texto rojo con flecha negra. En hover el padding del texto crece.
- **Contenedor:** `max-width: 1360px`, padding lateral `clamp(20px, 4cqi, 56px)`. Padding vertical de sección `clamp(72px, 8cqi, 120px)`.
- Íconos: SVG inline de trazo fino. Sin emojis.

---

## Secciones (en orden)

Ver `primo-web-kit/reference/propuesta-b.dc.html` para el detalle visual exacto de cada una.

1. **Navbar fija.** Logo "PRIMO©" (Archivo display) · links en mono (Inicio, Nosotros, Rental, Servicios, Artistas, Proyectos) · "Contacto ↗" a la derecha. Transparente con texto blanco sobre el hero; al scrollear pasa a fondo blanco con texto negro. En ≤1080px: botón hamburguesa → **menú a pantalla completa rojo**, con links grandes en display numerados `[01]…[07]` y botón de WhatsApp abajo.
2. **Hero** (`#inicio`, alto 860px; 760px en mobile). Video de fondo `hero.mp4` (muted, loop, autoplay, playsInline, con poster) y velo oscuro suave. Arriba: a la izquierda la etiqueta mono, a la derecha la bajada y los 2 CTAs. Al medio: una línea horizontal fina blanca con 4 puntos de registro. Abajo: el wordmark gigante **PRIMO©** en blanco. Rótulo "Video de muestra" arriba a la derecha (solo mientras el video no sea propio).
3. **Nosotros** (`#nosotros`). Grilla 3/9: a la izquierda la etiqueta y el video chico `nosotros-salon` (chamfer `ch2`, 220px de alto). A la derecha, el statement en display con una **barra roja que crece** al entrar en pantalla entre las dos frases y la palabra "conceptos" en rojo. Debajo, 2 columnas: el párrafo + CTA "Nuestro rental" y el video `nosotros-en-vivo` (chamfer `ch`, 380px de alto).
4. **Rental** (`#rental`). Grilla 7/5. Izquierda: el video `rental-sonido` con chamfer, la etiqueta roja "Equipo destacado" arriba a la izquierda, el título "Sonido profesional" abajo en blanco y un degradado oscuro abajo para que se lea. **La altura del video se estira para igualar la columna de texto**: arriba y abajo alineados. Derecha: descripción (17–20px), ficha técnica como `<dl>` (dato en mono gris / valor), nota chica, CTAs "Consultá disponibilidad" y "WhatsApp". Debajo, una fila de chips "Otros productos de rental →" que llevan a `#contacto`.
5. **Servicios** (`#servicios`, "Soluciones integrales."). Grilla 3×3 con bordes de 1px. Cada tarjeta: video (o imagen) de fondo cover + degradado oscuro abajo + número mono, título display, descripción y un cuadrado con flecha que rota 45° en hover. En hover el medio hace un zoom suave (scale 1.06). Colores de texto por tarjeta según `services.json` → `texto` (Marketing usa texto **negro** con velo **blanco**; Tickets usa blanco sobre velo negro fuerte). Toda la tarjeta lleva a `#contacto`.
6. **Artistas** (`#artistas`, "Nuestro roster."). Cambio pedido el 2026-11-20: solo se publican los **dos artistas destacados** (Guille Reboredo y M@ZIEL). Cada uno va en una tarjeta horizontal: foto con chamfer y etiqueta roja "Artista destacado", nombre en display, estilos como chips y dos botones: **"Presskit"** (descarga el PDF si `presskit` tiene la ruta a un archivo en `public/presskits/`; con `null`, el mismo botón lleva al formulario) y "Consultar fecha". Debajo, un bloque gris "¿Buscás otro estilo?" para **consultar DJs por estilo** (chips editables en `roster.json` → `estilos.items`, más "Otro estilo") y el botón "Pedir el listado". El resto del roster **no se publica en el sitio**: PRIMO envía por fuera un listado oficial (con precios) a quien lo pide. Los chips y botones precargan el formulario de contacto (`src/lib/consulta.ts`).
7. **Proyectos** (`#proyectos`, sección **negra**, "Proyectos que podemos cubrir."). Fusiona las secciones "Tipos de eventos" y "Proyectos" del diseño original (cambio pedido el 2026-11-20: no hay fotos ni proyectos reales para mostrar, así que la sección cuenta qué tipos de proyecto cubre PRIMO). Carrusel: tarjeta central grande (chamfer `ch`, 520px) con índice "01 / 06" en una etiqueta blanca, título, descripción y chips de servicios, más las tarjetas laterales anterior y siguiente al 60% de opacidad (clickeables). Flechas: anterior (blanca) y siguiente (roja), e indicador de barras. En ≤1080px se ocultan las laterales. **Videos de fondo:** viven en `projects.json` → `videos`; cada item elige el suyo por posición (`video: 0`, `1`, `2`…) y varios items pueden compartir el mismo. La tarjeta central hace fundido entre ellos; cada video se descarga recién cuando su tarjeta pasa al frente y solo se reproduce el activo. `encuadre` (opcional) define el recorte, útil en videos verticales. Los archivos van en `public/videos/proyectos/` y `public/posters/proyectos/`. Debajo, "Producciones de cualquier escala" y el CTA "Quiero algo así" a `#contacto`. No lleva etiquetas "Demo", ubicación, año ni modal: no se muestran proyectos ficticios.
8. **Proceso** (`#proceso`). Grilla 3/9: video lateral con chamfer (`site.json` → `proceso.media`) y un **acordeón** de 5 pasos ("01/ Conceptualización"…) con el ícono + que se transforma en −. El paso 1 está abierto por defecto.
9. **Pilares.** Banda **roja** con un marquee horizontal infinito de "CREATIVIDAD ◆ PROFESIONALISMO ◆ TECNOLOGÍA ◆ COMPROMISO" en display gigante y blanco. Debajo, el título "Cada detalle importa." y 4 columnas con número mono `[01]`, título y texto, separadas por líneas blancas.
10. **Contacto** (`#contacto`, sección **negra**). Título gigante "Hagamos algo extraordinario." + bajada. Grilla 5/7. Izquierda: WhatsApp destacado (bloque rojo), email, Instagram y zona como filas con flecha. Derecha: un formulario con nombre*, correo*, "¿Qué necesitás?"*, tipo de evento, fecha estimada (`date`) y descripción. Inputs oscuros con borde inferior que se pone rojo en focus. Al enviar muestra el estado de éxito ("Gracias por escribirnos.") con un botón "Enviar otra consulta".
11. **Footer** negro. Logo, claim, columnas Navegación / Redes / Contacto, wordmark **PRIMO©** gigante en rojo, copyright y "Volver arriba ↑".

---

## Movimiento (Motion)

- **Reveal** de bloques al entrar en viewport: `opacity 0→1`, `y 32→0`, ease `[0.2, 0.7, 0.1, 1]`, una sola vez.
- **Hero:** el wordmark sube con fade (≈1.3s); el video arranca con scale 1.1→1; los textos de arriba entran escalonados.
- **Parallax** suave en los medios chamfer de Nosotros (y ±5%).
- **Barra roja** del statement: `scaleX 0→1` atada al scroll.
- **Marquee** de pilares: loop lineal (~26s).
- **Navbar:** cambio de fondo y color según el scroll (`useScroll`).
- Hovers: zoom de medios 1.06 (≈1.3s), flechas que rotan y botones que crecen.
- **`prefers-reduced-motion`:** desactivar todo lo anterior, mostrar el contenido estático y pausar los videos (mostrar el poster).

---

## Videos (performance)

- Componente `MediaVideo`: `muted loop playsInline`, siempre con `poster`, `preload="none"`. Se reproduce con **IntersectionObserver** solo cuando está visible y se pausa al salir. Solo el hero usa `preload="auto"` + `autoplay`.
- Setear `video.muted = true` por JS antes de `play()` (Safari).
- Todos ya están comprimidos (H.264, sin audio, ≤1280px). Si se agregan nuevos: `ffmpeg -i in.mp4 -an -vf scale=1280:-2 -c:v libx264 -preset veryfast -crf 28 -movflags +faststart out.mp4`.
- Imágenes con `loading="lazy"` y `decoding="async"` (menos el poster del hero).

---

## Accesibilidad

- HTML semántico: `header/nav/main/section/footer`, un solo `h1` (el wordmark, con `aria-label="PRIMO"`), `h2` por sección.
- Contraste mínimo de 4.5:1 en texto chico. Foco visible: outline rojo de 2px.
- Videos decorativos con `aria-hidden`. Los que transmiten contenido llevan descripción.
- Menú mobile: `role="dialog"`, `aria-modal`, foco atrapado, Esc para cerrar y foco devuelto al disparador.
- Áreas táctiles de 44px o más. Inputs con `<label>`.

## SEO

- `<title>`: "PRIMO — Producción integral de eventos, rental de sonido y DJs". Meta description, Open Graph (usar el poster del hero) y `lang="es"`.
- JSON-LD `LocalBusiness` con nombre, zona y redes. Completarlo cuando estén los datos reales.

## Formulario

Dejar `onSubmit` preparado para un servicio externo, con un `TODO` claro. Recomendado: **Formspree** o **Resend** (con un endpoint serverless). Validar en el cliente: obligatorios y email válido. Mientras no haya endpoint, mostrar el estado de éxito localmente.

---

## Pendientes antes de publicar (checklist)

- [ ] Número de WhatsApp, email, Instagram, teléfono y zona de cobertura reales (`src/content/site.json`).
- [ ] **Reemplazar los videos de muestra** por material propio o con licencia comercial. Hoy son de bancos de stock y se usan solo como maqueta.
- [ ] **Collage de tickets** (`06-tickets.jpg`): está hecho con plantillas de terceros. Reemplazarlo por tickets con la marca PRIMO y verificar la licencia.
- [ ] Video propio para la tarjeta Sunset sessions del carrusel de Proyectos (hoy usa un video de muestra).
- [ ] PDFs de presskit de Guille Reboredo y M@ZIEL (`public/presskits/` + campo `presskit` en `roster.json`).
- [ ] Endpoint del formulario.
- [ ] Favicon y logo definitivo de PRIMO.

## Criterios de terminado

- `npm run build` sin errores ni warnings de TypeScript.
- Se ve igual que la referencia en 1440px, 1024px y 390px.
- Lighthouse mobile: Performance ≥ 85, Accessibility ≥ 95, SEO ≥ 95.
- Todos los links y botones hacen algo.
