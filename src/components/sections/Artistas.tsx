import { motion } from 'motion/react'
import { useState } from 'react'
import { roster, type Artist } from '../../content'
import { Button } from '../ui/Button'
import { Guides } from '../ui/Guides'
import { Label } from '../ui/Label'
import { MediaPlaceholder, type Scene } from '../ui/MediaPlaceholder'
import { SectionHead } from '../ui/SectionHead'

const TODOS = roster.filtros[0]
// Chamfers alternados por posición en la grilla
const CHAMFERS = ['chamfer-tr', '', 'chamfer-bl', '']
// Escenas de reemplazo para perfiles sin foto
const SCENES: Scene[] = ['venue', 'launch', 'show', 'gala', 'dj', 'sunset']

/** "DJs" → "DJ", "Bandas" → "Banda" */
const singular = (categoria: string) => categoria.replace(/s$/, '')

function Card({ a, index, scene }: { a: Artist; index: number; scene: Scene }) {
  return (
    <motion.a
      href="#contacto"
      aria-label={`Consultar por ${a.nombre}`}
      className={`group relative block h-[400px] overflow-hidden bg-[#1a1a1a] text-white no-underline mobile:h-[300px] ${CHAMFERS[index % 4]}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5, delay: index * 0.04 }}
    >
      {a.foto ? (
        <img
          src={a.foto}
          alt=""
          loading="lazy"
          decoding="async"
          className="media-zoom absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: a.fotoPosicion }}
        />
      ) : (
        <MediaPlaceholder scene={scene} className="absolute! inset-0" />
      )}
      <span className="absolute inset-0 bg-[linear-gradient(transparent_45%,rgb(0_0_0/.8))]" aria-hidden="true" />
      <span className="absolute inset-0 flex flex-col justify-between p-[18px]">
        {a.demo ? (
          <span className="self-start bg-white px-2 py-[5px] font-mono text-[10px] text-ink uppercase">
            Perfil demo
          </span>
        ) : (
          <span />
        )}
        <span>
          <b className="display block text-[30px] leading-none">{a.nombre}</b>
          <small className="mt-2 block font-mono text-[11px] uppercase">
            {[singular(a.categoria), ...a.estilos].join(' · ')}
          </small>
        </span>
      </span>
    </motion.a>
  )
}

export function Artistas() {
  const [cat, setCat] = useState(TODOS)
  const visibles = roster.artistas.filter((a) => cat === TODOS || a.categoria === cat)

  return (
    <section id="artistas" className="section" aria-labelledby="t-artistas">
      <Guides />
      <div className="wrap">
        <SectionHead etiqueta={roster.etiqueta} titulo={roster.titulo} id="t-artistas">
          <p className="mt-[18px] mb-0 max-w-[52ch] text-base leading-[1.6] text-[#333]">{roster.bajada}</p>
        </SectionHead>

        <div
          className="mt-10 flex w-max max-w-full flex-wrap border border-ink mobile:w-auto"
          role="group"
          aria-label="Filtrar artistas"
        >
          {roster.filtros.map((f) => (
            <button
              key={f}
              type="button"
              aria-pressed={cat === f}
              onClick={() => setCat(f)}
              className={`-mr-px -mb-px min-h-11 border-0 border-r border-b border-ink px-[18px] font-mono text-xs uppercase transition-colors duration-250 mobile:flex-auto ${
                cat === f ? 'bg-ink text-white' : 'bg-white text-ink hover:bg-mist'
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* key={cat}: al cambiar el filtro las tarjetas vuelven a entrar con fade */}
        <div key={cat} className="mt-7 grid grid-cols-4 gap-4 tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-3">
          {visibles.map((a, i) => (
            <Card
              key={a.nombre}
              a={a}
              index={i}
              scene={SCENES[roster.artistas.indexOf(a) % SCENES.length]}
            />
          ))}
        </div>
        {visibles.length === 0 && (
          <p className="mt-7 font-mono text-xs text-[#555] uppercase" role="status">
            Todavía no hay artistas en esta categoría.
          </p>
        )}

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5">
          <Label className="m-0!">¿Buscás un artista o un estilo en particular?</Label>
          <Button href="#contacto" tone="ink">
            Consultá por artistas
          </Button>
        </div>
      </div>
    </section>
  )
}
