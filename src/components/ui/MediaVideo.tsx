import { useRef } from 'react'
import { useInViewVideo } from '../../hooks/useInViewVideo'

interface Props {
  src: string
  poster: string
  /** Descripción del contenido. Sin alt, el video es decorativo (aria-hidden). */
  alt?: string
  className?: string
  /** object-position del recorte, ej. "50% 28%" */
  position?: string
  /** false: el video queda en pausa aunque esté en pantalla */
  active?: boolean
}

/**
 * Video de fondo sin sonido y en loop. No descarga nada hasta entrar en pantalla
 * (preload="none" + IntersectionObserver); mientras tanto se ve el poster,
 * que también se carga recién cuando el video está cerca del viewport.
 * Ocupa todo el contenedor, que tiene que ser `relative` con altura definida.
 */
export function MediaVideo({ src, poster, alt, className = '', position, active = true }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  const near = useInViewVideo(ref, active)
  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      style={position ? { objectPosition: position } : undefined}
      src={src}
      poster={near ? poster : undefined}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      {...(alt ? { 'aria-label': alt } : { 'aria-hidden': true })}
    />
  )
}
