import { site } from '../../content'
import { Reveal } from '../ui/Reveal'

export function Pilares() {
  const { pilares } = site
  // Dos copias iguales: la animación corre -50% y vuelve a empezar sin salto
  const tira = (
    <span className="display py-7 text-[clamp(72px,9cqi,140px)] leading-none whitespace-nowrap">
      {pilares.items.map((p) => (
        <span key={p.titulo}>
          {p.titulo}
          <i className="mx-[.45em] inline-block h-[.5em] w-[.5em] bg-white align-middle [clip-path:polygon(50%_0,100%_50%,50%_100%,0_50%)]" />
        </span>
      ))}
    </span>
  )
  return (
    <section className="overflow-hidden bg-red text-white" aria-labelledby="t-pilares">
      <div className="flex w-max animate-[marquee_26s_linear_infinite]" aria-hidden="true">
        {tira}
        {tira}
      </div>
      <div className="wrap pb-[72px]">
        <h2 className="display mt-6 mb-10 text-[clamp(40px,5cqi,72px)]" id="t-pilares">
          {pilares.titulo}
        </h2>
        <div className="grid grid-cols-4 border-t border-white/35 tablet:grid-cols-2 mobile:grid-cols-1">
          {pilares.items.map((p, i) => (
            <Reveal
              key={p.titulo}
              delay={i * 0.06}
              className={`pt-8 pr-7 pb-12 mobile:border-b mobile:border-white/35 mobile:px-0 mobile:pt-6 mobile:pb-7 ${
                i > 0 ? 'border-l border-white/35 pl-7 mobile:border-l-0' : ''
              } ${i === 2 ? 'tablet:border-l-0 tablet:pl-0' : ''} ${i >= 2 ? 'tablet:border-t tablet:border-white/35' : ''}`}
            >
              <span className="font-mono text-[11px]">[{String(i + 1).padStart(2, '0')}]</span>
              <h3 className="display mt-3.5 mb-3 text-[34px]">{p.titulo}</h3>
              <p className="m-0 text-[15px] leading-[1.55]">{p.texto}</p>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
