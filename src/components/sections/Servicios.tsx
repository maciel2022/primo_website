import { services, type Service } from '../../content'
import { ArrowDiag } from '../ui/Icons'
import { Guides } from '../ui/Guides'
import { MediaVideo } from '../ui/MediaVideo'
import { Reveal } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

// El texto va arriba de la tarjeta, así que el velo también oscurece (o aclara) la parte superior
// para que se lea sobre cualquier video.
/** Traduce el campo `texto` del JSON al color de texto y al velo de la tarjeta. */
function tone(texto: string) {
  if (texto.startsWith('negro'))
    return { text: 'text-ink', shade: 'bg-[linear-gradient(rgb(255_255_255/.78),rgb(255_255_255/.4)_55%,rgb(255_255_255/.7))]' }
  if (texto.includes('velo negro fuerte'))
    return {
      text: 'text-white',
      shade: 'bg-[linear-gradient(rgb(0_0_0/.4),rgb(0_0_0/.5)_30%,rgb(0_0_0/.92)_72%)]',
    }
  return { text: 'text-white', shade: 'bg-[linear-gradient(rgb(0_0_0/.62),rgb(0_0_0/.28)_55%,rgb(0_0_0/.7))]' }
}

function Card({ s }: { s: Service }) {
  const t = tone(s.texto)
  return (
    <a
      href="#contacto"
      className={`group relative flex min-h-80 flex-col justify-between overflow-hidden bg-[#1a1a1a] p-7 no-underline mobile:min-h-[260px] tablet:last:odd:col-span-2 mobile:last:odd:col-span-1 ${t.text}`}
    >
      <span className="absolute inset-0 media-zoom" aria-hidden="true">
        {s.video && s.poster ? (
          <MediaVideo src={s.video} poster={s.poster} />
        ) : s.imagen ? (
          <img
            src={s.imagen}
            alt=""
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-cover object-[50%_25%]"
          />
        ) : null}
      </span>
      <span className={`absolute inset-0 ${t.shade}`} aria-hidden="true" />
      <div className="relative">
        <span className="font-mono text-[11px]">{s.num}</span>
        <h3 className="display mt-2.5 text-[clamp(30px,2.9cqi,42px)]">{s.titulo}</h3>
        <p className="mt-3.5 mb-0 max-w-[34ch] text-sm leading-[1.55] opacity-90">{s.descripcion}</p>
        <span className="sr-only"> — consultar</span>
      </div>
      <span className="relative grid h-11 w-11 place-items-center self-start border border-current transition-transform duration-400 group-hover:rotate-45">
        <ArrowDiag size={16} stroke={1.5} />
      </span>
    </a>
  )
}

export function Servicios() {
  return (
    <section id="servicios" className="section" aria-labelledby="t-servicios">
      <Guides />
      <div className="wrap">
        <SectionHead etiqueta={services.etiqueta} titulo={services.titulo} id="t-servicios" />
        {/* Los bordes de 1px salen del gap sobre el fondo gris */}
        <Reveal className="mt-14 grid grid-cols-3 gap-px border border-line-soft bg-line-soft tablet:grid-cols-2 mobile:grid-cols-1">
          {services.items.map((s) => (
            <Card key={s.num} s={s} />
          ))}
        </Reveal>
      </div>
    </section>
  )
}
