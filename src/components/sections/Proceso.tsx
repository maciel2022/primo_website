import { site } from '../../content'
import { Accordion } from '../ui/Accordion'
import { Guides } from '../ui/Guides'
import { Label } from '../ui/Label'
import { MediaVideo } from '../ui/MediaVideo'
import { Reveal } from '../ui/Reveal'

export function Proceso() {
  const { proceso } = site
  return (
    <section id="proceso" className="section" aria-labelledby="t-proceso">
      <Guides />
      <div className="wrap cols items-start tablet:block">
        <Reveal className="col-span-3">
          <Label>[PR/ Nuestro proceso]</Label>
          <div className="chamfer-bl relative mt-10 h-[300px] overflow-hidden bg-[#1a1a1a] tablet:max-w-[340px]">
            <MediaVideo
              src={proceso.media.video}
              poster={proceso.media.poster}
              alt={proceso.media.alt}
              position={proceso.media.encuadre}
            />
          </div>
        </Reveal>
        <div className="col-span-9 col-start-4 tablet:mt-10">
          <Reveal>
            <h2 className="display h-section" id="t-proceso">
              {proceso.titulo}
            </h2>
          </Reveal>
          <div className="mt-12">
            <Accordion items={proceso.pasos} />
          </div>
        </div>
      </div>
    </section>
  )
}
