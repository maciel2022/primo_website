import { useEffect, type RefObject } from 'react'
import { usePrefersReducedMotion } from './usePrefersReducedMotion'

/**
 * Reproduce el video solo mientras está en pantalla y lo pausa al salir.
 * Con prefers-reduced-motion no reproduce nunca: queda el poster.
 */
export function useInViewVideo(ref: RefObject<HTMLVideoElement | null>) {
  const reduced = usePrefersReducedMotion()

  useEffect(() => {
    const video = ref.current
    if (!video) return
    if (reduced) {
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
  }, [ref, reduced])
}
