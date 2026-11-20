import { MotionConfig } from 'motion/react'
import { Footer } from './components/layout/Footer'
import { Navbar } from './components/layout/Navbar'
import { Hero } from './components/sections/Hero'

export default function App() {
  return (
    // reducedMotion="user": con prefers-reduced-motion, Motion no anima transformaciones
    <MotionConfig reducedMotion="user">
      <Navbar />
      <main>
        <Hero />
      </main>
      <Footer />
    </MotionConfig>
  )
}
