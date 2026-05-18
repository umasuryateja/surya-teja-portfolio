'use client'

import { useEffect, useState } from 'react'
import { motion, AnimatePresence, useReducedMotion, type Variants } from 'framer-motion'
import { Github, Linkedin, Mail, Phone, ChevronDown, FileText } from 'lucide-react'

/** Roles that cycle in the animated title */
const ROLES = [
  'AI/ML Engineer',
  'GenAI Developer',
  'NLP Engineer',
  'LLM Builder',
  'Data Engineer',
]

const SOCIAL_LINKS = [
  {
    label: 'GitHub',
    href: 'https://github.com/umasuryateja',
    icon: Github,
    ariaLabel: 'Visit Uma Surya Teja GitHub profile',
  },
  {
    label: 'LinkedIn',
    href: 'https://www.linkedin.com/in/umasuryateja/',
    icon: Linkedin,
    ariaLabel: 'Visit Uma Surya Teja LinkedIn profile',
  },
  {
    label: 'Email',
    href: 'mailto:jakkateja03@gmail.com',
    icon: Mail,
    ariaLabel: 'Send email to jakkateja03@gmail.com',
  },
  {
    label: 'Phone',
    href: 'tel:+918074744073',
    icon: Phone,
    ariaLabel: 'Call Uma Surya Teja',
  },
]

/** Fires the global event — ClientWrapper in page.tsx catches it */
function openResume() {
  window.dispatchEvent(new CustomEvent('open-resume-modal'))
}

/**
 * Hero Section — centered full-viewport layout.
 * No photo here (photo lives in the About section).
 * Resume button fires the global 'open-resume-modal' event.
 */
export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0)
  const shouldReduce = useReducedMotion()

  useEffect(() => {
    if (shouldReduce) return
    const interval = setInterval(() => {
      setRoleIndex((i) => (i + 1) % ROLES.length)
    }, 2500)
    return () => clearInterval(interval)
  }, [shouldReduce])

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
  }

  const containerVariants: Variants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.13 } },
  }

  const itemVariants: Variants = shouldReduce
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : {
        hidden: { opacity: 0, y: 28 },
        visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: 'easeOut' } },
      }

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
      aria-label="Hero section"
    >
      {/* Radial glow backdrop */}
      <div
        className="absolute inset-0 pointer-events-none"
        aria-hidden="true"
        style={{
          background:
            'radial-gradient(ellipse 60% 50% at 50% 40%, rgba(34,211,238,0.07) 0%, transparent 70%)',
        }}
      />

      <div className="section-container w-full text-center pt-24 pb-16">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-6"
        >
          {/* Availability badge */}
          <motion.div variants={itemVariants}>
            <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-accent/30 bg-accent/5 text-accent text-sm font-medium">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              Open to AI/ML Opportunities
            </span>
          </motion.div>

          {/* Name */}
          <motion.h1
            variants={itemVariants}
            className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold leading-none tracking-tight"
          >
            <span className="gradient-text glow-cyan">JAKKA</span>
            <br />
            <span className="text-text-primary">UMA SURYA TEJA</span>
          </motion.h1>

          {/* Animated role */}
          <motion.div
            variants={itemVariants}
            className="h-10 flex items-center gap-3"
            aria-live="polite"
            aria-label={`Current role: ${ROLES[roleIndex]}`}
          >
            <span className="text-text-muted text-xl font-mono">&gt;</span>
            <div className="relative h-10 overflow-hidden w-64 sm:w-80 text-left">
              <AnimatePresence mode="wait">
                <motion.span
                  key={roleIndex}
                  initial={shouldReduce ? {} : { y: 40, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  exit={shouldReduce ? {} : { y: -40, opacity: 0 }}
                  transition={{ duration: 0.35, ease: 'easeInOut' }}
                  className="absolute inset-0 flex items-center text-accent font-semibold text-xl sm:text-2xl font-mono whitespace-nowrap"
                >
                  {ROLES[roleIndex]}
                </motion.span>
              </AnimatePresence>
            </div>
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={itemVariants}
            className="max-w-2xl text-text-muted text-base sm:text-lg leading-relaxed px-4"
          >
            Building intelligent AI-powered applications using Machine Learning, Generative AI,
            NLP, RAG systems, and Data Engineering workflows.
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-wrap justify-center gap-4 pt-2"
          >
            <button
              onClick={() => scrollTo('projects')}
              className="px-7 py-3.5 rounded-xl bg-accent text-background font-bold text-sm hover:bg-accent/90 hover:scale-105 transition-all duration-200 focus-visible:outline-accent shadow-lg shadow-accent/20"
              aria-label="Scroll to projects section"
            >
              View Projects
            </button>

            {/* Resume button — fires global modal event */}
            <button
              onClick={openResume}
              className="px-7 py-3.5 rounded-xl border border-accent/40 text-accent font-semibold text-sm hover:bg-accent/10 hover:border-accent/70 hover:scale-105 transition-all duration-200 focus-visible:outline-accent"
              aria-label="View resume"
              aria-haspopup="dialog"
            >
              View Resume ↗
            </button>

            <button
              onClick={() => scrollTo('contact')}
              className="px-7 py-3.5 rounded-xl border border-white/10 text-text-primary font-semibold text-sm hover:bg-white/5 hover:border-white/20 hover:scale-105 transition-all duration-200 focus-visible:outline-accent"
              aria-label="Scroll to contact section"
            >
              Contact Me
            </button>
          </motion.div>

          {/* Social icons */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-4 pt-2"
            role="list"
            aria-label="Social media links"
          >
            {SOCIAL_LINKS.map(({ label, href, icon: Icon, ariaLabel }) => (
              <motion.a
                key={label}
                href={href}
                target={href.startsWith('http') ? '_blank' : undefined}
                rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
                aria-label={ariaLabel}
                role="listitem"
                whileHover={shouldReduce ? {} : { scale: 1.15, y: -2 }}
                className="w-10 h-10 rounded-xl border border-[rgba(34,211,238,0.15)] bg-surface/50 flex items-center justify-center text-text-muted hover:text-accent hover:border-accent/40 hover:bg-accent/5 transition-all duration-200 focus-visible:outline-accent"
              >
                <Icon size={18} aria-hidden="true" />
              </motion.a>
            ))}
          </motion.div>

          {/* ── Premium Resume Preview card ── */}
          <motion.div variants={itemVariants} className="w-full flex justify-center pt-1">
            <motion.button
              onClick={openResume}
              whileHover={shouldReduce ? {} : { scale: 1.02, y: -2 }}
              whileTap={shouldReduce ? {} : { scale: 0.98 }}
              aria-label="Preview and download resume"
              aria-haspopup="dialog"
              className="group relative flex items-center gap-4 px-5 py-3.5 rounded-2xl text-left focus-visible:outline-accent transition-all duration-300"
              style={{
                background: 'rgba(34,211,238,0.04)',
                border: '1px solid rgba(34,211,238,0.2)',
                backdropFilter: 'blur(12px)',
                WebkitBackdropFilter: 'blur(12px)',
                boxShadow: '0 4px 24px rgba(0,0,0,0.3), 0 0 0 0 rgba(34,211,238,0)',
              }}
            >
              {/* Mini resume thumbnail */}
              <div
                className="relative w-10 h-14 rounded-lg overflow-hidden shrink-0"
                style={{ border: '1px solid rgba(34,211,238,0.25)' }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/resume-preview.jpg"
                  alt=""
                  aria-hidden="true"
                  className="w-full h-full object-cover object-top"
                />
                <div
                  className="absolute inset-0"
                  style={{ background: 'linear-gradient(to bottom, transparent 40%, rgba(34,211,238,0.15) 100%)' }}
                />
              </div>

              {/* Text */}
              <div className="flex flex-col gap-0.5">
                <div className="flex items-center gap-2">
                  <FileText size={12} className="text-accent" aria-hidden="true" />
                  <span className="text-xs font-mono text-accent font-semibold tracking-wide uppercase">Resume Preview</span>
                </div>
                <p className="text-text-primary text-sm font-semibold leading-snug">
                  Jakka Uma Surya Teja
                </p>
                <p className="text-text-muted text-[11px] font-mono">AI/ML Engineer · Click to view →</p>
              </div>

              {/* Hover glow */}
              <div
                className="absolute inset-0 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                style={{ boxShadow: 'inset 0 0 20px rgba(34,211,238,0.06)' }}
                aria-hidden="true"
              />
            </motion.button>
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col items-center gap-2 mt-8 text-text-muted"
            aria-hidden="true"
          >
            <span className="text-xs font-mono tracking-widest uppercase opacity-60">Scroll</span>
            <motion.div
              animate={shouldReduce ? {} : { y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
            >
              <ChevronDown size={20} className="text-accent/70" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
