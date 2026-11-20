import { AnimatePresence, motion } from 'motion/react'
import { useId, useState } from 'react'
import { EASE } from './Reveal'

interface Item {
  titulo: string
  texto: string
}

/** Acordeón numerado ("01/ …"). Un solo panel abierto a la vez. */
export function Accordion({ items, defaultOpen = 0 }: { items: Item[]; defaultOpen?: number }) {
  const [open, setOpen] = useState(defaultOpen)
  const id = useId()
  return (
    <div className="border-t border-line">
      {items.map((item, i) => {
        const on = open === i
        return (
          <div key={item.titulo} className="border-b border-line">
            <h3 className="m-0">
              <button
                type="button"
                id={`${id}-b${i}`}
                aria-expanded={on}
                aria-controls={`${id}-p${i}`}
                onClick={() => setOpen(on ? -1 : i)}
                className="group flex min-h-16 w-full items-center gap-5 py-[26px] text-left text-ink"
              >
                <span className="w-9 flex-none font-mono text-xs text-[#666]">
                  {String(i + 1).padStart(2, '0')}/
                </span>
                <span
                  className={`display flex-1 text-[clamp(26px,2.6cqi,38px)] leading-none transition-colors duration-300 group-hover:text-red ${on ? 'text-red' : ''}`}
                >
                  {item.titulo}
                </span>
                <span className="relative h-[22px] w-[22px] flex-none" aria-hidden="true">
                  <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-red" />
                  <span
                    className={`absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-red transition-transform duration-350 ${on ? '' : 'rotate-90'}`}
                  />
                </span>
              </button>
            </h3>
            <AnimatePresence initial={false}>
              {on && (
                <motion.div
                  id={`${id}-p${i}`}
                  role="region"
                  aria-labelledby={`${id}-b${i}`}
                  className="overflow-hidden"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.4, ease: EASE }}
                >
                  <p className="m-0 max-w-[60ch] pb-7 pl-14 text-base leading-[1.6] text-[#444] mobile:pl-0">
                    {item.texto}
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        )
      })}
    </div>
  )
}
