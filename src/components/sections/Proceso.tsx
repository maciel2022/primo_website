import { site } from '../../content'
import { Accordion } from '../ui/Accordion'
import { Guides } from '../ui/Guides'
import { Label } from '../ui/Label'
import { MediaPlaceholder } from '../ui/MediaPlaceholder'
import { Reveal } from '../ui/Reveal'

export function Proceso() {
  const { proceso } = site
  return (
    <section id="proceso" className="section" aria-labelledby="t-proceso">
      <Guides />
      <div className="wrap cols items-start tablet:block">
        <Reveal className="col-span-3">
          <Label>[PR/ Nuestro proceso]</Label>
          <MediaPlaceholder
            scene="dj"
            caption="Foto · Montaje técnico"
            alt="Montaje técnico (foto de referencia)"
            className="chamfer-bl mt-10 h-[300px] tablet:max-w-[340px] [&_.scene-caption]:right-3.5 [&_.scene-caption]:left-auto"
          />
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
