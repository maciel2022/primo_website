import type { ReactNode } from 'react'

/** Etiqueta mono de sección, con el ícono rojo de la identidad: ▸ [PR/ …] */
export function Label({
  children,
  as: Tag = 'p',
  className = '',
}: {
  children: ReactNode
  as?: 'p' | 'span'
  className?: string
}) {
  return (
    <Tag className={`label ${className}`}>
      <i className="label-flag" aria-hidden="true" />
      {children}
    </Tag>
  )
}
