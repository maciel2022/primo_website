import { readFileSync } from 'node:fs'
import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig, type Plugin } from 'vite'

/**
 * Inserta el JSON-LD LocalBusiness en index.html a partir de src/content/site.json.
 * Los datos que todavía son placeholders (entre corchetes) no se publican:
 * aparecen solos cuando se cargan los valores reales en el JSON.
 */
function jsonLd(): Plugin {
  return {
    name: 'primo-json-ld',
    transformIndexHtml() {
      const site = JSON.parse(readFileSync('src/content/site.json', 'utf8'))
      const real = (v?: string) => (v && !v.includes('[') ? v : undefined)
      const c = site.contacto
      const data = {
        '@context': 'https://schema.org',
        '@type': 'LocalBusiness',
        name: site.marca,
        description: site.claim,
        email: real(c.email),
        telephone: real(c.telefono),
        areaServed: real(c.zona),
        sameAs: [real(c.instagram?.url), real(c.whatsapp)].filter(Boolean),
      }
      return [
        {
          tag: 'script',
          attrs: { type: 'application/ld+json' },
          children: JSON.stringify(data),
          injectTo: 'head',
        },
      ]
    },
  }
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss(), jsonLd()],
})
