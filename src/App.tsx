import { MotionConfig } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { Nosotros } from './components/sections/Nosotros'
import { Rental } from './components/sections/Rental'
import { TiposEventos } from './components/sections/TiposEventos'
import { Artistas } from './components/sections/Artistas'
import { Proyectos } from './components/sections/Proyectos'
import { Proceso } from './components/sections/Proceso'
import { Pilares } from './components/sections/Pilares'
import { Contacto } from './components/sections/Contacto'
import { Servicios } from './components/sections/Servicios'

export default function App() {
  return (
    // reducedMotion="user": con prefers-reduced-motion, Motion no anima transformaciones
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
        <Nosotros />
        <Rental />
        <Servicios />
        <TiposEventos />
        <Artistas />
        <Proyectos />
        <Proceso />
        <Pilares />
        <Contacto />
      </main>
      <Footer />
    </MotionConfig>
  )
}
