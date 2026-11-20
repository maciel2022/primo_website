import { useState } from 'react'
import { projects, type Project } from '../../content'
import { Button } from '../ui/Button'
import { Guides } from '../ui/Guides'
import { Play } from '../ui/Icons'
import { Label } from '../ui/Label'
import { MediaPlaceholder, type Scene } from '../ui/MediaPlaceholder'
import { Modal } from '../ui/Modal'
import { SectionHead } from '../ui/SectionHead'

// Posición de cada tarjeta en el collage de desktop (se repite si hay más de 6)
const POS = [
  { left: '2%', top: '30px', width: '300px', height: '230px', rotate: '-4deg' },
  { left: '34%', top: '0px', width: '260px', height: '200px', rotate: '3deg' },
  { left: '68%', top: '40px', width: '320px', height: '240px', rotate: '-2deg' },
  { left: '6%', top: '470px', width: '340px', height: '260px', rotate: '3deg' },
  { left: '40%', top: '560px', width: '280px', height: '220px', rotate: '-3deg' },
  { left: '70%', top: '470px', width: '300px', height: '260px', rotate: '4deg' },
]
// Escenas de reemplazo mientras los proyectos no tengan `portada`
const SCENES: Scene[] = ['sunset', 'venue', 'dj', 'gala', 'launch', 'arch']
const GALERIA: Scene[] = ['led', 'venue', 'sunset']

const meta = (p: Project) => [p.tipo, p.ubicacion, p.anio].join(' · ')

function Cover({ p, index, caption }: { p: Project; index: number; caption?: string }) {
  if (p.portada)
    return (
      <img
        src={p.portada}
        alt=""
        loading="lazy"
        decoding="async"
        className="media-zoom absolute inset-0 h-full w-full object-cover"
      />
    )
  return <MediaPlaceholder scene={SCENES[index % SCENES.length]} caption={caption} className="absolute! inset-0" />
}

function Detail({ p, index, onClose, onNext }: { p: Project; index: number; onClose: () => void; onNext: () => void }) {
  // Galería de 3: fotos reales si existen; si no, escenas de reemplazo. La tercera es el video.
  const slots = [0, 1, 2]
  return (
    <>
      <div className="relative h-[400px] mobile:h-[280px]">
        <Cover p={p} index={index} caption="Foto principal del proyecto" />
      </div>
      <div className="p-[clamp(24px,4cqi,48px)]">
        {p.demo && <Label className="mb-3.5!">[Proyecto demostrativo]</Label>}
        <h3 className="display text-[clamp(42px,5.4cqi,76px)]" id="t-proyecto">
          {p.nombre}
        </h3>
        <dl className="my-6 grid grid-cols-3 border-y border-line-soft mobile:grid-cols-1">
          {[
            ['Tipo de producción', p.tipo],
            ['Ubicación', p.ubicacion],
            ['Año', p.anio],
          ].map(([dt, dd], i) => (
            <div
              key={dt}
              className={`py-3.5 pr-4 ${i > 0 ? 'border-l border-line-soft pl-4 mobile:border-t mobile:border-l-0 mobile:pl-0' : ''}`}
            >
              <dt className="font-mono text-[10px] text-[#666] uppercase">{dt}</dt>
              <dd className="mt-1.5 ml-0 text-base font-medium">{dd}</dd>
            </div>
          ))}
        </dl>
        <p className="mt-0 mb-5 max-w-[62ch] text-[17px] leading-[1.6] text-[#333]">{p.descripcion}</p>
        <ul className="m-0 flex list-none flex-wrap gap-1.5 p-0" aria-label="Servicios">
          {p.servicios.map((s) => (
            <li key={s} className="bg-mist px-2.5 py-[7px] font-mono text-[11px] uppercase">
              {s}
            </li>
          ))}
        </ul>
        <div className="mt-5 grid grid-cols-3 gap-2.5 mobile:grid-cols-1">
          {slots.map((s) => {
            const esVideo = s === 2
            const foto = p.galeria[s]
            if (esVideo && p.video)
              return (
                <a
                  key={s}
                  href={p.video}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`Ver el video de ${p.nombre}`}
                  className="chamfer-2 relative block h-[180px] overflow-hidden bg-[#1a1a1a]"
                >
                  {foto && <img src={foto} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />}
                  <span className="absolute inset-0 grid place-items-center">
                    <span className="grid h-14 w-14 place-items-center bg-red text-white">
                      <Play />
                    </span>
                  </span>
                </a>
              )
            if (foto)
              return (
                <div key={s} className="chamfer-2 relative h-[180px] overflow-hidden">
                  <img src={foto} alt="" loading="lazy" decoding="async" className="absolute inset-0 h-full w-full object-cover" />
                </div>
              )
            // Sin material todavía: el play es solo un rótulo, no un control
            return (
              <MediaPlaceholder
                key={s}
                scene={GALERIA[s]}
                caption={esVideo ? 'Video' : `Foto 0${s + 1}`}
                className="chamfer-2 h-[180px]"
              >
                {esVideo && (
                  <span className="absolute inset-0 z-4 grid place-items-center" aria-hidden="true">
                    <span className="grid h-14 w-14 place-items-center bg-red text-white">
                      <Play />
                    </span>
                  </span>
                )}
              </MediaPlaceholder>
            )
          })}
        </div>
        <div className="mt-8 flex flex-wrap gap-2">
          <Button href="#contacto" tone="red" onClick={onClose}>
            Quiero algo así
          </Button>
          <Button tone="ink" icon="right" onClick={onNext}>
            Siguiente proyecto
          </Button>
        </div>
      </div>
    </>
  )
}

export function Proyectos() {
  const items = projects.items
  const [open, setOpen] = useState(-1)
  const hayDemos = items.some((p) => p.demo)

  return (
    <section id="proyectos" className="section bg-mist" aria-labelledby="t-proyectos">
      <Guides />
      <div className="wrap">
        <SectionHead etiqueta={projects.etiqueta} titulo={projects.titulo} id="t-proyectos" />

        <div className="relative mt-10 h-[820px] tablet:grid tablet:h-auto tablet:grid-cols-2 tablet:gap-3 mobile:grid-cols-1">
          <div className="pointer-events-none absolute top-1/2 left-1/2 z-6 w-[min(560px,80%)] -translate-1/2 text-center tablet:static tablet:col-span-full tablet:mb-3 tablet:w-auto tablet:translate-none tablet:text-left">
            <p className="display text-[30px] leading-none">Producciones de cualquier escala</p>
            <p className="mt-2.5 mb-0 font-mono text-[11px] text-[#555] uppercase">
              Tocá un proyecto para ver el detalle{hayDemos && ' · Ejemplos demostrativos'}
            </p>
          </div>
          {items.map((p, i) => {
            const pos = POS[i % POS.length]
            return (
              <button
                key={p.nombre}
                type="button"
                onClick={() => setOpen(i)}
                aria-label={`Ver proyecto: ${p.nombre}`}
                aria-haspopup="dialog"
                className="tile group"
                style={
                  {
                    '--x': pos.left,
                    '--y': pos.top,
                    '--w': pos.width,
                    '--h': pos.height,
                    '--r': pos.rotate,
                  } as React.CSSProperties
                }
              >
                <Cover p={p} index={i} />
                {p.demo && (
                  <span className="absolute top-2.5 left-2.5 z-4 bg-white px-2 py-[5px] font-mono text-[10px] text-ink uppercase">
                    Demo
                  </span>
                )}
                <span className="absolute inset-x-0 bottom-0 z-4 bg-[linear-gradient(transparent,rgb(0_0_0/.75))] px-4 py-3.5 text-left text-white">
                  <b className="display block text-2xl leading-none">{p.nombre}</b>
                  <small className="mt-1.5 block font-mono text-[10px] uppercase opacity-90">{meta(p)}</small>
                </span>
              </button>
            )
          })}
        </div>
      </div>

      <Modal open={open >= 0} onClose={() => setOpen(-1)} labelledBy="t-proyecto">
        {open >= 0 && (
          <Detail
            key={open}
            p={items[open]}
            index={open}
            onClose={() => setOpen(-1)}
            onNext={() => setOpen((open + 1) % items.length)}
          />
        )}
      </Modal>
    </section>
  )
}
