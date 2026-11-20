import { motion } from 'motion/react'
import { useState } from 'react'
import { projects } from '../../content'
import { Button } from '../ui/Button'
import { Guides } from '../ui/Guides'
import { ArrowLeft, ArrowRight } from '../ui/Icons'
import { MediaVideo } from '../ui/MediaVideo'
import { EASE } from '../ui/motion'
import { SectionHead } from '../ui/SectionHead'

const pad = (v: number) => String(v).padStart(2, '0')

/**
 * Tipos de proyecto que cubre PRIMO, en un carrusel.
 * No hace falta un video por tarjeta: uno o dos videos de fondo se comparten entre todas
 * (projects.json → `videos`) y la tarjeta central hace fundido entre ellos.
 */
export function Proyectos() {
  const { items, videos } = projects
  const n = items.length
  const [i, setI] = useState(0)
  const prev = (i - 1 + n) % n
  const next = (i + 1) % n
  const videoOf = (idx: number) => (videos.length ? (items[idx].video ?? idx) % videos.length : -1)
  const active = videoOf(i)
  // Un video se monta (y se descarga) recién la primera vez que su tarjeta queda al frente
  const [vistos, setVistos] = useState(() => new Set([active]))
  const go = (idx: number) => {
    setI(idx)
    setVistos((v) => (v.has(videoOf(idx)) ? v : new Set(v).add(videoOf(idx))))
  }

  const side = (idx: number, dir: 'Anterior' | 'Siguiente', chamfer: string) => {
    const bg = videos[videoOf(idx)]
    return (
      <button
        type="button"
        onClick={() => go(idx)}
        aria-label={`${dir}: ${items[idx].titulo}`}
        className={`group relative block h-[360px] w-full overflow-hidden border-0 bg-coal p-0 text-left opacity-60 transition-opacity duration-400 hover:opacity-90 focus-visible:opacity-90 tablet:hidden ${chamfer}`}
      >
        {bg && (
          <img
            src={bg.poster}
            alt=""
            loading="lazy"
            decoding="async"
            className="media-zoom absolute inset-0 h-full w-full object-cover"
            style={{ objectPosition: bg.encuadre }}
          />
        )}
        <span className="absolute inset-0 bg-[linear-gradient(rgb(0_0_0/.35),rgb(0_0_0/.8))]" aria-hidden="true" />
        <span
          className={`display absolute right-5 bottom-5 left-5 text-[26px] text-white ${dir === 'Anterior' ? 'pl-10' : ''}`}
        >
          {items[idx].titulo}
        </span>
      </button>
    )
  }

  return (
    <section id="proyectos" className="section dark" aria-labelledby="t-proyectos">
      <Guides />
      <div className="wrap">
        <SectionHead etiqueta={projects.etiqueta} titulo={projects.titulo} id="t-proyectos">
          <p className="mt-[18px] mb-0 max-w-[52ch] text-base leading-[1.6] text-[#cfcfcf]">{projects.bajada}</p>
        </SectionHead>

        <div
          className="relative mt-16 grid grid-cols-[1fr_1.6fr_1fr] items-end gap-5 tablet:grid-cols-1"
          role="group"
          aria-roledescription="carrusel"
          aria-label="Tipos de proyecto"
        >
          {side(prev, 'Anterior', 'chamfer-bl')}

          <div className="chamfer-tr relative h-[520px] overflow-hidden bg-coal mobile:h-[500px]">
            {/* Los videos ya vistos quedan montados y hacen fundido; solo se reproduce el activo */}
            {videos.map((v, k) =>
              vistos.has(k) ? (
                <div
                  key={v.video}
                  className={`absolute inset-0 transition-opacity duration-700 ${k === active ? 'opacity-100' : 'opacity-0'}`}
                >
                  <MediaVideo src={v.video} poster={v.poster} position={v.encuadre} active={k === active} />
                </div>
              ) : null,
            )}
            <span
              className="absolute inset-0 bg-[linear-gradient(rgb(0_0_0/.35),rgb(0_0_0/.25)_28%,rgb(0_0_0/.7)_58%,rgb(0_0_0/.9))]"
              aria-hidden="true"
            />
            <span className="absolute top-6 left-7 bg-white px-3 py-2 font-mono text-xs text-ink mobile:left-5">
              {pad(i + 1)} / {pad(n)}
            </span>
            <motion.div
              key={i}
              aria-live="polite"
              className="absolute inset-x-7 bottom-7 mobile:inset-x-5 mobile:bottom-5"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <h3 className="display text-[clamp(34px,3.6cqi,52px)] text-white">{items[i].titulo}</h3>
              <p className="mt-3.5 mb-0 max-w-[46ch] text-base leading-[1.55] text-[#e5e5e5]">
                {items[i].descripcion}
              </p>
              <ul className="mt-4 mb-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Servicios incluidos">
                {items[i].servicios.map((s) => (
                  <li key={s} className="bg-white/14 px-2.5 py-[7px] font-mono text-[11px] text-white uppercase backdrop-blur-sm">
                    {s}
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          {side(next, 'Siguiente', 'chamfer-tr')}
        </div>

        <div className="mt-7 flex flex-wrap items-center justify-between gap-x-4 gap-y-6">
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
              aria-label="Tipo de proyecto anterior"
              onClick={() => go(prev)}
              className="grid h-14 w-14 place-items-center border-0 bg-white text-ink"
            >
              <ArrowLeft size={18} stroke={1.5} />
            </button>
            <button
              type="button"
              aria-label="Tipo de proyecto siguiente"
              onClick={() => go(next)}
              className="grid h-14 w-14 place-items-center border-0 bg-red text-white"
            >
              <ArrowRight size={18} stroke={1.5} />
            </button>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap items-center justify-between gap-5 border-t border-white/15 pt-8">
          <p className="display m-0 text-[30px] leading-none">Producciones de cualquier escala</p>
          <Button href={projects.cta.href} tone="red" arrow="ink" className="[&_.btn-arrow]:bg-white [&_.btn-arrow]:text-ink">
            {projects.cta.texto}
          </Button>
        </div>
      </div>
    </section>
  )
}
