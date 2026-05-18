'use client'

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, ChevronUp } from 'lucide-react'

const SOCIAL_LINKS = [
  { label: 'GitHub', href: 'https://github.com/umasuryateja', icon: Github, ariaLabel: 'GitHub' },
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/umasuryateja/', icon: Linkedin, ariaLabel: 'LinkedIn' },
  { label: 'Email', href: 'mailto:jakkateja03@gmail.com', icon: Mail, ariaLabel: 'Email' },
  { label: 'Phone', href: 'tel:+918074744073', icon: Phone, ariaLabel: 'Phone' },
]

/**
 * Footer — minimal, with social icons and back-to-top button.
 * Back-to-top button appears after scrolling 300px.
 */
export default function Footer() {
  const [showBackTop, setShowBackTop] = useState(false)
  const currentYear = new Date().getFullYear()

  useEffect(() => {
    const handleScroll = () => setShowBackTop(window.scrollY > 300)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <>
      <footer
        className="relative z-10 border-t border-[rgba(34,211,238,0.08)] bg-[rgba(5,8,16,0.9)] backdrop-blur-lg py-10"
        aria-label="Site footer"
      >
        <div className="section-container flex flex-col sm:flex-row items-center justify-between gap-6">
          {/* Brand */}
          <div className="flex flex-col items-center sm:items-start gap-1">
            <p className="font-bold text-text-primary tracking-wide">
              JAKKA UMA SURYA TEJA
            </p>
            <p className="text-text-muted text-xs font-mono">
              Built with Next.js &amp; ❤️ &mdash; &copy; {currentYear}
            </p>
          </div>

          {/* Social links */}
          <nav aria-label="Social media links (footer)">
            <ul className="flex items-center gap-3" role="list">
              {SOCIAL_LINKS.map(({ label, href, icon: Icon, ariaLabel }) => (
                <li key={label}>
                  <a
                    href={href}
                    target={href.startsWith('http') ? '_blank' : undefined}
                    rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                    aria-label={ariaLabel}
                    className="w-9 h-9 rounded-xl border border-[rgba(34,211,238,0.15)] bg-surface/50 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 focus-visible:outline-accent"
                  >
                    <Icon size={16} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Open to work */}
          <div className="flex items-center gap-2 text-xs text-text-muted">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
            Open to opportunities
          </div>
        </div>
      </footer>

      {/* Back to top button — fixed, bottom-right */}
      <AnimatePresence>
        {showBackTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, y: 20 }}
            transition={{ duration: 0.25 }}
            onClick={scrollToTop}
            className="fixed bottom-6 right-6 z-50 w-12 h-12 rounded-xl bg-accent/10 border border-accent/30 text-accent flex items-center justify-center hover:bg-accent/20 hover:border-accent/60 hover:scale-110 transition-all duration-200 focus-visible:outline-accent shadow-lg shadow-accent/10"
            aria-label="Back to top"
          >
            <ChevronUp size={20} aria-hidden="true" />
          </motion.button>
        )}
      </AnimatePresence>
    </>
  )
}
