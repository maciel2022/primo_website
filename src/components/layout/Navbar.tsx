import { useMotionValueEvent, useScroll } from 'motion/react'
import { useState } from 'react'
import { site } from '../../content'
import { Menu } from '../ui/Icons'
import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

export function Navbar() {
  const [solid, setSolid] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { scrollY } = useScroll()

  // Transparente sobre el hero; blanca cuando el hero ya casi salió de pantalla
  useMotionValueEvent(scrollY, 'change', (y) => {
    const hero = document.getElementById('inicio')
    setSolid(y > (hero?.offsetHeight ?? 860) - 110)
  })

  const links = site.nav.filter((l) => l.href !== '#contacto')
  const contacto = site.nav.find((l) => l.href === '#contacto')

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 border-b transition-colors duration-300 ${
          solid ? 'border-ink/8 bg-white/96 text-ink backdrop-blur-sm' : 'border-transparent text-white'
        }`}
      >
        <div className="wrap flex h-[76px] items-center justify-between gap-4">
          <Logo href="#inicio" />
          <nav className="flex gap-[22px] tablet:hidden" aria-label="Principal">
            {links.map((l) => (
              <a key={l.href} href={l.href} className="nav-link">
                {l.texto}
              </a>
            ))}
          </nav>
          {contacto && (
            <a href={contacto.href} className="nav-link tablet:hidden">
              {contacto.texto} ↗
            </a>
          )}
          <button
            type="button"
            className="hidden h-12 w-12 items-center justify-center border border-current tablet:inline-flex"
            aria-label="Abrir menú"
            aria-expanded={menuOpen}
            aria-haspopup="dialog"
            onClick={() => setMenuOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </header>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </>
  )
}
