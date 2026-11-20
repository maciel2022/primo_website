import { AnimatePresence, motion } from 'motion/react'
import { useRef } from 'react'
import { site } from '../../content'
import { useDialog } from '../../hooks/useDialog'
import { Button } from '../ui/Button'
import { Close } from '../ui/Icons'
import { Logo } from './Logo'

/** Menú a pantalla completa (≤1080px): rojo, con links numerados y WhatsApp abajo. */
export function MobileMenu({ open, onClose }: { open: boolean; onClose: () => void }) {
  const ref = useRef<HTMLDivElement>(null)
  useDialog(ref, open, onClose)
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          ref={ref}
          role="dialog"
          aria-modal="true"
          aria-label="Menú"
          className="fixed inset-0 z-70 flex flex-col overflow-y-auto bg-red px-5 py-[14px] text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <div className="flex items-center justify-between">
            <Logo />
            <button
              type="button"
              className="inline-flex h-12 w-12 items-center justify-center border border-current"
              aria-label="Cerrar menú"
              onClick={onClose}
            >
              <Close size={18} />
            </button>
          </div>
          <nav className="mt-9 flex flex-col" aria-label="Principal móvil">
            {site.nav.map((l, i) => (
              <a
                key={l.href}
                href={l.href}
                onClick={onClose}
                className="display flex items-baseline justify-between border-b border-white/30 py-[9px] text-[44px] leading-none text-white no-underline"
              >
                {l.texto}
                <span className="font-mono text-[11px] font-normal tracking-normal">
                  [{String(i + 1).padStart(2, '0')}]
                </span>
              </a>
            ))}
          </nav>
          <div className="mt-auto pt-8">
            <Button href={site.contacto.whatsapp} tone="white" block>
              Escribinos por WhatsApp
            </Button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
