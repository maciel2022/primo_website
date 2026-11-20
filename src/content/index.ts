// Punto único de acceso al contenido. Los textos viven en los JSON de esta carpeta:
// para editar el sitio alcanza con tocar los JSON, sin cambiar componentes.
import eventsJson from './events.json'
import projectsJson from './projects.json'
import rentalJson from './rental.json'
import rosterJson from './roster.json'
import servicesJson from './services.json'
import siteJson from './site.json'

export interface Link {
  texto: string
  href: string
}

export interface Media {
  video: string
  poster: string
  alt: string
}

export interface Service {
  num: string
  titulo: string
  descripcion: string
  /** Texto libre del diseño: "blanco", "negro … velo blanco", "… velo negro fuerte" */
  texto: string
  video?: string
  poster?: string
  imagen?: string
}

export interface Artist {
  nombre: string
  categoria: string
  estilos: string[]
  foto: string | null
  fotoPosicion?: string
  demo: boolean
}

export interface Project {
  nombre: string
  tipo: string
  ubicacion: string
  anio: string
  descripcion: string
  servicios: string[]
  portada: string | null
  galeria: string[]
  video: string | null
  demo: boolean
}

export interface EventType {
  titulo: string
  media: string | null
}

export const site = siteJson
export const rental = rentalJson as typeof rentalJson & { media: Media; ctas: Link[] }
export const services = servicesJson as Omit<typeof servicesJson, 'items'> & { items: Service[] }
export const roster = rosterJson as Omit<typeof rosterJson, 'artistas'> & { artistas: Artist[] }
export const projects = projectsJson as Omit<typeof projectsJson, 'items'> & { items: Project[] }
export const events = eventsJson as Omit<typeof eventsJson, 'items'> & { items: EventType[] }

/** Resuelve los href del contenido: "whatsapp" apunta al WhatsApp de contacto. */
export function resolveHref(href: string): string {
  return href === 'whatsapp' ? site.contacto.whatsapp : href
}

export const isExternal = (href: string) => /^https?:/.test(href)
