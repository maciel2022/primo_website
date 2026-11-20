import { useRef } from 'react'
import { useInViewVideo } from '../../hooks/useInViewVideo'

interface Props {
  src: string
  poster: string
  /** Descripción del contenido. Sin alt, el video es decorativo (aria-hidden). */
  alt?: string
  className?: string
}

/**
 * Video de fondo sin sonido y en loop. No descarga nada hasta entrar en pantalla
 * (preload="none" + IntersectionObserver); mientras tanto se ve el poster.
 * Ocupa todo el contenedor, que tiene que ser `relative` con altura definida.
 */
export function MediaVideo({ src, poster, alt, className = '' }: Props) {
  const ref = useRef<HTMLVideoElement>(null)
  useInViewVideo(ref)
  return (
    <video
      ref={ref}
      className={`absolute inset-0 h-full w-full object-cover ${className}`}
      src={src}
      poster={poster}
      muted
      loop
      playsInline
      preload="none"
      disablePictureInPicture
      {...(alt ? { 'aria-label': alt } : { 'aria-hidden': true })}
    />
  )
}
