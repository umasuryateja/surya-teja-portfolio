import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Skills from '@/components/Skills'
import Projects from '@/components/Projects'
import Experience from '@/components/Experience'
import Certifications from '@/components/Certifications'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import NeuralBackground from '@/components/NeuralBackground'
import ClientWrapper from '@/components/ClientWrapper'

/**
 * Main portfolio page — composes all 8 sections.
 * ClientWrapper handles the global resume modal (triggered by custom event).
 */
export default function HomePage() {
  return (
    <>
      {/* Fixed neural network canvas — z-index 0 */}
      <NeuralBackground />

      {/* Sticky navigation */}
      <Navbar />

      {/* Main content — z-index 10+ */}
      <main className="relative z-10">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Certifications />
        <Contact />
      </main>

      <Footer />

      {/* Global resume modal — listens for 'open-resume-modal' custom event */}
      <ClientWrapper />
    </>
  )
}
