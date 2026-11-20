import { motion } from 'motion/react'
import { useState } from 'react'
import { events, type EventType } from '../../content'
import { ArrowLeft, ArrowRight } from '../ui/Icons'
import { Guides } from '../ui/Guides'
import { MediaPlaceholder, type Scene } from '../ui/MediaPlaceholder'
import { SectionHead } from '../ui/SectionHead'

// Escenas de reemplazo, en orden, mientras `media` sea null en events.json
const SCENES: Scene[] = ['sunset-djs', 'sunset', 'venue', 'gala', 'launch', 'room']

function Media({ item, index }: { item: EventType; index: number }) {
  if (item.media)
    return (
      <img
        src={item.media}
        alt=""
        loading="lazy"
        decoding="async"
        className="absolute inset-0 h-full w-full object-cover"
      />
    )
  return <MediaPlaceholder scene={SCENES[index % SCENES.length]} className="absolute! inset-0" />
}

export function TiposEventos() {
  const items = events.items
  const n = items.length
  const [i, setI] = useState(0)
  const prev = (i - 1 + n) % n
  const next = (i + 1) % n
  const pad = (v: number) => String(v).padStart(2, '0')

  const side = (idx: number, dir: 'Anterior' | 'Siguiente', chamfer: string) => (
    <button
      type="button"
      onClick={() => setI(idx)}
      aria-label={`${dir}: ${items[idx].titulo}`}
      className={`group relative block h-[360px] w-full overflow-hidden border-0 p-0 opacity-60 transition-opacity duration-400 hover:opacity-90 focus-visible:opacity-90 tablet:hidden ${chamfer}`}
    >
      <Media item={items[idx]} index={idx} />
      <span className={`scene-caption ${dir === 'Anterior' ? 'right-3.5 left-auto!' : ''}`}>{items[idx].titulo}</span>
    </button>
  )

  return (
    <section className="section dark" aria-labelledby="t-eventos">
      <Guides />
      <div className="wrap">
        <SectionHead etiqueta={events.etiqueta} titulo={events.titulo} id="t-eventos" />

        <div
          className="relative mt-16 grid grid-cols-[1fr_1.6fr_1fr] items-end gap-5 tablet:grid-cols-1"
          role="group"
          aria-roledescription="carrusel"
          aria-label="Tipos de eventos"
        >
          {side(prev, 'Anterior', 'chamfer-bl')}
          <motion.div
            key={i}
            className="chamfer-tr relative h-[520px] overflow-hidden mobile:h-[420px]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            aria-live="polite"
          >
            <Media item={items[i]} index={i} />
            <span
              className="absolute inset-0 bg-[linear-gradient(transparent_50%,rgb(0_0_0/.7))]"
              aria-hidden="true"
            />
            <span className="absolute top-6 left-7 bg-white px-3 py-2 font-mono text-xs text-ink">
              {pad(i + 1)} / {pad(n)}
            </span>
            <h3 className="display absolute right-7 bottom-7 left-7 text-[clamp(34px,3.6cqi,52px)] text-white">
              {items[i].titulo}
            </h3>
          </motion.div>
          {side(next, 'Siguiente', 'chamfer-tr')}
        </div>

        <div className="mt-7 flex items-center justify-between gap-4">
          <div className="flex gap-1.5" aria-hidden="true">
            {items.map((it, d) => (
              <span
                key={it.titulo}
                className={`block h-0.5 transition-all duration-300 ${d === i ? 'w-12 bg-white' : 'w-6 bg-white/25'}`}
              />
            ))}
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              aria-label="Tipo de evento anterior"
              onClick={() => setI(prev)}
              className="grid h-14 w-14 place-items-center border-0 bg-white text-ink"
            >
              <ArrowLeft size={18} stroke={1.5} />
            </button>
            <button
              type="button"
              aria-label="Tipo de evento siguiente"
              onClick={() => setI(next)}
              className="grid h-14 w-14 place-items-center border-0 bg-red text-white"
            >
              <ArrowRight size={18} stroke={1.5} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
