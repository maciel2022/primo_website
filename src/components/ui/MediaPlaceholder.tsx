import type { ReactNode } from 'react'

export type Scene =
  | 'sunset'
  | 'sunset-djs'
  | 'venue'
  | 'dj'
  | 'gala'
  | 'led'
  | 'launch'
  | 'show'
  | 'room'
  | 'arch'

interface Props {
  scene: Scene
  /** Rótulo visible, ej. "Foto · Montaje técnico" */
  caption?: string
  /** Descripción accesible; sin ella el bloque es decorativo */
  alt?: string
  className?: string
  children?: ReactNode
}

/**
 * Reemplazo visual para una foto que todavía no existe: una escena abstracta en CSS.
 * Cuando llegue la foto real, se cambia por un <img> en el mismo lugar.
 */
export function MediaPlaceholder({ scene, caption, alt, className = '', children }: Props) {
  const sceneCls = scene === 'sunset-djs' ? 'scene-sunset scene-djs' : `scene-${scene}`
  return (
    <div
      className={`scene ${sceneCls} ${className}`}
      {...(alt ? { role: 'img', 'aria-label': alt } : { 'aria-hidden': !children || undefined })}
    >
      <span className="scene-bg media-zoom" />
      {caption && <span className="scene-caption">{caption}</span>}
      {children}
    </div>
  )
}
