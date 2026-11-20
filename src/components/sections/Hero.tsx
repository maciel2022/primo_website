import { motion } from 'motion/react'
import { useEffect, useRef } from 'react'
import { site } from '../../content'
import { usePrefersReducedMotion } from '../../hooks/usePrefersReducedMotion'
import { Button } from '../ui/Button'
import { EASE } from '../ui/Reveal'

const up = (delay: number) => ({
  initial: { opacity: 0, y: 32 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 1, ease: EASE, delay },
})

export function Hero() {
  const { hero } = site
  const reduced = usePrefersReducedMotion()
  const video = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const v = video.current
    if (!v) return
    if (reduced) {
      v.pause()
      return
    }
    v.muted = true // Safari: muted por JS antes de play()
    v.play().catch(() => {})
  }, [reduced])

  return (
    <section
      id="inicio"
      aria-label="Portada"
      className="relative h-[860px] overflow-hidden bg-ink text-white mobile:h-[760px]"
    >
      <div className="absolute inset-0 bg-[#050505]">
        <motion.video
          ref={video}
          className="absolute inset-0 h-full w-full object-cover"
          src={hero.video}
          poster={hero.poster}
          autoPlay={!reduced}
          muted
          loop
          playsInline
          preload="auto"
          disablePictureInPicture
          aria-hidden="true"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 2.6, ease: EASE }}
        />
        <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgb(11_11_11/.45),rgb(11_11_11/.1)_40%,rgb(11_11_11/.35))]" />
      </div>

      {/* Solo mientras el video no sea material propio */}
      <span className="mono absolute top-24 right-6 z-6 mobile:top-[84px] mobile:right-5 border border-white/20 bg-black/55 px-3 py-[7px] text-[10px] tracking-[.16em] text-[#f5f5f5]">
        Video de muestra
      </span>

      <div className="absolute inset-x-0 top-[150px] z-4 mobile:top-[132px]">
        <div className="wrap cols items-start mobile:block">
          <motion.p
            {...up(0.3)}
            className="col-span-3 m-0 font-mono text-xs leading-normal whitespace-pre-line uppercase tablet:col-span-5"
          >
            {hero.etiqueta}
          </motion.p>
          <motion.div
            {...up(0.45)}
            className="col-span-4 col-start-9 tablet:col-span-6 tablet:col-start-7 mobile:mt-6"
          >
            <p className="m-0 text-base leading-normal">{hero.bajada}</p>
            <div className="mt-6 flex flex-wrap gap-2">
              <Button href={hero.ctaPrimario.href} tone="white">
                {hero.ctaPrimario.texto}
              </Button>
              <Button href={hero.ctaSecundario.href} tone="ink">
                {hero.ctaSecundario.texto}
              </Button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Línea de registro con 4 puntos */}
      <div className="absolute inset-x-0 top-[470px] z-4 mobile:top-[440px]" aria-hidden="true">
        <div className="h-px bg-white/35" />
        {['left-[3%]', 'left-[36%]', 'left-[64%]', 'right-[3%]'].map((pos) => (
          <span key={pos} className={`absolute -top-1 h-[9px] w-[9px] rounded-full bg-white ${pos}`} />
        ))}
      </div>

      <motion.h1
        aria-label={site.marca}
        className="display absolute inset-x-0 bottom-[-0.06em] z-5 flex items-start justify-center text-[clamp(120px,27.5cqi,420px)] leading-[.8] whitespace-nowrap text-white"
        initial={{ y: '30%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 1.3, ease: EASE }}
      >
        {site.marca}
        <sup
          aria-hidden="true"
          className="mt-[.05em] ml-[.06em] grid h-[1.1em] w-[1.1em] place-items-center rounded-full border-[.06em] border-white font-sans text-[.16em] leading-none font-medium tracking-normal"
        >
          ©
        </sup>
      </motion.h1>
    </section>
  )
}
