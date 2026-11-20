import { AnimatePresence, motion } from 'motion/react'
import { useRef, type ReactNode } from 'react'
import { useDialog } from '../../hooks/useDialog'
import { Close } from './Icons'
import { EASE } from './Reveal'

interface Props {
  open: boolean
  onClose: () => void
  /** id del título dentro del contenido, para aria-labelledby */
  labelledBy: string
  children: ReactNode
}

/** Diálogo modal: cierra con Esc, con el fondo y con el botón ✕. */
export function Modal({ open, onClose, labelledBy, children }: Props) {
  const ref = useRef<HTMLDivElement>(null)
  useDialog(ref, open, onClose)
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          tabIndex={-1}
          role="dialog"
          aria-modal="true"
          aria-labelledby={labelledBy}
          className="fixed inset-0 z-80 flex items-center justify-center p-6 outline-none mobile:items-end mobile:p-0"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
        >
          <div className="absolute inset-0 bg-ink/80" onClick={onClose} aria-hidden="true" />
          <motion.div
            className="relative max-h-[calc(100%-24px)] w-full max-w-[1040px] overflow-auto overscroll-contain bg-white"
            initial={{ y: 60, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <button
              type="button"
              aria-label="Cerrar"
              onClick={onClose}
              className="absolute top-0 right-0 z-10 grid h-14 w-14 place-items-center bg-red text-white"
            >
              <Close />
            </button>
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
