import { useEffect, useState, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Reproduce el video solo mientras está en pantalla y lo pausa al salir.
 * Con prefers-reduced-motion, o con `active` en false, no reproduce: queda el poster o el último cuadro.
 * Devuelve `near`: true cuando el video está cerca del viewport, para cargar
 * recién ahí el poster (así los posters de abajo no compiten con el hero).
 */
export function useInViewVideo(ref: RefObject<HTMLVideoElement | null>, active = true): boolean {
  const reduced = usePrefersReducedMotion()
  const [near, setNear] = useState(false)

  useEffect(() => {
    const video = ref.current
    if (!video) return
    const nearIo = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setNear(true)
          nearIo.disconnect()
        }
      },
      { rootMargin: '900px 0px' },
    )
    nearIo.observe(video)
    return () => nearIo.disconnect()
  }, [ref])

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (reduced || !active) {
      video.pause()
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Safari exige muted seteado por JS antes de play()
          video.muted = true
          video.play().catch(() => {})
        } else {
          video.pause()
        }
      },
      { rootMargin: '200px 0px' },
    )
    io.observe(video)
    return () => io.disconnect()
  }, [ref, reduced, active])

  return near
}
