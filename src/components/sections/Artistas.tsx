import { roster, type Artist } from '../../content'
import { pedirConsulta } from '../../lib/consulta'
import { Button } from '../ui/Button'
import { Guides } from '../ui/Guides'
import { Label } from '../ui/Label'
import { Reveal } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

const consultaDeEstilo = (estilo: string) => () =>
  pedirConsulta({ artistas: true, mensaje: `Busco un DJ de ${estilo.toLowerCase()}.` })

function Destacado({ a, index }: { a: Artist; index: number }) {
  return (
    <Reveal
      delay={index * 0.08}
      className="grid grid-cols-[minmax(0,5fr)_minmax(0,6fr)] gap-6 mobile:grid-cols-1 mobile:gap-5"
    >
      <div
        className={`group relative h-[440px] overflow-hidden bg-[#1a1a1a] mobile:h-[400px] ${index % 2 === 0 ? 'chamfer-tr' : 'chamfer-bl'}`}
      >
        <img
          src={a.foto}
          alt={`${a.nombre}, ${a.categoria}`}
          loading="lazy"
          decoding="async"
          className="media-zoom absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: a.fotoPosicion }}
        />
        <span className="absolute top-0 left-0 bg-red px-3.5 py-2.5 font-mono text-[11px] text-white uppercase">
          {roster.destacado}
        </span>
      </div>
      <div className="flex flex-col justify-between gap-8 border-t border-ink pt-5">
        <div>
          <p className="m-0 font-mono text-[11px] text-[#666] uppercase">
            [{String(index + 1).padStart(2, '0')}] {a.categoria}
          </p>
          <h3 className="display mt-3 text-[clamp(40px,3.8cqi,56px)]">{a.nombre}</h3>
          <ul className="mt-5 mb-0 flex list-none flex-wrap gap-1.5 p-0" aria-label={`Estilos de ${a.nombre}`}>
            {a.estilos.map((e) => (
              <li key={e} className="bg-mist px-2.5 py-[7px] font-mono text-[11px] uppercase">
                {e}
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-col items-start gap-2">
          {a.presskit ? (
            <Button href={a.presskit} download tone="red" icon="down">
              Presskit
            </Button>
          ) : (
            // Sin PDF cargado todavía: mismo botón, pero el presskit se pide por el formulario
            <Button
              href="#contacto"
              tone="red"
              onClick={() => pedirConsulta({ artistas: true, mensaje: `Quiero recibir el presskit de ${a.nombre}.` })}
            >
              Presskit
            </Button>
          )}
          <Button
            href="#contacto"
            tone="ink"
            onClick={() => pedirConsulta({ artistas: true, mensaje: `Quiero consultar por ${a.nombre}.` })}
          >
            Consultar fecha
          </Button>
        </div>
      </div>
    </Reveal>
  )
}

export function Artistas() {
  const { estilos } = roster
  return (
    <section id="artistas" className="section" aria-labelledby="t-artistas">
      <Guides />
      <div className="wrap">
        <SectionHead etiqueta={roster.etiqueta} titulo={roster.titulo} id="t-artistas">
          <p className="mt-[18px] mb-0 max-w-[52ch] text-base leading-[1.6] text-[#333]">{roster.bajada}</p>
        </SectionHead>

        <div className="mt-14 grid grid-cols-2 gap-x-10 gap-y-14 tablet:grid-cols-1">
          {roster.artistas.map((a, i) => (
            <Destacado key={a.nombre} a={a} index={i} />
          ))}
        </div>

        {/* El resto del roster no se publica: se consulta por estilo o se pide el listado */}
        <Reveal className="cols mt-20 items-start bg-mist p-[clamp(24px,3.4cqi,48px)] tablet:block">
          <div className="col-span-5">
            <Label>{estilos.etiqueta}</Label>
            <h3 className="display text-[clamp(34px,3.6cqi,52px)]">{estilos.titulo}</h3>
          </div>
          <div className="col-span-7 tablet:mt-6">
            <p className="m-0 max-w-[56ch] text-[17px] leading-[1.6] text-[#333]">{estilos.texto}</p>
            <ul className="mt-6 mb-0 flex list-none flex-wrap gap-2 p-0" aria-label="Consultar DJ por estilo">
              {estilos.items.map((e) => (
                <li key={e}>
                  <a href="#contacto" onClick={consultaDeEstilo(e)} className="chip">
                    {e}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#contacto"
                  onClick={() => pedirConsulta({ artistas: true, mensaje: 'Busco un DJ de otro estilo: ' })}
                  className="chip chip-outline"
                >
                  {estilos.otro} →
                </a>
              </li>
            </ul>
            <Button
              href={estilos.cta.href}
              tone="ink"
              className="mt-8"
              onClick={() =>
                pedirConsulta({ artistas: true, mensaje: 'Quiero recibir el listado completo de artistas.' })
              }
            >
              {estilos.cta.texto}
            </Button>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
