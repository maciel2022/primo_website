import { useEffect } from 'react'

/** Datos con los que un botón del sitio deja precargado el formulario de contacto. */
export interface Consulta {
  /** Texto para "Descripción del proyecto" */
  mensaje: string
  /** true: marca "¿Qué necesitás?" con la opción de artistas */
  artistas?: boolean
}

const EVENTO = 'primo:consulta'

/** Precarga el formulario de contacto. Se usa en el onClick de un link a #contacto. */
export function pedirConsulta(consulta: Consulta) {
  window.dispatchEvent(new CustomEvent<Consulta>(EVENTO, { detail: consulta }))
}

/** El formulario escucha las consultas que piden otros componentes. */
export function useConsulta(onConsulta: (consulta: Consulta) => void) {
  useEffect(() => {
    const handler = (e: Event) => onConsulta((e as CustomEvent<Consulta>).detail)
    window.addEventListener(EVENTO, handler)
    return () => window.removeEventListener(EVENTO, handler)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}
