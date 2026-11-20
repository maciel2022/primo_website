import { MotionConfig } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'
import { Nosotros } from './components/sections/Nosotros'
import { Rental } from './components/sections/Rental'
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
      </main>
      <Footer />
    </MotionConfig>
  )
}
