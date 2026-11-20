import { motion, useScroll, useTransform } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { site, type Media } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Button } from '../ui/Button'
import { Guides } from '../ui/Guides'
import { Label } from '../ui/Label'
import { MediaVideo } from '../ui/MediaVideo'
import { Reveal } from '../ui/Reveal'

/** Video con esquina cortada y parallax suave (±5%) mientras cruza la pantalla. */
function ParallaxMedia({ media, className }: { media: Media; className: string }) {
  const ref = useRef<HTMLDivElement>(null)
  const reduced = usePrefersReducedMotion()
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['-5%', '5%'])
  return (
    <div ref={ref} className={`relative overflow-hidden bg-[#1a1a1a] ${className}`}>
      <motion.div className="absolute inset-0" style={reduced ? undefined : { y, scale: 1.12 }}>
        <MediaVideo src={media.video} poster={media.poster} alt={media.alt} />
      </motion.div>
    </div>
  )
}

/** Resalta en rojo la palabra destacada dentro de una frase. */
function highlight(text: string, word: string): ReactNode {
  const i = text.indexOf(word)
  if (!word || i < 0) return text
  return (
    <>
      {text.slice(0, i)}
      <em className="text-red not-italic">{word}</em>
      {text.slice(i + word.length)}
    </>
  )
}

export function Nosotros() {
  const n = site.nosotros
  // El statement son dos frases: la barra roja va entre la primera y la segunda
  const cut = n.titulo.indexOf('. ') + 1
  const first = cut > 0 ? n.titulo.slice(0, cut) : n.titulo
  const second = cut > 0 ? n.titulo.slice(cut + 1) : ''

  const bar = useRef<HTMLSpanElement>(null)
  const { scrollYProgress } = useScroll({ target: bar, offset: ['start 90%', 'start 45%'] })

  return (
    <section id="nosotros" className="section" aria-labelledby="t-nosotros">
      <Guides />
      <div className="wrap cols items-start tablet:block">
        <Reveal className="col-span-3">
          <Label>{n.etiqueta}</Label>
          <ParallaxMedia media={n.mediaChica} className="chamfer-bl mt-10 h-[220px] tablet:max-w-[340px]" />
        </Reveal>
        <div className="col-span-9 col-start-4 tablet:mt-10">
          <Reveal>
            <h2 className="display text-[clamp(38px,4.6cqi,68px)]" id="t-nosotros">
              {first}{' '}
              {second && (
                <>
                  <motion.span
                    ref={bar}
                    aria-hidden="true"
                    className="mx-[.1em] inline-block h-[.7em] w-[1.4em] origin-left bg-red align-baseline"
                    style={{ scaleX: scrollYProgress }}
                  />{' '}
                  {highlight(second, n.palabraDestacada)}
                </>
              )}
            </h2>
          </Reveal>
          <div className="cols mt-12 items-start mobile:block">
            <Reveal className="col-span-6">
              <p className="m-0 text-[17px] leading-[1.6] text-[#333]">{n.texto}</p>
              <Button href={n.cta.href} tone="red" className="mt-8">
                {n.cta.texto}
              </Button>
            </Reveal>
            <Reveal className="col-span-6 mobile:mt-10">
              <ParallaxMedia media={n.mediaGrande} className="chamfer-tr h-[380px]" />
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  )
}
