import { rental, resolveHref } from '../../content'
import { Button } from '../ui/Button'
import { Guides } from '../ui/Guides'
import { Label } from '../ui/Label'
import { MediaVideo } from '../ui/MediaVideo'
import { Reveal } from '../ui/Reveal'
import { SectionHead } from '../ui/SectionHead'

export function Rental() {
  return (
    <section id="rental" className="section pt-0!" aria-labelledby="t-rental">
      <Guides />
      <div className="wrap">
        <SectionHead etiqueta={rental.etiqueta} titulo={rental.titulo} id="t-rental" />

        {/* 7/5: el video se estira para igualar la altura de la columna de texto */}
        <div className="cols mt-14 items-stretch tablet:block">
          <Reveal className="chamfer-tr relative col-span-7 min-h-[480px] overflow-hidden bg-[#1a1a1a] tablet:h-[460px] tablet:min-h-0 mobile:h-[380px]">
            <MediaVideo src={rental.media.video} poster={rental.media.poster} alt={rental.media.alt} />
            <span
              aria-hidden="true"
              className="absolute inset-0 bg-[linear-gradient(180deg,rgb(0_0_0/.25),transparent_35%,transparent_55%,rgb(0_0_0/.7))]"
            />
            <span className="absolute top-0 left-0 bg-red px-3.5 py-2.5 font-mono text-[11px] text-white uppercase">
              {rental.destacado}
            </span>
            <h3 className="display absolute bottom-6 left-7 mobile:left-5 text-[clamp(40px,4.6cqi,68px)] text-white">
              {rental.nombre}
            </h3>
          </Reveal>

          <Reveal className="col-span-5 flex flex-col justify-between gap-8 tablet:mt-8">
            <div>
              <p className="m-0 text-[clamp(17px,1.5cqi,20px)] leading-[1.45]">{rental.descripcion}</p>
              <dl className="mt-[22px] mb-0 border-t border-line">
                {rental.ficha.map((f) => (
                  <div
                    key={f.dato}
                    className="grid grid-cols-[130px_1fr] gap-4 border-b border-line py-[11px] text-sm leading-[1.4] mobile:grid-cols-1 mobile:gap-1"
                  >
                    <dt className="pt-[3px] font-mono text-[11px] text-[#666] uppercase">{f.dato}</dt>
                    <dd className="m-0">{f.valor}</dd>
                  </div>
                ))}
              </dl>
              <p className="mt-3.5 mb-0 text-[13px] leading-[1.55] text-[#555]">{rental.nota}</p>
            </div>
            <div className="flex flex-wrap gap-2">
              {rental.ctas.map((c, i) => (
                <Button key={c.texto} href={resolveHref(c.href)} tone={i === 0 ? 'red' : 'ink'}>
                  {c.texto}
                </Button>
              ))}
            </div>
          </Reveal>
        </div>

        <Reveal className="mt-10 flex flex-wrap items-center gap-2">
          <Label as="span" className="m-0! mr-3! mobile:w-full">
            Otros productos de rental →
          </Label>
          {rental.otros.map((o) => (
            <a
              key={o}
              href="#contacto"
              className="inline-flex min-h-11 items-center bg-mist px-[18px] font-mono text-xs text-ink uppercase no-underline transition-colors duration-300 hover:bg-ink hover:text-white"
            >
              {o}
            </a>
          ))}
        </Reveal>
      </div>
    </section>
  )
}
