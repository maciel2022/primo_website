import { motion } from 'motion/react'
import type { CSSProperties, ReactNode } from 'react'

export const EASE = [0.2, 0.7, 0.1, 1] as const

/** Aparición del bloque al entrar en pantalla, una sola vez. */
export function Reveal({
  children,
  className,
  style,
  delay = 0,
}: {
  children: ReactNode
  className?: string
  style?: CSSProperties
  delay?: number
}) {
  return (
    <motion.div
      className={className}
      style={style}
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '0px 0px -8% 0px' }}
      transition={{ duration: 0.8, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  )
}
