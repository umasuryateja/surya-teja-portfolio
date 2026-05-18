'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X, Zap } from 'lucide-react'

const NAV_LINKS = [
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'Certifications', href: '#certifications' },
  { label: 'Contact', href: '#contact' },
]

/**
 * Fires a custom DOM event that Hero.tsx listens to,
 * so the Resume modal can be opened from anywhere (Navbar, mobile menu, etc.)
 * without prop-drilling or global state libraries.
 */
function openResumeModal() {
  window.dispatchEvent(new CustomEvent('open-resume-modal'))
}

/**
 * Sticky top navigation bar.
 * Becomes frosted glass on scroll. Mobile hamburger menu with AnimatePresence.
 * "Resume" button dispatches open-resume-modal event → opens ResumeModal in Hero.
 */
export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [activeSection, setActiveSection] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)

      // Detect active section
      const sections = NAV_LINKS.map((l) => l.href.replace('#', ''))
      for (const sec of sections.reverse()) {
        const el = document.getElementById(sec)
        if (el && window.scrollY >= el.offsetTop - 120) {
          setActiveSection(sec)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const handleNavClick = (href: string) => {
    setMenuOpen(false)
    const el = document.querySelector(href)
    el?.scrollIntoView({ behavior: 'smooth' })
  }

  const handleResumeClick = () => {
    setMenuOpen(false)
    openResumeModal()
  }

  return (
    <>
      <motion.header
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? 'bg-[rgba(5,8,16,0.85)] backdrop-blur-xl border-b border-[rgba(34,211,238,0.1)]'
            : 'bg-transparent'
        }`}
      >
        <div className="section-container">
          <nav className="flex items-center justify-between h-16" aria-label="Main navigation">
            {/* Logo */}
            <a
              href="#"
              className="flex items-center gap-2 group focus-visible:outline-none"
              aria-label="Uma Surya Teja — Home"
            >
              <span className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/30 flex items-center justify-center group-hover:bg-accent/20 transition-colors">
                <Zap size={16} className="text-accent" />
              </span>
              <span className="font-bold text-sm tracking-wide text-text-primary hidden sm:block">
                UST<span className="text-accent">.</span>
              </span>
            </a>

            {/* Desktop links */}
            <ul className="hidden md:flex items-center gap-1" role="list">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className={`px-4 py-2 rounded-lg text-sm font-medium transition-all duration-200 relative focus-visible:outline-accent ${
                      activeSection === link.href.replace('#', '')
                        ? 'text-accent'
                        : 'text-text-muted hover:text-text-primary'
                    }`}
                    aria-current={
                      activeSection === link.href.replace('#', '') ? 'page' : undefined
                    }
                  >
                    {link.label}
                    {activeSection === link.href.replace('#', '') && (
                      <motion.span
                        layoutId="nav-indicator"
                        className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-accent"
                      />
                    )}
                  </button>
                </li>
              ))}
            </ul>

            {/* Resume CTA — opens modal */}
            <div className="hidden md:flex items-center gap-3">
              <button
                onClick={handleResumeClick}
                className="px-4 py-2 text-sm font-semibold rounded-lg border border-accent/40 text-accent hover:bg-accent/10 hover:border-accent/70 transition-all duration-200 focus-visible:outline-accent"
                aria-label="View resume"
                aria-haspopup="dialog"
              >
                Resume ↗
              </button>
            </div>

            {/* Mobile hamburger */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg border border-[rgba(34,211,238,0.15)] text-text-muted hover:text-accent transition-colors focus-visible:outline-accent"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            >
              {menuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </nav>
        </div>
      </motion.header>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: 'easeInOut' }}
            className="fixed inset-y-0 right-0 w-72 z-40 bg-[rgba(10,15,30,0.97)] backdrop-blur-2xl border-l border-[rgba(34,211,238,0.12)] flex flex-col pt-20 pb-8 px-6"
          >
            <ul className="flex flex-col gap-2" role="list">
              {NAV_LINKS.map((link, i) => (
                <motion.li
                  key={link.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.07 }}
                >
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full text-left px-4 py-3 rounded-lg text-base font-medium text-text-muted hover:text-accent hover:bg-accent/5 transition-all duration-200 border border-transparent hover:border-accent/20"
                  >
                    {link.label}
                  </button>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto">
              <button
                onClick={handleResumeClick}
                className="flex items-center justify-center w-full py-3 rounded-lg border border-accent/40 text-accent font-semibold hover:bg-accent/10 transition-all focus-visible:outline-accent"
                aria-label="View and download resume"
              >
                View Resume ↗
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Backdrop for mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-30 bg-black/50 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>
    </>
  )
}
