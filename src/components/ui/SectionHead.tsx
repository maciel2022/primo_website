import type { ReactNode } from 'react'
import { Label } from './Label'
import { Reveal } from './Reveal'

/** Encabezado de sección: etiqueta a la izquierda (3 col) y título a la derecha (9 col). */
export function SectionHead({
  etiqueta,
  titulo,
  id,
  children,
}: {
  etiqueta: string
  titulo: string
  id: string
  children?: ReactNode
}) {
  return (
    <Reveal className="cols items-end tablet:block">
      <Label className="col-span-3">{etiqueta}</Label>
      <div className="col-span-9 col-start-4">
        <h2 className="display h-section" id={id}>
          {/* Cada oración del título va en su propia línea */}
          {titulo.split(/(?<=\.)\s+/).map((linea) => (
            <span key={linea} className="block">
              {linea}
            </span>
          ))}
        </h2>
        {children}
      </div>
    </Reveal>
  )
}
